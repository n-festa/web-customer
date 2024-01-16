import { Flex } from "@chakra-ui/react";

const Banner = () => {
    return (
        <Flex
            bg="var(--primary-color)"
            p="7.5rem 0"
            justifyContent="center"
            flexDir="column"
            fontSize="6rem"
            color="white"
        >
            <div className="container d-flex align-items-center">
                <div className="d-flex flex-column align-items-start gap-5">
                    <div className="heading-and-supporting-text d-flex flex-column gap-3">
                        <div className="heading-and-subheading">
                            <div className="heading font-weight-600 ">
                                <p className="mb-0">Đặt ngay bữa ăn</p>
                                <p className="ngon-lanh mb-0">ngon & lành</p>
                                <p className="mb-0">của riêng bạn</p>
                            </div>
                        </div>
                        <div className="supporting-text">
                            Một bữa ăn ngon lành, đầy đủ dưỡng chất, được chế biến theo khẩu vị của bạn. Không cần lo
                            nghĩ, không cần nấu, hẹn giờ giao linh hoạt.
                        </div>
                    </div>
                    <div className="find-food-wrapper d-flex justify-content-center">
                        <div className="address-input-wrapper d-flex gap-2">
                            <div className="d-flex justify-content-between align-items-center px-3 gap-3">
                                <img className="small-icon" alt="" src="/images/markerpin03.svg" />

                                <input
                                    className="address-input font-weight-500"
                                    placeholder="Nhập địa chỉ để tìm món ngon gần bạn"
                                />
                            </div>
                            <button type="button" className="find-food-button d-flex">
                                <span className="font-weight-600">Tìm món</span>
                            </button>
                        </div>
                    </div>
                </div>
                <img
                    className="food-image"
                    alt=""
                    src="images/screen-shot-20230829-at-11-28-37-pmtransformed-5@2x.png"
                />
            </div>
        </Flex>
    );
};

export default Banner;
