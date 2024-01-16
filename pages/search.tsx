import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

const Search = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Search</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default Search;
