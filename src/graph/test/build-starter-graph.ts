import { Spec } from '@vltpkg/spec'
import t from 'tap'
import {
  buildStarterGraph,
  BuildStarterGraphOptions,
} from '../src/build-starter-graph.js'
import { Graph } from '../src/graph.js'
import { Node } from '../src/node.js'
import { DependencyTypeShort, PackageInventory } from '../src/pkgs.js'

t.test('build empty starter graph', async t => {
  const dir = t.testdir({
    'package.json': JSON.stringify({
      name: 'my-project',
      version: '1.0.0',
    }),
  })
  const graph = await buildStarterGraph({
    dir,
    addSpecs: [],
    packageInventory: new PackageInventory(),
  } as BuildStarterGraphOptions)
  t.strictSame(
    graph.root.pkg.name,
    'my-project',
    'should have created a root folder with expected properties',
  )
})

t.test('build starter graph with missing dep', async t => {
  const dir = t.testdir({
    'package.json': JSON.stringify({
      name: 'my-project',
      version: '1.0.0',
      dependencies: {
        foo: '^1.0.0',
      },
    }),
  })
  const { buildStarterGraph } = await t.mockImport<
    typeof import('../src/build-starter-graph.js')
  >('../src/build-starter-graph.js', {
    '../src/append-registry-nodes.js': {
      appendRegistryNodes: async (
        _graph: Graph,
        _fromNode: Node,
        addSpecs: Spec[],
        _depType: DependencyTypeShort,
      ) => {
        const [item] = addSpecs
        if (!item) throw new Error('no item provided in specs')
        t.strictSame(
          { name: 'foo', spec: 'foo@^1.0.0' },
          { name: item.name, spec: item.spec },
          'should have missing dependency listed',
        )
      },
    },
  })
  await buildStarterGraph({
    dir,
    addSpecs: [],
    packageInventory: new PackageInventory(),
  } as BuildStarterGraphOptions)
})

t.test('build starter graph add spec', async t => {
  const dir = t.testdir({
    'package.json': JSON.stringify({
      name: 'my-project',
      version: '1.0.0',
    }),
  })
  const { buildStarterGraph } = await t.mockImport<
    typeof import('../src/build-starter-graph.js')
  >('../src/build-starter-graph.js', {
    '../src/append-registry-nodes.js': {
      appendRegistryNodes: async (
        _graph: any,
        _fromNode: any,
        specs: any,
        _depType: any,
      ) => {
        const [item] = specs
        t.strictSame(
          { name: 'foo', spec: 'foo@latest' },
          { name: item.name, spec: item.spec },
          'should have missing dependency listed',
        )
      },
    },
  })
  await buildStarterGraph({
    addSpecs: ['foo@latest'],
    dir,
    packageInventory: new PackageInventory(),
  })
})
