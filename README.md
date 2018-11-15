## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**

First, clone the repo via git, and then install dependencies.

`npm install`

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

## CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import "~bootstrap/dist/css/bootstrap.css";
```


## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

#### Module Structure

This repo uses a [two package.json structure](https://github.com/electron-userland/electron-builder#two-packagejson-structure).

1. If the module is native to a platform or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md).
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.
