import Link from "next/link";
import { loadState, removeState } from "utils/localstorage";
import { useRouter } from "next/router";

const CheckLogin = () => {
    const router = useRouter();
    async function logout() {
        removeState("userLogIn");
        router.reload();
    }

    const user = loadState("userLogIn");

    if (user) {
        console.log(user);
        return (
            <div className="navbar-navt">
                <a
                    className="nav-link dropdown-toggle mr-2"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="icon-avatar"></i>
                    <span>{user.name}</span>
                </a>

                <button className="btn-cart" onClick={() => logout()}>
                    Logout
                </button>
            </div>
        );
    }
    return (
        <Link href="/login">
            <button className="site-header__btn-avatar">
                <i className="icon-avatar"></i>
            </button>
        </Link>
    );
};

export default CheckLogin;
