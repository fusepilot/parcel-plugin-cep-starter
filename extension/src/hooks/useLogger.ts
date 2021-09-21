import * as React from "react";
import { useExtension } from "./useExtension";
import { usePlatform } from "./usePlatform";

export function useLogger() {
  const [logPath, setLogPath] = React.useState(null);
  const platform = usePlatform();
  const { isInCEPEnvironment } = useExtension();

  React.useEffect(() => {
    async function loadLogPath() {
      if (isInCEPEnvironment) {
        const logger = await import("../utils/logger");
        setLogPath(logger.logPath);
      }
    }
    loadLogPath();
  }, []);

  const logMessage = async (level: string, message: string = "log") => {
    if (isInCEPEnvironment) {
      const { logger } = await import("../utils/logger");
      logger[level](message);
    } else {
      console.log({ level, message });
    }
  };

  const openLog = async () => {
    if (isInCEPEnvironment) {
      // @ts-ignore
      const child = window.cep_node.require("child_process");
      if (platform === "darwin") {
        child.spawn("open", [logPath]);
      }
    } else {
      console.log("Opening Log...");
    }
  };

  return {
    logMessage,
    openLog,
    logPath,
  };
}
