import * as React from "react";
import { useExtension } from "./useExtension";

export function usePlatform() {
  const [platform, setPlatfrom] = React.useState(null);
  const { isInCEPEnvironment } = useExtension();

  React.useEffect(() => {
    if (isInCEPEnvironment) {
      // @ts-ignore
      const process = window.cep_node.require("process");
      setPlatfrom(process.platform);
    }
  }, [isInCEPEnvironment]);

  return platform;
}
