import {
  test,
  assert,
  expect,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { type Query } from '@vltpkg/query'
import {
  type EdgeLike,
  type GraphLike,
  type NodeLike,
} from '@vltpkg/graph'
import { cleanup, render } from '@testing-library/react'
import html from 'diffable-html'
import { useGraphStore as useStore } from '@/state/index.js'
import { Explorer } from '@/app/explorer.jsx'
import { joinDepIDTuple } from '@vltpkg/dep-id/browser'

vi.mock('@/components/search-bar.jsx', () => ({
  SearchBar: 'gui-search-bar',
}))
vi.mock('@/components/ui/logo.jsx', () => ({
  Logo: 'gui-logo',
}))
vi.mock('@/components/ui/title.jsx', () => ({
  Title: 'gui-title',
}))
vi.mock('@/components/ui/card.jsx', () => ({
  Card: 'gui-card',
  CardDescription: 'gui-card-description',
  CardHeader: 'gui-card-header',
  CardTitle: 'gui-card-title',
}))
vi.mock('@/components/explorer-grid/index.jsx', () => ({
  ExplorerGrid: 'gui-explorer-grid',
}))

export const restHandlers = [
  http.get('/graph.json', () => {
    return HttpResponse.json({
      importers: [
        {
          id: joinDepIDTuple(['file', '.']),
          name: 'root',
          version: '1.0.0',
          mainImporter: true,
          importer: true,
          location: '.',
          dev: false,
          optional: false,
          manifest: { name: 'root', version: '1.0.0' },
        },
      ],
      lockfile: { options: {}, nodes: [], edges: [] },
    })
  }),
]

const server = setupServer(...restHandlers)

expect.addSnapshotSerializer({
  serialize: v => html(v),
  test: () => true,
})

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  const CleanUp = () => (useStore(state => state.reset)(), '')
  render(<CleanUp />)
  cleanup()
})

afterAll(() => server.close())

test('render default', async () => {
  render(<Explorer />)
  expect(window.document.body.innerHTML).toMatchSnapshot()
})

test('explorer has project root info', async () => {
  const Container = () => {
    const updateGraph = useStore(state => state.updateGraph)
    updateGraph({ projectRoot: '/path/to/project' } as GraphLike)
    return <Explorer />
  }
  render(<Container />)
  expect(window.document.body.innerHTML).toMatchSnapshot()
})

test('update nodes and edges info on query change', async () => {
  render(<Explorer />)

  const nodes: NodeLike[] = []
  const edges: EdgeLike[] = []
  const q = {
    search() {
      return { nodes, edges }
    },
  }

  const Container = () => {
    const updateQ = useStore(state => state.updateQ)
    const updateQuery = useStore(state => state.updateQuery)
    updateQ(q as unknown as Query)
    updateQuery('#foo')
    return <Explorer />
  }
  render(<Container />)

  let edgesResult
  let nodesResult
  const Retrieve = () => {
    edgesResult = useStore(state => state.edges)
    nodesResult = useStore(state => state.nodes)
    return ''
  }
  render(<Retrieve />)

  assert.deepEqual(
    edgesResult,
    edges,
    'should update edges with result from query',
  )
  assert.deepEqual(
    nodesResult,
    nodes,
    'should update nodes with result from query',
  )
})
