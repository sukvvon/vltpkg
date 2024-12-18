import { spawn } from 'node:child_process'
import { relative } from 'node:path'
import subset from 'semver/ranges/subset.js'
import { ROOT, readPkgJson as getPkg } from './utils.js'

const getAllProdDeps = async () => {
  const deps = []
  const walk = (dep, from = []) => {
    deps.push({ path: dep.path, from })
    for (const child of Object.values(dep.dependencies ?? {})) {
      walk(child, [...from, dep.from ?? dep.name])
    }
  }
  walk(
    await new Promise((res, rej) => {
      // TODO: make this a `vlt query`
      const proc = spawn(
        'pnpm',
        [
          '--filter',
          '"./src/**"',
          'list',
          '--depth=Infinity',
          '--json',
          '--prod',
        ],
        {
          cwd: ROOT,
          shell: true,
        },
      )
      let output = ''
      proc.stdout.on('data', data => (output += data.toString()))
      proc
        .on('close', () => res(JSON.parse(output)[0]))
        .on('error', rej)
    }),
  )
  return Array.from(
    deps
      .reduce((acc, d) => {
        const c = acc.get(d.path) ?? {}
        acc.set(d.path, {
          ...c,
          path: d.path,
          pkg: getPkg(d.path),
          from: [...(c.from ?? []), d.from],
        })
        return acc
      }, new Map())
      .values(),
  )
}

const check = (key, packages, value, ok) => {
  const problems = packages.filter(d => !ok(value(d)))
  if (problems.length) {
    const indent = (n = 0) => `\n${' '.repeat(n)}`
    return (
      `The following dependencies ${key} problems were found:` +
      problems
        .map(
          d =>
            `${indent(2)}${d.pkg.name}@${d.pkg.version}` +
            `${indent(4)}${key}: ${value(d)}` +
            `${indent(4)}path: ${relative(ROOT, d.path)}` +
            `${indent(4)}from: ${d.from.map(f => f.join(' > ')).join(indent(4 + 'from: '.length))}`,
        )
        .join(indent())
    )
  }
}

const main = async () => {
  const deps = await getAllProdDeps()
  const allowedEngines = getPkg(ROOT).engines.node
  const checkEngines = check(
    'engines',
    deps,
    d => d.pkg.engines?.node,
    v => v === undefined || subset(allowedEngines, v),
  )
  const allowedLicenes = new Set([
    'MIT',
    'ISC',
    'BSD-2-Clause-Patent',
    'BlueOak-1.0.0',
  ])
  const checkLicenses = check(
    'license',
    deps,
    d => d.pkg.license,
    v => allowedLicenes.has(v),
  )
  if (checkEngines || checkLicenses) {
    throw new Error(
      [checkEngines, checkLicenses].filter(Boolean).join('\n\n'),
    )
  }
  return (
    `Successfully checked ${deps.length} production dependencies:\n` +
    deps
      .map(d => `${d.pkg.name}@${d.pkg.version} `)
      .sort()
      .join('\n')
  )
}

main()
  .then(console.log)
  .catch(e => {
    process.exitCode = 1
    console.error(e.message)
  })
