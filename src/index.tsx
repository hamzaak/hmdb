import { AppShell, MantineProvider } from "@mantine/core";
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavbarMinimal } from "./components/navbar";
import Home from "./pages/home";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./ThemeProvider";
import { store } from './store';
import { Provider } from "react-redux";
import PopularMovies from "./pages/popularMovies";
import NowPlayingMovies from "./pages/nowPlayingMovies";
import UpcomingMovies from "./pages/upcomingMovies";
import TopRatedMovies from "./pages/topRatedMovies";
import Footer from "./components/footer";
import SearchMovies from "./pages/searchMovies";
import FavoriteMovies from "./pages/favoriteMovies";

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
              <Route path="/favorite" element={<FavoriteMovies />} />
              <Route path="/search" element={<SearchMovies />} />
              <Route path="/now_playing" element={<NowPlayingMovies />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
              <Route path="/popular" element={<PopularMovies />} />
              <Route path="/top_rated" element={<TopRatedMovies />} />
            </Routes>
            <Footer />
        </ThemeProvider>
      </AppShell>
      </MantineProvider>
    </Router>
  </Provider>
);

reportWebVitals();
