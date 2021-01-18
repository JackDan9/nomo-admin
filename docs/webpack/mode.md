---
order: 21
title: Webpack Configuration Of Mode
---

# Mode
- Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.

```javascript
string = 'production': 'none' | 'development' | 'production'

// example
mode = 'production'
```

## Usage
- Provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'development'
};
```

- or pass it as a `CLI` argument:

```shell
webpack --mode=development
```

- The following string values are supported:

| Option | Description |
| --- | --- |
| `development` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables useful names for modules and chunks. |
| `production` | Sets `process.env.NODE_ENV` on `DefinePlugin`  |
| `none` | Opts out of any default optimization options |

