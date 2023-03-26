import { AppShell, MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavbarMinimal } from "./components/navbar";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import NowPlaying from "./pages/now-playing";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./ThemeProvider";
import Upcoming from "./pages/upcoming";
import Popular from "./pages/popular";
import TopRated from "./pages/top-rated";
import Search from "./pages/search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <MantineProvider theme={{ colorScheme: 'dark', primaryColor: 'red'}} withGlobalStyles withNormalizeCSS>
      <AppShell
      navbar={<NavbarMinimal />}
      styles={() => ({
        main: { backgroundColor: 'black',
        paddingTop: 0, paddingRight:0},
      })}>
      <ThemeProvider >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/likes" element={<Favorite />} />
            <Route path="/search" element={<Search />} />
            <Route path="/now_playing" element={<NowPlaying />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/top_rated" element={<TopRated />} />
          </Routes>
      </ThemeProvider>
    </AppShell>
    </MantineProvider>
  </Router>
);

reportWebVitals();
