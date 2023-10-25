import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import routes, { routesResume } from "./routes";
import { ukoTheme } from "./theme";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { appStore } from "components/ResumeBuilder/redux/store";
import { persistStore } from "redux-persist";
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
  console.log(resume);
  // App theme
  const appTheme = ukoTheme();

  // toaster options
  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
    },
  };

  return (
    <>
      {/* <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Toaster toastOptions={toasterOptions} />
          {allPages}
        </ThemeProvider>
      </StyledEngineProvider> */}
      <>
        <Provider store={appStore}>
          <PersistGate persistor={persistStore(appStore)}>
            <ThemeProviderStyled theme={theme}>{resume}</ThemeProviderStyled>
          </PersistGate>
        </Provider>
        <ToastContainer />
      </>
    </>
  );
};

export default App;
