import Footer from "../components/footer";
import Banner from "../components/page-intro/banner";
import Contact from "../components/page-intro/contact";
import Download from "../components/page-intro/download";
import OrderStep from "../components/page-intro/order-step";
import Testimonial from "../components/page-intro/testimonial";
import Today from "../components/page-intro/today";
import WhyChoose from "../components/page-intro/why-choose";
import Layout from "../layouts/main";

const IndexPage = () => {
    return (
        <Layout>
            <Banner />

            <Today />
            <OrderStep />
            <WhyChoose />
            <Testimonial />
            <Contact />
            <Download />

            <Footer />
        </Layout>
    );
};

export default IndexPage;
