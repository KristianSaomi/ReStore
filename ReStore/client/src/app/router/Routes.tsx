import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/catalog/contactPage";
import NotFound from "../../features/errors/NotFound";
import RoadmapSection from "../../features/roadmap/roadmapSection";
import ServerError from "../../features/errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/roadmap", element: <RoadmapSection /> },
      { path: "/server-error", element: <ServerError /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
