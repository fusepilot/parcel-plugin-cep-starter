import { defaultTheme, Heading, View } from "@adobe/react-spectrum";
import { Provider } from "@react-spectrum/provider";
import * as React from "react";

import AdobeAppInfo from "../components/AdobeAppInfo";
import LogInfo from "../components/LogInfo";

export default function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <View padding="size-400">
        <Heading level={1} marginTop="size-0">
          react-parcel-cep-starter
        </Heading>
        <AdobeAppInfo />
        <LogInfo />
      </View>
    </Provider>
  );
}
