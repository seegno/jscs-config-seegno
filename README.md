# jscs-config-seegno
Seegno-flavored JSCS config.

## Installation

```sh
$ npm install jscs jscs-config-seegno should --save-dev
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

## Custom rules
The preset includes the following list of custom rules.

### `disallowGeneratorsInDescribeFunctions`
Disallows the usage of generators for the `describe` grouping primitive that features in testing frameworks such as `mocha`.

This rule helps to avoid incorrectly replacing the function signature with a generator declaration, which results in some cryptic errors when running the tests, since `describe` is not meant to be asynchronous.

Requires: `mocha`

Type: `Boolean`

Value: `true`

#### Example

```json
disallowGeneratorsInDescribeFunctions: true
```

#### Valid

```js
describe('foobar', function () {
  it('should work');
});
```

#### Invalid

```js
describe('foobar', function *() {
  it('should work');
});
```

### `disallowOnlyFilterInTestFunctions`
Disallows the usage of `only` for grouping primitives or test cases in `mocha`.

Although it might help to run individual tests locally, this rule helps to ensure the entire test suite runs, for instance, using build or pre-commit scripts.

Requires: `mocha`

Type: `Boolean`

Value: `true`

#### Example

```json
disallowOnlyFilterInTestFunctions: true
```

#### Valid

```js
describe('foobar', function () {
  it('should work');
});
```

#### Invalid

```js
describe.only('foobar', function *() {
  it('should work');
});

describe('foobar', function *() {
  it.only('should work');
});
```

### `requireShouldAssertionExecution`
Disallows the usage of test expectation properties in favor of methods with libraries such as `should`.

Due to the nature of some expectation libraries, it's easy to forget a method `()` which might result in an assertion that never gets executed. This rule is meant to avoid that issue.

Requires: `should`

Type: `Boolean`

Value: `true`

#### Example

```json
requireShouldAssertionExecution: true
```

#### Valid

```js
true.should.be.true();
```

#### Invalid

```js
true.should.be.true;
```

### `requireSqlTemplate`
Disallows the usage of raw SQL templates with interpolation.

This rule enforces the usage of a library such as [sql-tag](https://github.com/seegno/sql-tag), which escapes data provided to an SQL query statement via interpolation, helping to avoid, for instance, potential injection attacks.

Requires: `sql-tag`

Type: `Boolean`

Value: `true`

#### Example

```json
requireSqlTemplate: true
```

#### Valid

```js
const column = '*';
const query = sql`SELECT ${column} FROM foobar`;

fn(sql`SELECT ${column} FROM foobar`)
```

#### Invalid

```js
const column = '*';
const query = `SELECT ${column} FROM foobar`;

fn(`SELECT ${column} FROM foobar`)
```
