import { extendTheme } from "@chakra-ui/react";
import { switchTheme } from "../theme/components/Switch.js";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  components: {
    Switch: switchTheme,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        "font-family":
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },

      code: {
        "font-family":
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
    },
  },
};

export default extendTheme(theme);