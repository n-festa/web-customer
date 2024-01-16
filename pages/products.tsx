import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

const Products = () => (
    <Layout>
        <Breadcrumb />
        <section className="products-page">
            <div className="container">Products</div>
        </section>
        <Footer />
    </Layout>
);

export default Products;
