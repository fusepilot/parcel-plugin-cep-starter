# Parcel CEP Plugin Starter

Starter template for [parcel-cep-plugin](https://github.com/fusepilot/parcel-plugin-cep), a zero configuration CEP extension builder for [Parcel](https://github.com/parcel-bundler/parcel).

## Quick Start

```sh
git clone https://github.com/fusepilot/parcel-plugin-cep-starter.git
cd parcel-plugin-cep-starter
yarn && yarn start
```

Open your CC app of choice, find your extension under `Window` > `Extensions`, and start developing.

## Building

To create a production build:

```sh
yarn build
```

## Packaging

To create a .zxp for deployment:

```sh
yarn zxp
```

A versioned .zxp file will be placed inside `archive`.

## Guides

### Running Scripts

1. Add the function to the `$.global` object in `script/index.jsx.ts`
2. Call `evalScript` in your React component

```js
// index.jsx.ts
import { id } from "../shared";
function alertFromScript(message) {
  alert(message);
}

$.global[id] = {
  alertFromScript,
};

// Component.jsx
import * as React from "react";

export function Component() {
  const { evalScript } = useExtension();

  return (
    <button onClick={() => evalScript('alertFromScript("Hey!")')}>Alert</button>
  );
}
```

### Logging

You can log events from React in a similar way:

```js
// Component.jsx
import * as React from "react";

export function Component() {
  const { logMessage } = useLogger();

  return (
    <button onClick={() => logMessage("info", "Logged info from panel")}>
      Log info
    </button>
  );
}
```

This will append a log message to a file on disk.

### CEP Configuration

See [fusepilot/parcel-plugin-cep](https://github.com/fusepilot/parcel-plugin-cep)
