import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

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
