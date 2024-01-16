const OrderStep = () => {
    return (
        <section className="order-steps-section d-flex justify-content-center" id="order-section">
            <div className="order-steps-container container d-flex flex-column align-items-center">
                <b className="how-to-order">Cách đặt hàng</b>
                <div className="order-steps-wrapper">
                    <div className="order-steps d-flex justify-content-between">
                        <div className="order-step">
                            <div className="order-step-number-circle">
                                <div className="font-weight-600">1</div>
                            </div>
                            <div className="step-detail">
                                <b className="step-name">Tìm món ăn</b>
                                <img className="order-step-image" alt="" src="/images/mask-group@2x.png" />

                                <div className="order-step-description">
                                    Tìm các món ngon gần bạn hoặc theo gợi ý của nền tảng 2ALL
                                </div>
                            </div>
                        </div>
                        <div className="order-step">
                            <div className="order-step-number-circle">
                                <div className="font-weight-600">2</div>
                            </div>
                            <div className="step-detail">
                                <b className="step-name">Chọn món</b>
                                <img className="order-step-image" alt="" src="/images/mask-group1@2x.png" />

                                <div className="order-step-description">
                                    Chọn và điều chỉnh món ăn theo khẩu vị hoặc nhu cầu dinh dưỡng của bạn
                                </div>
                            </div>
                        </div>
                        <div className="order-step">
                            <div className="order-step-number-circle">
                                <div className="font-weight-600">3</div>
                            </div>
                            <div className="step-detail">
                                <b className="step-name">Đặt hàng</b>
                                <img className="order-step-image" alt="" src="/images/mask-group2@2x.png" />

                                <div className="order-step-description">
                                    Đặt hàng linh hoạt. Đảm bảo bạn nhận được món ăn theo khung giờ mong muốn
                                </div>
                            </div>
                        </div>
                        <div className="order-step">
                            <div className="order-step-number-circle">
                                <div className="font-weight-600">4</div>
                            </div>
                            <div className="step-detail">
                                <b className="step-name">Thưởng thức</b>
                                <img className="order-step-image" alt="" src="/images/mask-group3@2x.png" />

                                <div className="order-step-description">
                                    Tận hưởng món ăn ngon, lành và được chế biến theo khẩu vị của riêng bạn
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-div"></div>
                    <div className="line-div"></div>
                    <div className="line-div"></div>
                </div>
            </div>
        </section>
    );
};

export default OrderStep;
