import { createTheme } from "@mui/material";

export const themeConfig = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#262626",
          color: "#d4d4d4",
          fontFamily: "var(--font-league)",
          fontSize: 20,
          borderRadius: 8,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
        },
        arrow: {
          color: "#262626",
        },
      },
    },
  },
});
