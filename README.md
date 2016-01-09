# jscs-config-seegno

Seegno-flavored JSCS config.

## Installation

```sh
$ npm install jscs jscs-config-seegno --save-dev
```

## Usage

Create an `.jscsrc` file with the following:

```yaml
preset: seegno
```

Add the following `script` to your `package.json`:

```json
{
  "scripts": {
    "lint": "jscs ."
  }
}
```

and run the linter with:

```sh
$ npm run lint
```
