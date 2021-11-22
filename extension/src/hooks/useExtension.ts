import * as React from "react";
import { id } from "../../../shared";

/**
 * Retrieves the CEP extension properties from 'cep-interface' and the getInfo() script function.
 * Runs on each render.
 */
export function useExtension() {
  const [extensionProperties, setExtensionProperties] = React.useState({
    id: undefined,
    version: undefined,
    extensionPath: undefined,
    isInCEPEnvironment: false,
    openUrl: (url: string) => console.log("Opening URL:", url),
    evalScript: async (script: string): Promise<string> => {
      console.log("Running Script:", script);
      return `Ran script: ${script}`;
    },
  });

  React.useEffect(() => {
    async function loadExtensionProperties() {
      const {
        inCEPEnvironment,
        evalExtendscript,
        getExtensionPath,
        openURLInDefaultBrowser,
      } = await import("cep-interface");

      if (inCEPEnvironment()) {
        const info: any = await evalExtendscript(`$.global["${id}"].getInfo()`);
        const extensionPath = await getExtensionPath();
        setExtensionProperties({
          id: id,
          version: info.version,
          extensionPath,
          isInCEPEnvironment: true,
          openUrl: openURLInDefaultBrowser,
          evalScript: async (script: string) =>
            evalExtendscript(`$.global["${id}"].${script}`),
        });
      }
    }

    loadExtensionProperties();
  }, []);

  return extensionProperties;
}
