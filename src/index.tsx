import { AppShell, MantineProvider } from "@mantine/core";
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavbarMinimal } from "./components/navbar";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./ThemeProvider";
import Search from "./pages/search";
import { store } from './core/store';
import { Provider } from "react-redux";
import PopularMovies from "./pages/popularMovies";
import NowPlayingMovies from "./pages/nowPlayingMovies";
import UpcomingMovies from "./pages/upcomingMovies";
import TopRatedMovies from "./pages/topRatedMovies";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
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
              <Route path="/now_playing" element={<NowPlayingMovies />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
              <Route path="/popular" element={<PopularMovies />} />
              <Route path="/top_rated" element={<TopRatedMovies />} />
            </Routes>
        </ThemeProvider>
      </AppShell>
      </MantineProvider>
    </Router>
  </Provider>
);

reportWebVitals();
