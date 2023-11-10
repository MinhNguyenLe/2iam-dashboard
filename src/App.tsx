import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import routes, { routesResume } from "./routes";
import { ukoTheme } from "./theme";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { appStore, persistor } from "components/ResumeBuilder/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import { Colors } from "components/ResumeBuilder/theme/colors";

const theme = {
  colors: {
    ...Colors,
  },
};

const App: FC = () => {
  const allPages = useRoutes(routes);
  const resume = useRoutes(routesResume);

  const appTheme = ukoTheme();

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
    },
  };

  if (window.location.pathname.replace("/", "").split("/").includes("resume-builder")) {
    return (
      <>
        <Provider store={appStore}>
          <PersistGate persistor={persistor}>
            <ThemeProviderStyled theme={theme}>{resume}</ThemeProviderStyled>
          </PersistGate>
        </Provider>
        <ToastContainer />
      </>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Toaster toastOptions={toasterOptions} />
        {allPages}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
