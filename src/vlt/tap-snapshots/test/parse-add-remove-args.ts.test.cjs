/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > define as prod if explicitly defined > should return dependency as type=prod 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@latest}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > define dev type dep > should return dependency as type=dev 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@latest}, type: 'dev' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > define optional peer dep > should return dependency as type=peerOptional 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) {
      'foo' => { spec: Spec {foo@latest}, type: 'peerOptional' }
    }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > define optional type dep > should return dependency as type=optional 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@latest}, type: 'optional' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > define peer dep > should return dependency as type=peer 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@latest}, type: 'peer' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > multiple items > should return multiple dependency items 1`] = `
{
  add: Map(1) {
    'file·.' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > no item > should return no dependency items 1`] = `
{ add: Map(1) { 'file·.' => Map(0) {} } }
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > single item > should return a single dependency item 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define multiple deps of a single workspace > should return multiple deps of a workspace 1`] = `
{
  add: Map(1) {
    'workspace·utils%2Fc' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define multiple deps to multiple groups of workspaces > should return multiple deps to many groups of workspaces 1`] = `
{
  add: Map(3) {
    'workspace·utils%2Fc' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    },
    'workspace·foo' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    },
    'workspace·bar' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define multiple deps to multiple workspaces > should return multiple deps to multiple workspaces 1`] = `
{
  add: Map(3) {
    'workspace·app%2Fb' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    },
    'workspace·app%2Fa' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    },
    'workspace·utils%2Fc' => Map(5) {
      'foo' => { spec: Spec {foo@^1}, type: 'prod' },
      'bar' => { spec: Spec {bar@latest}, type: 'prod' },
      'baz' => { spec: Spec {baz@1.0.0}, type: 'prod' },
      '(unknown)@github:a/b' => { spec: Spec {(unknown)@github:a/b}, type: 'prod' },
      '(unknown)@file:./a' => { spec: Spec {(unknown)@file:./a}, type: 'prod' }
    }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define root dep if no workspace config defined > should return dependency of root 1`] = `
{
  add: Map(1) {
    'file·.' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define single dep of a single workspace > should return dependency of a workspace 1`] = `
{
  add: Map(1) {
    'workspace·app%2Fa' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define single dep to a group of workspaces > should return dependency to a group of workspaces 1`] = `
{
  add: Map(2) {
    'workspace·foo' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } },
    'workspace·bar' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseAddArgs > workspaces > define single dep to multiple groups of workspaces > should return dependency to many groups of workspaces 1`] = `
{
  add: Map(3) {
    'workspace·utils%2Fc' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } },
    'workspace·foo' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } },
    'workspace·bar' => Map(1) { 'foo' => { spec: Spec {foo@}, type: 'prod' } }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > multiple items > should return multiple dependency item 1`] = `
{
  remove: Map(1) { 'file·.' => Set(3) { 'foo@^1', 'bar@latest', 'baz@1.0.0' } }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > no items > should return no items 1`] = `
{ remove: Map(1) { 'file·.' => Set(0) {} } }
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > single item > should return a single dependency item 1`] = `
{ remove: Map(1) { 'file·.' => Set(1) { 'foo' } } }
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > multiple deps from a workspace group > should remove multiple dep from a single workspace group 1`] = `
{
  remove: Map(2) {
    'workspace·app%2Fb' => Set(2) { 'foo', 'bar' },
    'workspace·app%2Fa' => Set(2) { 'foo', 'bar' }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > multiple deps from multiple workspace groups > should remove multiple dep from multiple workspace groups 1`] = `
{
  remove: Map(3) {
    'workspace·utils%2Fc' => Set(2) { 'foo', 'bar' },
    'workspace·foo' => Set(2) { 'foo', 'bar' },
    'workspace·bar' => Set(2) { 'foo', 'bar' }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > multiple deps of a single workspace > should remove multiple deps of workspace 1`] = `
{ remove: Map(1) { 'workspace·utils%2Fc' => Set(2) { 'foo', 'bar' } } }
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > remove dep from root if no workspace defined > should remove dep from root 1`] = `
{ remove: Map(1) { 'file·.' => Set(1) { 'foo' } } }
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > single dep from a workspace group > should remove single dep from a single workspace group 1`] = `
{
  remove: Map(2) {
    'workspace·app%2Fb' => Set(1) { 'foo' },
    'workspace·app%2Fa' => Set(1) { 'foo' }
  }
}
`

exports[`test/parse-add-remove-args.ts > TAP > parseRemoveArgs > workspaces > single dep of a single workspace > should remove single dep of workspace 1`] = `
{ remove: Map(1) { 'workspace·app%2Fa' => Set(1) { 'foo' } } }
`
