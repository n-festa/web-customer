import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

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
