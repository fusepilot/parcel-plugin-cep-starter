import {
  inCEPEnvironment,
  loadExtendscript,
  getExtensionPath,
  getHostEnvironment,
  RGBColor
} from "cep-interface";

if (inCEPEnvironment()) {
  // @ts-ignore
  const os = window.cep_node.require("os");
  // @ts-ignore
  const fs = window.cep_node.require("fs-extra");
  // @ts-ignore
  const path = window.cep_node.require("path");
  // @ts-ignore
  const { logger } = require("./logger");

  const extensionPath = getExtensionPath();

  logger.info("start", extensionPath);

  // NOTE This references the compiled file, so it’s necessary to
  //      use the `.jsx.js` extension, instead of `.jsx.ts`.
  //      Alternatively, install a plugin that adds a manifest
  //      file, like npm.im/parcel-plugin-bundle-manifest
  // const manifest = fs.readJsonSync(path.join(extensionPath, "parcel-manifest.json"));
  // loadExtendscript(manifest["index.jsx.ts"]);
  loadExtendscript("index.jsx.js");

  const host = getHostEnvironment();
  if (host) {
    const skin = host.appSkinInfo;
    const bgColor = skin.panelBackgroundColor.color as RGBColor;
    document.body.style.background = `rgb(${parseInt(bgColor.red)}, ${parseInt(bgColor.green)}, ${
      parseInt(bgColor.blue)
    })`;
  }
}
