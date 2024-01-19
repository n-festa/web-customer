import Router from "next/router";
import { Fragment } from "react";
import { wrapper } from "../../store";

// types
import type { AppProps } from "next/app";

// global styles
import "swiper/swiper.scss";

import "../assets/css/bootstrap.min.css";
import "../assets/css/global.css";
import "../assets/css/style.css";
//import '../assets/css/OTP.css';
//import '../assets/css/phone_ver.css';

import * as gtag from "../../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
    // Notice how we track pageview when route is changed
    Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Fragment>
        <Component {...pageProps} />
    </Fragment>
);

export default wrapper.withRedux(MyApp);
