import { Swiper, SwiperSlide } from "swiper/react";

const Test = () => {
    return (
        <section className="rating-and-review-section d-flex justify-content-center">
            <div className="rating-and-review-container container d-flex flex-column align-items-center">
                <b className="heading">Mọi người yêu thích 2All</b>
                <div className="rating-review-cards d-flex gap-3">
                    <Swiper
                        slidesPerView={3}
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <div className="rating-review-card d-flex flex-column gap-3">
                                <div className="review">
                                    “1. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch
                                    vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong
                                    tình trạng tốt nhất.”
                                </div>
                                <div className="stars">
                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rating-review-card d-flex flex-column gap-3">
                                <div className="review">
                                    “2. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch
                                    vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong
                                    tình trạng tốt nhất.”
                                </div>
                                <div className="stars">
                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rating-review-card d-flex flex-column gap-3">
                                <div className="review">
                                    “3. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch
                                    vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong
                                    tình trạng tốt nhất.”
                                </div>
                                <div className="stars">
                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rating-review-card d-flex flex-column gap-3">
                                <div className="review">
                                    “5. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch
                                    vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong
                                    tình trạng tốt nhất.”
                                </div>
                                <div className="stars">
                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="rating-review-card d-flex flex-column gap-3">
                                <div className="review">
                                    “7. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch
                                    vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong
                                    tình trạng tốt nhất.”
                                </div>
                                <div className="stars">
                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />

                                    <img className="small-icon" alt="" src="/images/star-icon2.svg" />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Test;
