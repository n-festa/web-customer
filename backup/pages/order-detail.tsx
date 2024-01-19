import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

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
