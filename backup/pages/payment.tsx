import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

const Payment = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Payment</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default Payment;
