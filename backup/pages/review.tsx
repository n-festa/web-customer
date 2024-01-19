import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

const Review = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Review</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default Review;
