import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";

type LayoutType = {
    title?: string;
    children?: React.ReactNode;
};

export default ({ children, title = "2ALL" }: LayoutType) => {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <div className="app-main">
            <Head>
                <title>Page not found &mdash; {title}</title>
                <link rel="icon" href="/images/logo.ico" />
            </Head>

            <Header />

            <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
        </div>
    );
};
