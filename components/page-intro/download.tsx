const WhyChoose = () => {
    return (
        <section className="download-app-section d-flex justify-content-center" id="download-section">
            <div className="download-app-container container">
                <div className="mobile-app-wrapper d-flex">
                    <div className="container3 d-flex justify-content-center align-items-center">
                        <div className="download-app-wrapper d-flex align-self-stretch flex-column flex-grow-1">
                            <div className="">
                                <div className="heading">Tải ứng dụng dùng ngay</div>
                                <div className="description">
                                    Trải nghiệm tìm kiềm món ngon tại 2ALL tốt hơn trên ứng dụng điện thoại. Hiện đã có
                                    mặt tại 2 nền tảng iOS và Android.
                                </div>
                            </div>
                            <div className="actions d-flex">
                                <img className="" alt="" src="/images/mobile-app-store-badge.svg" />

                                <img className="" alt="" src="/images/mobile-app-store-badge1.svg" />
                            </div>
                        </div>
                        <div className="food-wrapper">
                            <img className="foodbox-2-1" alt="" src="/images/foodbox-2-1@2x.png" />

                            <img className="foodbox-5-1" alt="" src="/images/foodbox-5-1@2x.png" />
                        </div>

                        <div className="mock-up-mobile-app-wrapper">
                            <div className="mock-up-mobile-app">
                                <div className="main-screen">
                                    <img className="" alt="" src="/images/-elements--iphone-x--status-bar.svg" />

                                    <div className="heading d-flex justify-content-between px-3 mt-3">
                                        <b className="mn-ngon-hm">Món ngon hôm nay</b>
                                        <img className="" alt="" src="/images/vuesaxlineararrowright.svg" />
                                    </div>

                                    <div className="food-card-parent d-flex flex-column">
                                        <div className="food-card m-3">
                                            <div className="rectangle-parent d-flex flex-column align-items-center">
                                                <div className="discount-wrapper w-100 py-2 px-3">
                                                    <b className="discount">GIẢM GIÁ</b>
                                                </div>

                                                <img className="food-image2" alt="" src="/images/mask-group4@2x.png" />
                                            </div>

                                            <div className="card-info-wrapper-2 d-flex flex-column">
                                                <div className="heading-and-icon-parent d-flex flex-column gap-1">
                                                    <b className="heading">Summer Avo Salad</b>

                                                    <div className="chef-name">
                                                        <span className="font-weight-500">by </span>
                                                        <span className="name font-weight-600">
                                                            The Bistro Thảo Điền
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-info-detail d-flex">
                                                    <div className="d-flex gap-1 justify-content-center align-items-center">
                                                        <img alt="" src="/images/star-icon4.svg" />
                                                        <div className="">4.5</div>
                                                    </div>
                                                    <div className="d-flex gap-1 justify-content-center align-items-center">
                                                        <img className="" alt="" src="/images/markerpin022.svg" />

                                                        <div className="">3,2 km</div>
                                                    </div>
                                                    <div className="d-flex gap-1 justify-content-center align-items-center">
                                                        <img className="" alt="" src="/images/markerpin023.svg" />

                                                        <div className="">356 Kcal</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
