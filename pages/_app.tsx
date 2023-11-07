// ** React Imports
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";

// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** Store Imports
import { store } from "src/store";
import { Provider } from "react-redux";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** Config Imports
import "src/configs/i18n";
import { defaultACLObj } from "src/configs/acl";
import themeConfig from "src/configs/themeConfig";
import client from "@lib/apollo";

// ** Fake-DB Import
import "src/@fake-db";

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import AclGuard from "src/@core/components/auth/AclGuard";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";

// ** Spinner Import
import Spinner from "src/@core/components/spinner";

// ** Contexts
import { AuthProvider } from "src/context/AuthContext";
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";

// ** Styled Components
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Prismjs Styles
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

import "src/iconify-bundle/icons-bundle-react";

// ** Global css styles
import "../styles/globals.css";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  const setConfig = Component.setConfig ?? undefined;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ApolloProvider client={client}>
          <Head>
            <title>{`${themeConfig.templateName} | ${themeConfig.templateDescription}`}</title>
            <meta
              name="description"
              content={`${themeConfig.templateName} | ${themeConfig.templateDescription}`}
            />
            <meta
              name="keywords"
              content="Car, Vehicle, Buy Car, Sell Car, Search Car"
            />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link
              rel="manifest"
              href="/site.webmanifest"
              crossOrigin="use-credentials"
            />
          </Head>

          <AuthProvider>
            <SettingsProvider
              {...(setConfig ? { pageSettings: setConfig() } : {})}
            >
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <AclGuard
                          aclAbilities={aclAbilities}
                          guestGuard={guestGuard}
                          authGuard={authGuard}
                        >
                          {getLayout(<Component {...pageProps} />)}
                        </AclGuard>
                      </Guard>
                      <ReactHotToast>
                        <Toaster
                          position={settings.toastPosition}
                          toastOptions={{
                            className: "react-hot-toast",
                            duration: 4000,
                          }}
                        />
                      </ReactHotToast>
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </ApolloProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
