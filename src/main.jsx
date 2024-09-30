import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Navbar, Footer } from './components/layout'

import Home from './pages/Home';
import Movies from "./pages/movies";
import TvShows from "./pages/tvShow";
import TopRated from "./pages/topRated";
import AboutUs from "./pages/AboutUs";

import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>

  },
  {
    path: "/movies",
    element: <><Navbar /><Movies /></>
  },
  {
    path: "/tvshows",
    element: <><Navbar /><TvShows /></>
  },
  {
    path: "/toprated",
    element: <><Navbar /><TopRated /><Footer /></>
  },
  {
    path: "/aboutus",
    element: <><Navbar /><AboutUs /><Footer /></>
  }

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
