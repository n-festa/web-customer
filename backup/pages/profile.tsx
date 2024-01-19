import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Layout from "../../layouts/main";

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
