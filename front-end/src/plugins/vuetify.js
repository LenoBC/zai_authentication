// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/lib/util/colors";

// Vuetify sth is wrong
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    dark: true,
    defaultTheme: "dark",
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blueGrey.darken2,
        secondary: colors.blueGrey.lighten2,
        accent: colors.blueGrey.darken3,
      },
    },
  },
});
