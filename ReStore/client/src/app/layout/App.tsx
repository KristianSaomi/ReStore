import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header/Header";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../Context/StoreContext";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/util";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: { default: paletteType === "light" ? "#eaeaea" : "#121212" },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initializing app.." />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline>
          <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
          <Container>
            <Outlet />
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
