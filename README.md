<h1 align="center">clipanion-v3-codemod</h1>

<p align="center">
  Clipanion v2 to v3 codemod
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/clipanion-v3-codemod"><img alt="npm" src="https://img.shields.io/npm/v/clipanion-v3-codemod"></a>
  <a href="https://github.com/paul-soporan/clipanion-v3-codemod/actions?query=workflow%3ANode"><img alt="GitHub Actions Node Workflow" src="https://github.com/paul-soporan/clipanion-v3-codemod/workflows/Node/badge.svg"></a>
  <a href="https://github.com/paul-soporan/clipanion-v3-codemod/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/clipanion-v3-codemod"></a>
</p>

---

`clipanion-v3-codemod` is a [Clipanion](https://github.com/arcanis/clipanion) v2 to v3 codemod written with [`jscodeshift`](https://github.com/facebook/jscodeshift). It can migrate most Clipanion v2 code, with a few exceptions:

- `static schema` (and `Command.Schema`) - has to be manually migrated to [Typanion](https://github.com/arcanis/typanion/)
- multiple option decorators on the same class property - this isn't supported by Clipanion v3

## Features

- Transforms `Command.*` class property decorators into `Option.*` class property initializers
- Transforms `Command.Path` decorators into `static paths`
- Transforms `Command.Entries.*` to `Builtins.*Command`
- Transforms `Command.addPath` fallback usage into push calls to the `Command.paths` static property
- Transforms `Command.addOption` fallback usage into `Option.*` initializers

## Installation

Using Yarn:

`yarn add clipanion-v3-codemod jscodeshift -D`

Using npm:

`npm install clipanion-v3-codemod jscodeshift -D`

TypeScript type definitions are included out-of-the-box.

## Usage

Using with Yarn:

`yarn jscodeshift -t $(yarn node -p "require.resolve('clipanion-v3-codemod')") <path>`

Using with npx:

`npx jscodeshift -t $(node -p "require.resolve('clipanion-v3-codemod')") <path>`
