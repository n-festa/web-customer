import Layout from "../layouts/frontLayout";

const HomePage = () => {
    return (
        <Layout>
            <section className="header-section d-flex justify-content-center">
                <div className="container header-container d-flex justify-content-between align-items-center gap-5">
                    <img className="star-icon" alt="" src="/images/menu03.svg" />
                    <div className="content12">
                        <img className="" alt="" src="/images/fictional-company-logo.svg" />

                        <div className="search-input-wrapper d-flex">
                            <div className="dropdown">
                                <div className="">Giao đến</div>
                                <img className="" alt="" src="./images/markerpin01.svg" />
                            </div>
                            <input
                                type="text"
                                className="search-input flex-grow-1"
                                placeholder="22 Nguyễn Đình Thi, phường Phước Long B, thành phố Thủ
                                   Đức, thành phố Hồ Chí Minh"
                            />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="">Hotline: 1900 54 54</div>
                        <div className="nav-item-button">
                            <img className="" alt="" src="/images/shoppingbag03.svg" />
                            <div className="cart-item-number">2</div>
                        </div>
                        <div className="user-avatar">
                            <img src="/images/avatar.png" alt="avatar" />
                        </div>
                        <div className="d-flex gap-1">
                            <div className="font-weight-500">VIE</div>
                            <img className="" alt="" src="/images/vn.svg" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="d-flex flex-column container">
                <div className="search-item-wrapper d-flex">
                    <img className="" alt="" src="./public/searchmd.svg" />

                    <input
                        type="text"
                        className="search-item flex-grow-1"
                        placeholder="Gõ tên món ăn, nhà hàng mà bạn đang muốn tìm"
                    />
                </div>

                <div className="categories-container d-flex flex-column py-4 w-100">
                    <div className="mb-3 categories-wrapper w-100 d-flex justify-content-between">
                        <div
                            className="category-card d-flex justify-content-center align-items-end"
                            //  style="background-image: url('./public/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-4@2x.png'); background-size: contain"
                            style={{
                                backgroundImage:
                                    "url('./public/6387f1a42a5ed-2cb5b1da8a9eb55b2b5f44f5062da90c31f7tz-rqtransformed-3@2x.png')",
                                backgroundSize: "contain",
                            }}
                        >
                            <div className="category-heading pb-2">Ăn nhẹ &lt; 300 kcal</div>
                        </div>
                        <div
                            className="category-card d-flex justify-content-center align-items-end"
                            // style="background-image: url('./public/6387ed7ea3501-60662771e1f786b292c592665a3c4aeetransformed-3@2x.png'); background-size: contain"
                            style={{
                                backgroundImage:
                                    "url('./public/6387f1a42a5ed-2cb5b1da8a9eb55b2b5f44f5062da90c31f7tz-rqtransformed-3@2x.png')",
                                backgroundSize: "contain",
                            }}
                        >
                            <div className="category-heading pb-2">Món thuần chay</div>
                        </div>
                        <div
                            className="category-card d-flex justify-content-center align-items-end"
                            //style="background-image: url('./public/6387ee4da768d-7299a2512db8d117fdd5c117eb727927transformed-1@2x.png'); background-size: contain"
                            style={{
                                backgroundImage:
                                    "url('./public/6387ee4da768d-7299a2512db8d117fdd5c117eb727927transformed-1@2x.png')",
                                backgroundSize: "contain",
                            }}
                        >
                            <div className="category-heading pb-2">Không thịt đỏ</div>
                        </div>
                        <div
                            className="category-card d-flex justify-content-center align-items-end"
                            //style="background-image: url('./public/6387f1a42a5ed-2cb5b1da8a9eb55b2b5f44f5062da90c31f7tz-rqtransformed-3@2x.png'); background-size: contain"
                            style={{
                                backgroundImage:
                                    "url('./public/6387f1a42a5ed-2cb5b1da8a9eb55b2b5f44f5062da90c31f7tz-rqtransformed-3@2x.png')",
                                backgroundSize: "contain",
                            }}
                        >
                            <div className="category-heading pb-2">BỮA ĂN CÂN BẰNG</div>
                        </div>
                    </div>
                    <div className="pagination d-flex justify-content-end align-items-center">
                        <div className="carousel-arrow">
                            <img className="search-md-icon" alt="" src="./public/chevronleft.svg" />
                        </div>
                        <div className="pagination-dot-group">
                            <div className="pagination-dot-indicator active"></div>
                            <div className="pagination-dot-indicator"></div>
                            <div className="pagination-dot-indicator"></div>
                        </div>
                        <div className="carousel-arrow">
                            <img className="search-md-icon" alt="" src="./public/chevronright.svg" />
                        </div>

                        <b className="get-all-button">Xem tất cả</b>
                    </div>
                </div>

                <div className="attractive-dishes-section d-flex flex-column w-100">
                    <div className="title-section d-flex justify-content-between align-items-end w-100">
                        <div className="title-and-sub-title flex-grow-1 d-flex flex-column">
                            <div className="card-title">Hấp dẫn</div>
                            <div className="sub-title">Khám phá món hấp dẫn xung quanh bạn</div>
                        </div>
                        <b className="get-all-button">Xem tất cả</b>
                    </div>

                    <div className="food-cards d-flex justify-content-between py-4">
                        <div className="food-card d-flex flex-column">
                            <div className="frame-parent d-flex flex-column position-relative">
                                <div className="discount-wrapper">
                                    <b className="discount">GIẢM GIÁ ĐẶC BIỆT</b>
                                </div>
                                <div className="image-wrapper d-flex justify-content-center">
                                    <img
                                        className=""
                                        alt=""
                                        src="./public/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"
                                    />
                                </div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>Mỳ Cá Cờ Sốt Yakitori</b>
                                        <div className="chef-name">
                                            <span className="font-weight-500">by </span>
                                            <b className="name">The Chef Town</b>
                                        </div>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin02.svg" />

                                            <div className="kcal font-weight-600">356 Kcal</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="small-icon" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="ingredient-wrapper">
                                        <span className="cooking-method font-weight-600">Luộc</span>
                                        <span className="font-weight-500">
                                            | Hành tây, tiêu xanh, cà chua, bắp, ngò rí, bơ chín và nước cốt chanh.
                                        </span>
                                    </div>
                                    <div className="pricing-wrapper d-flex align-items-center gap-2">
                                        <div className="price-before">95,000</div>
                                        <b className="price-after">80,000</b>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>
                                </div>
                                <div className="add-to-cart-button">
                                    <img src="./public/plus.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="food-card d-flex flex-column">
                            <div className="frame-parent d-flex flex-column">
                                <div className="image-wrapper d-flex justify-content-center">
                                    <img
                                        className=""
                                        alt=""
                                        src="./public/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"
                                    />
                                </div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>Mỳ Cá Cờ Sốt Yakitori</b>
                                        <div className="chef-name">
                                            <span className="font-weight-500">by </span>
                                            <b className="name">The Chef Town</b>
                                        </div>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin02.svg" />

                                            <div className="kcal font-weight-600">356 Kcal</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="small-icon" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="ingredient-wrapper">
                                        <span className="cooking-method font-weight-600">Luộc</span>
                                        <span className="font-weight-500">
                                            | Hành tây, tiêu xanh, cà chua, bắp, ngò rí, bơ chín và nước cốt chanh.
                                        </span>
                                    </div>
                                    <div className="pricing-wrapper d-flex align-items-center gap-2">
                                        <div className="price-before">95,000</div>
                                        <b className="price-after">80,000</b>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>
                                </div>
                                <div className="add-to-cart-button">
                                    <img src="./public/plus.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="food-card d-flex flex-column">
                            <div className="frame-parent d-flex flex-column">
                                <div className="image-wrapper d-flex justify-content-center">
                                    <img
                                        className=""
                                        alt=""
                                        src="./public/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"
                                    />
                                </div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>Mỳ Cá Cờ Sốt Yakitori</b>
                                        <div className="chef-name">
                                            <span className="font-weight-500">by </span>
                                            <b className="name">The Chef Town</b>
                                        </div>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin02.svg" />

                                            <div className="kcal font-weight-600">356 Kcal</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="small-icon" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="small-icon" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="ingredient-wrapper">
                                        <span className="cooking-method font-weight-600">Luộc</span>
                                        <span className="font-weight-500">
                                            | Hành tây, tiêu xanh, cà chua, bắp, ngò rí, bơ chín và nước cốt chanh.
                                        </span>
                                    </div>
                                    <div className="pricing-wrapper d-flex align-items-center gap-2">
                                        <div className="price-before">95,000</div>
                                        <b className="price-after">80,000</b>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="small-icon" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>
                                </div>
                                <div className="add-to-cart-button">
                                    <img src="./public/plus.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="outstanding-location-and-chef-section w-100 py-4">
                    <div className="title-section d-flex justify-content-between align-items-end w-100">
                        <div className="title-and-sub-title flex-grow-1 d-flex flex-column">
                            <div className="card-title">Bếp nổi bật tuần này</div>
                            <div className="sub-title">Khám phá những quán ăn, đầu bếp nổi bật xung quanh bạn</div>
                        </div>
                        <b className="get-all-button">Xem tất cả</b>
                    </div>

                    <div className="food-cards d-flex justify-content-between py-4">
                        <div className="food-card d-flex flex-column">
                            <div className="d-flex flex-column position-relative w-100">
                                <div
                                    className="media-wrapper d-flex justify-content-center"
                                    //   style="background-image: url('./public/video-player.svg')"
                                    style={{ backgroundImage: "url('./public/video-player.svg')" }}
                                ></div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>The Chef Town</b>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="food-name-wrapper">
                                        <span className="font-weight-600">Eat Clean | Cơm nhật Tonkatsu</span>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>

                                    <div className="chay-available d-flex gap-1 align-items-center">
                                        <img src="./public/iconvegan.svg" alt="" />
                                        <span>Có bán món chay</span>
                                    </div>

                                    <div className="price-range">50,000 - 100,000đ</div>
                                </div>
                            </div>
                        </div>

                        <div className="food-card d-flex flex-column">
                            <div className="d-flex flex-column position-relative w-100">
                                <div
                                    className="media-wrapper d-flex justify-content-center"
                                    style={{ backgroundImage: "url('./public/video-player.svg')" }}
                                ></div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>The Chef Town</b>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="food-name-wrapper">
                                        <span className="font-weight-600">Eat Clean | Cơm nhật Tonkatsu</span>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>

                                    <div className="chay-available d-flex gap-1 align-items-center">
                                        <img src="./public/iconvegan.svg" alt="" />
                                        <span>Có bán món chay</span>
                                    </div>

                                    <div className="price-range">50,000 - 100,000đ</div>
                                </div>
                            </div>
                        </div>

                        <div className="food-card d-flex flex-column">
                            <div className="d-flex flex-column position-relative w-100">
                                <div
                                    className="media-wrapper d-flex justify-content-center"
                                    style={{ backgroundImage: "url('./public/video-player.svg')" }}
                                    //  style="background-image: url('./public/video-player.svg')"
                                ></div>
                            </div>
                            <div className="card-info-wrapper d-flex flex-column position-relative">
                                <div className="card-info d-flex flex-column gap-1">
                                    <div className="food-and-chef-name d-flex flex-column gap-1">
                                        <b>The Chef Town</b>
                                    </div>
                                    <div className="general-info d-flex gap-2">
                                        <div className="d-flex align-items-center gap-1">
                                            <img className="" alt="" src="./public/star-icon1.svg" />

                                            <div className="text">4.5</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/markerpin021.svg" />

                                            <div className="text">3,2 km</div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2px">
                                            <img className="" alt="" src="./public/timer.svg" />

                                            <div className="text">20 min</div>
                                        </div>
                                    </div>
                                    <div className="food-name-wrapper">
                                        <span className="font-weight-600">Eat Clean | Cơm nhật Tonkatsu</span>
                                    </div>
                                    <div className="discount-up-to-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2729.svg" />

                                        <div className="discount-up-to">Ưu đãi đến 50k</div>
                                    </div>
                                    <div className="flavor-time-wrapper d-flex align-items-center gap-1">
                                        <img className="" alt="" src="./public/frame-2725.svg" />

                                        <div className="flavor-time">Đặt trước 09:00 giờ sáng để điều chỉnh vị</div>
                                    </div>

                                    <div className="chay-available d-flex gap-1 align-items-center">
                                        <img src="./public/iconvegan.svg" alt="" />
                                        <span>Có bán món chay</span>
                                    </div>

                                    <div className="price-range">50,000 - 100,000đ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
