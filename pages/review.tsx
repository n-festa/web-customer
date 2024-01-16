import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

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
