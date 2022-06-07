import { extendTheme } from "@chakra-ui/react";

import Button from "./components/button";
import fonts from "./fonts";

const customTheme = extendTheme({
  fonts,
  colors: {
    brand: {
      100: "#333333",
      200: "#ed2224",
      300: "#ef682f",
      400: "#005e8a",
      500: "#063f59",
      600: "",
      700: "",
      800: "",
      900: "",
    },
  },
  components: {
    Button,
  },
});

export default customTheme;
