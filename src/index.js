import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.900",
        color: "cyan.300",
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "cyan",
        variant: "solid",
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
