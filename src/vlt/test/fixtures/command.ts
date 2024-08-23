import { Test } from 'tap'
import { join } from 'path'
import { CliCommand, LoadedConfig } from '../../src/index.js'

export const setupEnv = (t: Test) => {
  // fresh process.env on every test
  const cleanEnv = Object.fromEntries(
    Object.entries(process.env).filter(([k]) => !/^VLT_/i.test(k)),
  )
  // not sure why this is required, but Windows tests fail without it.
  cleanEnv.PATH = process.env.PATH
  t.beforeEach(t =>
    t.intercept(process, 'env', { value: { ...cleanEnv } }),
  )
}

export const setupCommand = async <TCommand extends CliCommand>(
  t: Test,
  {
    command: commandName,
    testdir = {},
    chdir = '',
    projectRoot = '',
    argv: baseArgv = [],
    reload = true,
  }: {
    command: string
    testdir?: Parameters<Test['testdir']>[0]
    chdir?: string
    projectRoot?: string
    argv?: string[]
    reload?: boolean
  },
) => {
  const dir = t.testdir(testdir)
  t.chdir(join(dir, chdir))
  const { Config } = await t.mockImport<
    typeof import('../../src/config/index.js')
  >('../../src/config/index.js')
  const { command } = await t.mockImport<TCommand>(
    join('../../src/commands', `${commandName}.ts`),
  )
  const loadConfig = async (...argv: string[]) => {
    const conf = await Config.load(
      t.testdirName,
      [commandName, ...baseArgv, ...argv],
      reload,
    )
    conf.projectRoot = join(dir, projectRoot)
    return conf
  }
  const runCommand = async (
    confOrArgv: LoadedConfig | string[] = [],
  ) => {
    const config =
      Array.isArray(confOrArgv) ?
        await loadConfig(...confOrArgv)
      : confOrArgv
    const logs = t.capture(console, 'log').args
    const errs = t.capture(console, 'error').args
    await command(config)
    return {
      logs: logs()
        .map(v => v[0])
        .join('\n'),
      errs: errs()
        .map(v => v[0])
        .join('\n'),
    }
  }
  return {
    dir,
    command,
    loadConfig,
    runCommand,
  }
}