import { dark } from '@clerk/themes';
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from '~/components/theme-provider';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
