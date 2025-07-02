import { Outlet } from "react-router-dom";
import { ThemeContext } from "./theme/ThemeContext";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { getThemePalette } from "./theme/ThemePalette";
import { Box, Grid } from "@mui/material";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);


  const theme = React.useMemo(() => createTheme(getThemePalette(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Grid
          container
          sx={{
            maxWidth: "100%",
            background:
              "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              bgcolor: "primary.light",
              "@media (max-width:200px)": {
                width: "70%",
                transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 400ms ease",
              },
            }}
            position="relative"
            height={"100vh"}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {" "}
              <Outlet
                context={{
                  chat: chat,
                  setChat: setChat,
                  handleMobileMenu: setMenuOpen,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
