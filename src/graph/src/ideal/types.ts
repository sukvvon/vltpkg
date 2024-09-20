import {
  AddImportersDependenciesMap,
  RemoveImportersDependenciesMap,
} from '../dependencies.js'
import { Graph } from '../graph.js'
import { PackageInfoClient } from '@vltpkg/package-info'

export type BuildIdealAddOptions = {
  /**
   * A {@link AddImportersDependenciesMap} in which keys are {@link DepID}
   * linking to another `Map` in which keys are the dependency names and values
   * are {@link Dependency}. This structure represents dependencies that need
   * to be added to the importer represented by {@link DepID}.
   */
  add: AddImportersDependenciesMap
}

export type BuildIdealRemoveOptions = {
  /**
   * A {@link RemoveImportersDependenciesMap} object representing nodes to be
   * removed from the ideal graph. Each {@link DepID} key represents an
   * importer node and the `Set` of dependency names to be removed from its
   * dependency list.
   */
  remove: RemoveImportersDependenciesMap
}

export type BuildIdealFromGraphOptions = {
  /**
   * An initial {@link Graph} to start building from, adding nodes to any
   * missing edges and appending any new specs defined in `addSpecs`.
   */
  graph: Graph
}

export type BuildIdealPackageInfoOptions = {
  /**
   * A {@link PackageInfoClient} instance to read manifest info from.
   */
  packageInfo: PackageInfoClient
}
