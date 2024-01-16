const WhyChoose = () => {
    return (
        <section className="why-choose-us-section d-flex justify-content-center">
            <div className="why-choose-us-wrapper container d-flex">
                <div className="why-choose-us d-flex flex-column align-items-center justify-content-center">
                    <div className="why-choose-us-heading">Tại sao chọn 2All</div>
                    <div className="why-choose-us-reason d-flex flex-column align-items-center gap-4">
                        <div className="reason-wrapper">
                            <div className="logo">
                                <img alt="" src="/images/group-427320334.svg" />
                            </div>
                            <div className="heading">Bữa ăn theo nhu cầu</div>
                            <div className="description">
                                Lựa chọn thực phẩm, các món ăn theo nhu cầu dinh dưỡng, khẩu vị và thể trạng của bạn
                            </div>
                        </div>
                        <div className="reason-wrapper">
                            <div className="logo">
                                <img alt="" src="/images/nutrition.svg" />
                            </div>
                            <div className="heading">Thông tin dinh dưỡng đầy đủ</div>
                            <div className="description">
                                Thông tin dinh dưỡng cho từng món ăn bao gồm số Kcal, protein, lipid,carb,...
                            </div>
                        </div>
                        <div className="reason-wrapper">
                            <div className="logo">
                                <img alt="" src="/images/delivery.svg" />
                            </div>
                            <div className="heading">Đặt hàng hẹn giờ linh hoạt</div>
                            <div className="description">
                                Đặt hàng với khung giờ giao linh hoạt, phù hợp với nhu cầu của bạn.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="why-choose-us-image d-flex justify-content-center align-items-center p-5">
                    <img alt="" src="/images/group-427320333@2x.png" />
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
