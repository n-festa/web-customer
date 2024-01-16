import Layout from "../layouts/main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";

const Profile = () => {
    return (
        <Layout>
            <Breadcrumb />
            <section className="products-page">
                <div className="container">Profile</div>
            </section>
            <Footer />
        </Layout>
    );
};

export default Profile;
