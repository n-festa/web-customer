const Contact = () => {
    return (
        <section className="contact-us-section d-flex justify-content-center" id="contact-section">
            <div className="contact-us-container container">
                <div className="contact-us-card p-5 gap-5">
                    <div className="d-flex flex-column gap-4">
                        <b className="heading">Liên hệ để trở thành đối tác của 2ALL hôm nay</b>
                        <div className="description">
                            Chúng tôi chào đón đối tác trên toàn quốc để cùng cung cấp hàng triệu bữa ăn ngon và lành
                            cho khách hàng Việt Nam.
                        </div>
                    </div>
                    <div className="form d-flex flex-column">
                        <div className="form-fields d-flex flex-column align-self-stretch gap-4">
                            <div className="input-with-label d-flex flex-column">
                                <div className="label d-flex">Email</div>
                                <input className="input d-flex" placeholder="Vui lòng nhập email của bạn" />
                            </div>
                            <div className="input-with-label d-flex flex-column">
                                <div className="label d-flex">Message</div>
                                <textarea
                                    className="textarea d-flex"
                                    placeholder="Ví dụ: xin chào 2ALL, tôi có nhu cầu muốn hợp tác với bạn"
                                ></textarea>
                            </div>
                            <div className="recaptcha-wrapper d-flex align-items-center">
                                <input type="checkbox" />
                                <div className="flex-grow-1">Tôi không phải robot</div>
                                <img className="recaptcha-image" alt="" src="/images/image-10@2x.png" />
                            </div>
                        </div>
                        <div className="actions">
                            <div className="send-message-button">
                                <b>Gửi tin nhắn</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mixed-content d-flex justify-content-center align-items-center">
                    <img
                        className="cover-image"
                        alt=""
                        src="/images/6387eec683aaf-4a9394222d47f1b9b99be468ed6d0a66transformed-4@2x.png"
                    />

                    <div className="info-card first-card">
                        <img className="card-logo" alt="" src="/images/image-36x36@2x.png" />
                        <b className="card-text">Cải Kale</b>
                    </div>

                    <div className="info-card second-card">
                        <img className="card-logo" alt="" src="/images/image-36x361@2x.png" />
                        <b className="card-text">Cà Chua</b>
                    </div>

                    <div className="info-card third-card">
                        <img
                            className="card-logo"
                            alt=""
                            src="/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-31@2x.png"
                        />

                        <div className="d-flex flex-column position-relative">
                            <b className="card-text">Summer Avo Salad</b>
                            <div className="delivery">Đang giao hàng</div>
                            <div className="delivery-time">3:09 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
