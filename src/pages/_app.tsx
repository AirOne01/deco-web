import { dark } from '@clerk/themes';
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ThemeProvider } from "@mui/material/styles";
import "~/styles/globals.css";
import { CssBaseline, createTheme } from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
