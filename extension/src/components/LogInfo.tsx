import { ButtonGroup, Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { Button } from "@react-spectrum/button";
import * as React from "react";
import { useExtensionProperties } from "../hooks/useExtensionProperties";
import { usePlatform } from "../hooks/usePlatform";

export default function LogInfo() {
  const [logPath, setLogPath] = React.useState(null);
  const platform = usePlatform();

  const { isInCEPEnvironment, name } = useExtensionProperties();

  React.useEffect(() => {
    async function loadLogPath() {
      if (isInCEPEnvironment) {
        const logger = await import("../logger");
        setLogPath(logger.logPath);
      }
    }

    loadLogPath();
  }, [isInCEPEnvironment]);

  const logMessage = async (level: string, message: string = "log") => {
    if (isInCEPEnvironment) {
      const { logger } = await import("../logger");
      logger[level](message);
    }
  };

  const openLog = async () => {
    if (isInCEPEnvironment) {
      // @ts-ignore
      const child = window.cep_node.require("child_process");
      if (platform === "darwin") {
        child.spawn("open", [logPath]);
      }
    }
  };

  return (
    <Flex direction="column" gap="size-200">
      <Heading level={2}>Log Info</Heading>
      {!isInCEPEnvironment && <Text>Not in CEP environment.</Text>}
      <Text>Path: {logPath}</Text>
      <ButtonGroup>
        {platform == "darwin" && (
          <Button variant="cta" onPress={() => openLog()}>
            <Text>Open Log</Text>
          </Button>
        )}
        <Button
          variant="primary"
          onPress={() => logMessage("info", `Info from CEP`)}
        >
          <Text>Log Info</Text>
        </Button>
        <Button
          variant="primary"
          onPress={() => logMessage("error", `Error from CEP`)}
        >
          <Text>Log Error</Text>
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
