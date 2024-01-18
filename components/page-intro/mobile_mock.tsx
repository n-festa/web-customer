import { Box, Img } from "@chakra-ui/react";

const MobileMock = () => {
    return (
        <Box className="mock-up-mobile-app">
            <Box className="main-screen">
                <Img className="" alt="" src="/images/-elements--iphone-x--status-bar.svg" />
                <Box px="15px" className="heading d-flex justify-content-between mt-3">
                    <b className="mn-ngon-hm">Món ngon hôm nay</b>
                    <Img className="" alt="" src="/images/vuesaxlineararrowright.svg" />
                </Box>
                <Box display="flex" flexDir="column" className="food-card-parent">
                    <Box className="food-card m-3">
                        <Box className="rectangle-parent d-flex flex-column align-items-center">
                            <Box className="discount-wrapper w-100 py-2 px-3">
                                <b className="discount">GIẢM GIÁ</b>
                            </Box>

                            <Img className="food-image2" alt="" src="/images/mask-group4@2x.png" />
                        </Box>

                        <Box className="card-info-wrapper-2 d-flex flex-column">
                            <Box className="heading-and-icon-parent d-flex flex-column gap-1">
                                <b className="heading">Summer Avo Salad</b>

                                <Box className="chef-name">
                                    <span className="font-weight-500">by </span>
                                    <span className="name font-weight-600">The Bistro Thảo Điền</span>
                                </Box>
                            </Box>
                            <Box className="card-info-detail d-flex">
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img alt="" src="/images/star-icon4.svg" />
                                    <Box className="">4.5</Box>
                                </Box>
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img className="" alt="" src="/images/markerpin022.svg" />

                                    <Box className="">3,2 km</Box>
                                </Box>
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img className="" alt="" src="/images/markerpin023.svg" />

                                    <Box className="">356 Kcal</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="food-card-parent d-flex flex-column">
                    <Box className="food-card m-3">
                        <Box className="rectangle-parent d-flex flex-column align-items-center">
                            <Box className="discount-wrapper w-100 py-2 px-3">
                                <b className="discount">GIẢM GIÁ</b>
                            </Box>

                            <Img className="food-image2" alt="" src="/images/mask-group4@2x.png" />
                        </Box>

                        <Box className="card-info-wrapper-2 d-flex flex-column">
                            <Box className="heading-and-icon-parent d-flex flex-column gap-1">
                                <b className="heading">Summer Avo Salad</b>

                                <Box className="chef-name">
                                    <span className="font-weight-500">by </span>
                                    <span className="name font-weight-600">The Bistro Thảo Điền</span>
                                </Box>
                            </Box>
                            <Box className="card-info-detail d-flex">
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img alt="" src="/images/star-icon4.svg" />
                                    <Box className="">4.5</Box>
                                </Box>
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img className="" alt="" src="/images/markerpin022.svg" />

                                    <Box className="">3,2 km</Box>
                                </Box>
                                <Box className="d-flex gap-1 justify-content-center align-items-center">
                                    <Img className="" alt="" src="/images/markerpin023.svg" />

                                    <Box className="">356 Kcal</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MobileMock;
