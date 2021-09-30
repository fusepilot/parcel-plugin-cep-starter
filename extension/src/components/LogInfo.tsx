import * as React from "react";
import { useExtension } from "../hooks/useExtension";
import { useLogger } from "../hooks/useLogger";
import { usePlatform } from "../hooks/usePlatform";

export default function LogInfo() {
  const platform = usePlatform();
  const { openLog, logMessage, logPath } = useLogger();
  const { isInCEPEnvironment } = useExtension();

  return (
    <div className="LogInfo">
      <h3>Log Info</h3>

      {!isInCEPEnvironment && <p>Not in CEP environment.</p>}

      {platform == "darwin" && (
        <button onClick={() => openLog()}>Open Log</button>
      )}
      <p>{logPath}</p>
      <button onClick={() => logMessage("info", `Info from CEP`)}>
        Log Info
      </button>
      <button onClick={() => logMessage("error", `Error from CEP`)}>
        Log Error
      </button>
    </div>
  );
}
