import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

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
