import ReactDOM from "react-dom/client";
import "../src/app/layout/styles.css";

//Font-family
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";
import { StoreProvider } from "./app/Context/StoreContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //using StrictMode makes the roadmap dependencies not work
  // <React.StrictMode>
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
  // </React.StrictMode>
);
