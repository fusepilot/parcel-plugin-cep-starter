import { Flex, Heading, Text } from "@adobe/react-spectrum";
import * as React from "react";
import { useExtensionProperties } from "../hooks/useExtensionProperties";

export default function AdobeAppInfo() {
  const extensionProperties = useExtensionProperties();

  return (
    <Flex direction="column">
      <Heading level={2}>Adobe App Info</Heading>
      {!extensionProperties.isInCEPEnvironment && (
        <Text>Not in CEP environment.</Text>
      )}
      <ul>
        <li>
          <Text>Id: {extensionProperties.id}</Text>
        </li>
        <li>
          <Text>Name: {extensionProperties.name}</Text>
        </li>
        <li>
          <Text>Version: {extensionProperties.version}</Text>
        </li>
        <li>
          <Text>Extension Path: {extensionProperties.extensionPath}</Text>
        </li>
      </ul>
    </Flex>
  );
}
