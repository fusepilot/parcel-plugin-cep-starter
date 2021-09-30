import * as React from "react";
import { useExtension } from "../hooks/useExtension";

export default function AdobeAppInfo() {
  const { isInCEPEnvironment, id, version, extensionPath } = useExtension();

  return (
    <div className="AdobeAppInfo">
      <h3>Adobe App Info</h3>
      {isInCEPEnvironment ? (
        <ul>
          <li>Id: {id}</li>
          <li>Version: {version}</li>
          <li>Extension Path: {extensionPath}</li>
        </ul>
      ) : (
        <p>Not in CEP environment.</p>
      )}
    </div>
  );
}
