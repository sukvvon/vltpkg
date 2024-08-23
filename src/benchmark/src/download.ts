// run this script as many times in parallel as necessary
// it'll randomize and skip any it's already downloaded.

import { randomBytes } from 'crypto'
import { mkdirSync, writeFileSync, existsSync, renameSync } from 'fs'
import pacote from 'pacote'
import { resolve } from 'path'
import { gunzipSync } from 'zlib'
import { EXT, randomize, packages, SOURCE } from './index.js'

const download = async (spec: string, ext: EXT) => {
  if (ext === EXT.tgz) return gunzipSync(await pacote.tarball(spec))
  return JSON.stringify(await pacote.packument(spec))
}

const main = async () => {
  console.log(`downloading artifacts to ${SOURCE}`)

  mkdirSync(SOURCE, { recursive: true })

  const names = randomize(
    packages.flatMap(name => [
      { name, ext: EXT.tgz },
      { name, ext: EXT.json },
    ]),
  )

  const log = (n: string) =>
    !('CI' in process.env) && process.stdout.write(n)

  for (const { name, ext } of names) {
    const artifact = resolve(
      SOURCE,
      `${name.replace('/', '-').replace(/^@/, '')}.${ext}`,
    )

    if (existsSync(artifact)) continue

    log(`${name}.${ext}`)

    const tmp = artifact + '.' + randomBytes(6).toString('hex')
    try {
      writeFileSync(tmp, await download(`${name}@latest`, ext))
      renameSync(tmp, artifact)
    } catch (er) {
      log(er instanceof Error ? er.message : `${er}`)
    }

    log('\n')
  }

  console.log('done')
}

await main()