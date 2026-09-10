import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import RoomPage from "./pages/RoomPage";
import MyBookingsPage from "./pages/MyBookingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "rum", Component: RoomsPage },
      { path: "rum/:id", Component: RoomPage }, // dynamisk route
      { path: "mina-bokningar", Component: MyBookingsPage },
    ],
  },
]);
