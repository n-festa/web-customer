const Testimonial = () => {
    return (
        <section className="rating-and-review-section d-flex justify-content-center">
            <div className="rating-and-review-container container d-flex flex-column align-items-center">
                <b className="heading">Mọi người yêu thích 2All</b>
                <div className="rating-review-cards d-flex gap-3">
                    <div className="rating-review-card d-flex flex-column gap-3">
                        {/*
                        <div className="customer d-flex justify-content-between w-100">
                            <div className="d-flex gap-3">
                                <img className="customer-avatar" alt="" src="/images/pic@2x.png"/>
                                <div className="loyal-customer-wrapper d-flex flex-column ">
                                    <div className="loyal-customer-name">Alexander R.</div>
                                    <div className="loyal-customer">Khách hàng thân thiết</div>
                                </div>
                            </div>
                            <img className="quote" alt="" src="/images/path-173.svg"/>
                        </div>
                         */}
                        <div className="review">
                            “1. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao
                            hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt
                            nhất.”
                        </div>

                        <div className="stars">
                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                        </div>
                    </div>
                    <div className="rating-review-card d-flex flex-column gap-3">
                        <div className="review font-weight-500">
                            “2. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao
                            hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt
                            nhất.”
                        </div>
                        <div className="stars">
                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                        </div>
                    </div>
                    <div className="rating-review-card d-flex flex-column gap-3">
                        <div className="review font-weight-500">
                            “3. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao
                            hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt
                            nhất.”
                        </div>
                        <div className="stars">
                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                            <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                        </div>
                    </div>
                </div>
                <div className="paginator d-flex justify-content-end mt-5">
                    <div className="paginator-arrow">
                        <img className="small-icon" alt="" src="/images/chevronleft.svg" />
                    </div>
                    <div className="pagination-dot-group d-flex justify-content-center align-items-center ">
                        <div className="pagination-dot-indicator active"></div>
                        <div className="pagination-dot-indicator"></div>
                        <div className="pagination-dot-indicator"></div>
                    </div>
                    <div className="paginator-arrow">
                        <img className="small-icon" alt="" src="/images/chevronright.svg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
