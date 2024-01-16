import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

const OrderDetail = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Order Details</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default OrderDetail;
