import Header from "components/header";
import Head from "next/head";

type LayoutType = {
    title?: string;
    children?: React.ReactNode;
};

export default ({ children, title = "2ALL" }: LayoutType) => {
    return (
        <div className="app-main">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/images/logo.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
                />
                <link href="https://fonts.cdnfonts.com/css/svn-gilroy" rel="stylesheet" />

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" />
            </Head>
            <main className="landing-page-option-3 d-flex flex-column">
                <Header />
                {children}
            </main>
        </div>
    );
};
