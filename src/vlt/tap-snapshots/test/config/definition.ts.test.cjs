/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/config/definition.ts > TAP > commands 1`] = `
Object {
  "?": "help",
  "add": "install",
  "conf": "config",
  "config": "config",
  "exec": "exec",
  "h": "help",
  "help": "help",
  "i": "install",
  "install": "install",
  "install-exec": "install-exec",
  "ix": "install-exec",
  "r": "run",
  "rm": "uninstall",
  "run": "run",
  "run-exec": "run-exec",
  "run-script": "run",
  "rx": "run-exec",
  "u": "uninstall",
  "uninstall": "uninstall",
  "x": "exec",
}
`

exports[`test/config/definition.ts > TAP > definition 1`] = `
Object {
  "arch": Object {
    "description": "CPU architecture to use as the selector when choosing packages based on their \`cpu\` value.",
    "type": "string",
  },
  "bail": Object {
    "description": "When running scripts across multiple workspaces, stop on the first failure.",
    "short": "b",
    "type": "boolean",
  },
  "before": Object {
    "description": "Do not install any packages published after this date",
    "hint": "date",
    "type": "string",
  },
  "cache": Object {
    "description": "Location of the vlt on-disk cache. Defaults to the platform-specific directory recommended by the XDG specification.",
    "hint": "path",
    "type": "string",
  },
  "color": Object {
    "description": "Use colors (Default for TTY)",
    "short": "c",
    "type": "boolean",
  },
  "config": Object {
    "description": "Specify whether to operate on user-level or project-level configuration files when running \`vlt config\` commands.",
    "hint": "user | project",
    "type": "string",
    "validOptions": Array [
      "user",
      "project",
    ],
  },
  "editor": Object {
    "description": String(
      The blocking editor to use for \`vlt config edit\` and any other cases where a file should be opened for editing.
      
      Defaults to the \`EDITOR\` or \`VISUAL\` env if set, or \`notepad.exe\` on Windows, or \`vi\` elsewhere.
    ),
    "hint": "program",
    "type": "string",
  },
  "fallback-command": Object {
    "description": String(
      The command to run when the first argument doesn't match any known commands.
      
      For pnpm-style behavior, set this to 'run-exec'. e.g:
      
      \`\`\`
      ​vlt config set fallback-command=run-exec
      \`\`\`
      
      
    ),
    "hint": "command",
    "type": "string",
    "validOptions": Array [
      "install",
      "uninstall",
      "run",
      "run-exec",
      "exec",
      "help",
      "config",
      "install-exec",
    ],
  },
  "fetch-retries": Object {
    "description": "Number of retries to perform when encountering network or other likely-transient errors from git hosts.",
    "hint": "n",
    "type": "number",
  },
  "fetch-retry-factor": Object {
    "description": "The exponential factor to use when retrying",
    "hint": "n",
    "type": "number",
  },
  "fetch-retry-maxtimeout": Object {
    "description": "Maximum number of milliseconds between two retries",
    "hint": "n",
    "type": "number",
  },
  "fetch-retry-mintimeout": Object {
    "description": "Number of milliseconds before starting first retry",
    "hint": "n",
    "type": "number",
  },
  "git-host-archives": Object {
    "description": String(
      Similar to the \`--git-host <name>=<template>\` option, this option can define a template string that will be expanded to provide the URL to download a pre-built tarball of the git repository.
      
      In addition to the n-th path portion expansions performed by \`--git-host\`, this field will also expand the string \`$committish\` in the template, replacing it with the resolved git committish value to be fetched.
    ),
    "hint": "name=template",
    "multiple": true,
    "short": "A",
    "type": "string",
  },
  "git-hosts": Object {
    "description": String(
      Map a shorthand name to a git remote URL template.
      
      The \`template\` may contain placeholders, which will be swapped with the relevant values.
      
      \`$1\`, \`$2\`, etc. are replaced with the appropriate n-th path portion. For example, \`github:user/project\` would replace the \`$1\` in the template with \`user\`, and \`$2\` with \`project\`.
    ),
    "hint": "name=template",
    "multiple": true,
    "short": "G",
    "type": "string",
  },
  "git-shallow": Object {
    "description": String(
      Set to force \`--depth=1\` on all git clone actions. When set explicitly to false with --no-git-shallow, then \`--depth=1\` will not be used.
      
      When not set explicitly, \`--depth=1\` will be used for git hosts known to support this behavior.
    ),
    "type": "boolean",
  },
  "help": Object {
    "description": "Print helpful information",
    "short": "h",
    "type": "boolean",
  },
  "no-bail": Object {
    "description": "When running scripts across multiple workspaces, continue on failure, running the script for all workspaces.",
    "short": "B",
    "type": "boolean",
  },
  "no-color": Object {
    "description": "Do not use colors (Default for non-TTY)",
    "short": "C",
    "type": "boolean",
  },
  "node-version": Object {
    "description": "Node version to use when choosing packages based on their \`engines.node\` value.",
    "hint": "version",
    "type": "string",
  },
  "os": Object {
    "description": "The operating system to use as the selector when choosing packages based on their \`os\` value.",
    "type": "string",
  },
  "package": Object {
    "description": "When running \`vlt install-exec\`, this allows you to explicitly set the package to search for bins. If not provided, then vlt will interpret the first argument as the package, and attempt to run the default executable.",
    "hint": "p",
    "type": "string",
  },
  "recursive": Object {
    "description": String(
      Run an operation across multiple workspaces.
      
      No effect when used in non-monorepo projects.
      
      Implied by setting --workspace or --workspace-group. If not set, then the action is run on the project root.
    ),
    "short": "r",
    "type": "boolean",
  },
  "registries": Object {
    "description": String(
      Specify named registry hosts by their prefix. To set the default registry used for non-namespaced specifiers, use the \`--registry\` option.
      
      Prefixes can be used as a package alias. For example:
      
      \`\`\`
      ​vlt --registries loc=http://reg.local install foo@loc:foo@1.x
      \`\`\`
      
      By default, the public npm registry is registered to the \`npm:\` prefix. It is not recommended to change this mapping in most cases.
    ),
    "hint": "name=url",
    "multiple": true,
    "type": "string",
  },
  "registry": Object {
    "description": String(
      Sets the registry for fetching packages, when no registry is explicitly set on a specifier.
      
      For example, \`express@latest\` will be resolved by looking up the metadata from this registry.
      
      Note that alias specifiers starting with \`npm:\` will still map to \`https://registry.npmjs.org\` if this is changed, unless the a new mapping is created via the \`--registries\` option.
    ),
    "hint": "url",
    "type": "string",
  },
  "scope-registries": Object {
    "description": String(
      Map package name scopes to registry URLs.
      
      For example, \`--scope-registries @acme=https://registry.acme/\` would tell vlt to fetch any packages named \`@acme/...\` from the \`https://registry.acme/\` registry.
      
      Note: this way of specifying registries is more ambiguous, compared with using the \`--registries\` field and explicit prefixes, because instead of failing when the configuration is absent, it will instead attempt to fetch from the default registry.
      
      By comparison, using \`--registries acme=https://registry.acme/\` and then specifying dependencies such as \`"foo": "acme:foo@1.x"\` means that regardless of the name, the package will be fetched from the explicitly named registry, or fail if no registry is defined with that name.
      
      However, custom registry aliases are not supported by other package managers.
    ),
    "hint": "@scope=url",
    "multiple": true,
    "type": "string",
  },
  "script-shell": Object {
    "description": String(
      The shell to use when executing \`package.json#scripts\` (either as lifecycle scripts or explicitly with \`vlt run\`) and \`vlt exec\`.
      
      If not set, defaults to \`/bin/sh\` on POSIX systems, and \`cmd.exe\` on Windows.
      
      When no argument is provided to \`vlt exec\`, the \`SHELL\` environment variable takes precedence if set.
    ),
    "hint": "program",
    "type": "string",
  },
  "tag": Object {
    "description": "Default \`dist-tag\` to install",
    "type": "string",
  },
  "workspace": Object {
    "description": String(
      Set to limit the spaces being worked on when working on workspaces.
      
      Can be paths or glob patterns matching paths.
      
      Specifying workspaces by package.json name is not supported.
    ),
    "hint": "ws",
    "multiple": true,
    "short": "w",
    "type": "string",
  },
  "workspace-group": Object {
    "description": "Specify named workspace group names to load and operate on when doing recursive operations on workspaces.",
    "multiple": true,
    "short": "g",
    "type": "string",
  },
}
`
