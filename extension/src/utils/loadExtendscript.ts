import {
  inCEPEnvironment,
  loadExtendscript,
  getExtensionPath,
  getHostEnvironment,
  RGBColor,
} from "cep-interface";

if (inCEPEnvironment()) {
  const { logger } = require("../utils/logger");
  const extensionPath = getExtensionPath();

  logger.info("start", extensionPath);

  // This references the compiled file, so it’s necessary to
  // use the `.jsx.js` extension, instead of `.jsx.ts`.
  loadExtendscript("index.jsx.js");

  const host = getHostEnvironment();
  if (host) {
    const skin = host.appSkinInfo;
    const bgColor = skin.panelBackgroundColor.color as RGBColor;
    document.body.style.background = `rgb(${parseInt(
      bgColor.red.toString()
    )}, ${parseInt(bgColor.green.toString())}, ${parseInt(
      bgColor.blue.toString()
    )})`;
  }
}
