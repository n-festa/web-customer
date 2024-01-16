import Layout from "../layouts/main";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";
import { useRouter } from "next/router";

type LoginMail = {
    email: string;
    password: string;
    name: string;
    username: string;
};

const RegisterPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter();

    const onSubmit = async (data: LoginMail) => {
        const res = await postData(`${server}/api/v1/register`, {
            email: data.email,
            password: data.password,
            username: data.username,
            name: data.name,
        });

        console.log(res);
        if (res.type !== "success") {
            console.log("error");
        } else {
            router.push("/login");
        }
    };

    return (
        <Layout>
            <section className="form-page">
                <div className="container">
                    <div className="back-button-section">
                        <Link href="/products">
                            <a>
                                <i className="icon-left"></i> Back to store
                            </a>
                        </Link>
                    </div>

                    <div className="form-block">
                        <h2 className="form-block__title">Create an account and discover the benefits</h2>

                        <div className="form-block">
                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        placeholder=" Name"
                                        name="name"
                                        type="text"
                                        ref={register({ required: true })}
                                    />
                                    {errors.name && errors.name.type === "required" && (
                                        <p className="message message--error">This field is required</p>
                                    )}
                                </div>

                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        placeholder="UserName"
                                        name="username"
                                        type="text"
                                        ref={register({ required: true })}
                                    />
                                    {errors.username && errors.username.type === "required" && (
                                        <p className="message message--error">This field is required</p>
                                    )}
                                </div>

                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        placeholder="email"
                                        type="text"
                                        name="email"
                                        ref={register({
                                            required: true,
                                            pattern:
                                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        })}
                                    />
                                    {errors.email && errors.email.type === "required" && (
                                        <p className="message message--error">This field is required</p>
                                    )}

                                    {errors.email && errors.email.type === "pattern" && (
                                        <p className="message message--error">Please write a valid email</p>
                                    )}
                                </div>

                                <div className="form__input-row">
                                    <input
                                        className="form__input"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        ref={register({ required: true })}
                                    />
                                    {errors.password && errors.password.type === "required" && (
                                        <p className="message message--error">This field is required</p>
                                    )}
                                </div>

                                <button className="btn btn--rounded btn--yellow btn-submit" type="submit">
                                    Sign up
                                </button>

                                <p className="form__signup-link">
                                    <Link href="/login">
                                        <a href="#">Are you already a member?</a>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default RegisterPage;
