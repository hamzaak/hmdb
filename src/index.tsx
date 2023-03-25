import { AppShell, MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavbarMinimal } from "./components/navbar";
import Home from "./pages/home";
import Likes from "./pages/likes";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./ThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Router>
      <MantineProvider theme={{ colorScheme: 'dark', primaryColor: 'red'}} withGlobalStyles withNormalizeCSS>
        <AppShell
        navbar={<NavbarMinimal />}
        styles={(theme) => ({
          main: { backgroundColor: 'black',
          paddingTop: 0, paddingRight:0},
        })}>
        <ThemeProvider >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/likes" element={<Likes />} />
            </Routes>
        </ThemeProvider>
      </AppShell>
      </MantineProvider>
    </Router>
  </StrictMode>
);

reportWebVitals();
