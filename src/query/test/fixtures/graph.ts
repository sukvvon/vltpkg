import type {
  DependencyTypeShort,
  GraphLike,
  NodeLike,
} from '@vltpkg/graph'
import { type SpecLike, Spec } from '@vltpkg/spec/browser'
import { Manifest } from '@vltpkg/types'

const projectRoot = '.'
// NOTE: name is the only property that is being tracked in these fixture
export const newGraph = (rootName: string): GraphLike => {
  const graph = {} as GraphLike
  const addNode = newNode(graph)
  const mainImporter = addNode(rootName)
  mainImporter.id = 'file;.'
  mainImporter.mainImporter = true
  mainImporter.importer = true
  mainImporter.graph = graph
  graph.importers = new Set([mainImporter])
  graph.mainImporter = mainImporter
  graph.nodes = new Map([[mainImporter.id, mainImporter]])
  graph.edges = new Set()

  return graph
}
export const newNode =
  (graph: GraphLike) =>
  (name: string): NodeLike => ({
    projectRoot,
    edgesIn: new Set(),
    edgesOut: new Map(),
    importer: false,
    mainImporter: false,
    graph,
    id: `;;${name}@1.0.0`,
    name,
    version: '1.0.0',
    location:
      'node_modules/.vlt/;;${name}@1.0.0/node_modules/${name}',
    manifest: { name, version: '1.0.0' },
    integrity: 'sha512-deadbeef',
    resolved: undefined,
    dev: false,
    optional: false,
  })
const newEdge = (
  from: NodeLike,
  spec: SpecLike<Spec>,
  type: DependencyTypeShort,
  to?: NodeLike,
) => {
  const edge = { name: spec.name, from, to, spec, type }
  from.edgesOut.set(spec.name, edge)
  if (to) {
    to.edgesIn.add(edge)
  }
}

// Returns a graph that looks like:
//
// my-project (#a.prod, #b.dev, #e.prod, #@x/y.dev)
// +-- a
// +-- b (#c.prod, #d.prod)
//     +-- c
//     +-- d (#e.prod #f.optional)
//         +-- e
//         +-- f
// +-- e
// +-- @x/y
//
export const getSimpleGraph = (): GraphLike => {
  const graph = newGraph('my-project')
  const addNode = newNode(graph)
  const [a, b, c, d, e, f, y] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '@x/y',
  ].map(addNode) as [
    NodeLike,
    NodeLike,
    NodeLike,
    NodeLike,
    NodeLike,
    NodeLike,
    NodeLike,
    NodeLike,
  ]
  b.dev = c.dev = d.dev = e.dev = f.dev = y.dev = true // deps of dev deps
  f.optional = true
  y.id = 'file;y'
  ;[a, b, c, d, e, f, y].forEach(i => {
    graph.nodes.set(i.id, i)
  })
  newEdge(
    graph.mainImporter,
    new Spec('a', '^1.0.0', 'registry'),
    'prod',
    a,
  )
  newEdge(
    graph.mainImporter,
    new Spec('b', '^1.0.0', 'registry'),
    'dev',
    b,
  )
  newEdge(
    graph.mainImporter,
    new Spec('e', '^1.0.0', 'registry'),
    'prod',
    e,
  )
  newEdge(
    graph.mainImporter,
    new Spec('@x/y', '^1.0.0', 'file'),
    'dev',
    y,
  )
  newEdge(b, new Spec('c', '^1.0.0', 'registry'), 'prod', c)
  newEdge(b, new Spec('d', '^1.0.0', 'registry'), 'prod', d)
  newEdge(d, new Spec('e', '^1.0.0', 'registry'), 'prod', e)
  newEdge(d, new Spec('f', '^1.0.0', 'registry'), 'optional', f)

  // give some nodes an expanded manifest so that we can test
  // more attribute selector scenarios
  b.manifest = {
    ...b.manifest,
    scripts: {
      postinstall: 'postinstall',
      test: 'test',
    },
    contributors: [
      {
        name: 'Ruy Adorno',
        email: 'ruyadorno@example.com',
      },
    ],
  } as Manifest

  c.manifest = {
    ...c.manifest,
    peerDependenciesMeta: {
      foo: {
        optional: true,
      },
    },
    keywords: ['something', 'someother'],
  } as Manifest

  d.manifest = {
    ...d.manifest,
    private: true,
    a: {
      b: [
        {
          c: {
            d: 'foo',
          },
        },
        {
          c: {
            d: 'bar',
          },
        },
      ],
      e: ['foo', 'bar'],
    },
  } as Manifest
  return graph
}

// Returns a graph with a root node and a single workspace
export const getSingleWorkspaceGraph = (): GraphLike => {
  const graph = newGraph('ws')
  const addNode = newNode(graph)
  const w = addNode('w')
  w.id = 'workspace;w'
  graph.nodes.set(w.id, w)
  graph.importers.add(w)
  w.importer = true
  return graph
}

// Returns a graph that looks like:
//
// cycle-project (#a.prod)
// +-> a  <--------------+
//     +-> b (#a.prod) --+
//
export const getCycleGraph = (): GraphLike => {
  const graph = newGraph('cycle-project')
  graph.mainImporter.manifest = {
    ...graph.mainImporter.manifest,
    dependencies: {
      a: '^1.0.0',
    },
  }
  const addNode = newNode(graph)

  const a = addNode('a')
  a.manifest = {
    ...a.manifest,
    scripts: {
      test: 'foo',
    },
    dependencies: {
      b: '^1.0.0',
    },
  }
  graph.nodes.set(a.id, a)
  newEdge(
    graph.mainImporter,
    new Spec('a', '^1.0.0', 'registry'),
    'prod',
    a,
  )

  const b = addNode('b')
  b.manifest = {
    ...b.manifest,
    scripts: {
      test: 'bar',
    },
    dependencies: {
      a: '^1.0.0',
    },
  }
  graph.nodes.set(b.id, b)
  newEdge(a, new Spec('b', '^1.0.0', 'registry'), 'prod', b)
  newEdge(b, new Spec('a', '^1.0.0', 'registry'), 'prod', a)

  return graph
}

// Returns a graph in which nodes have no manifest data
export const getMissingManifestsGraph = (): GraphLike => {
  const graph = newGraph('missing-manifest-project')
  delete graph.mainImporter.manifest

  const addNode = newNode(graph)
  const a = addNode('a')
  delete a.manifest
  graph.nodes.set(a.id, a)
  newEdge(
    graph.mainImporter,
    new Spec('a', '^1.0.0', 'registry'),
    'prod',
    a,
  )
  return graph
}