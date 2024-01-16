import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

const Order = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Order</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default Order;
