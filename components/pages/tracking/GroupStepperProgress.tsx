import {
    Box,
    Flex,
    FlexProps,
    Image,
    Progress,
    Step,
    StepIndicator,
    StepStatus,
    Stepper,
    Text,
    useBreakpointValue,
    useSteps,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const GroupStepperProgress = (props: FlexProps) => {
    const t = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION");
    const steps =
        useBreakpointValue({
            base: [
                { title: "1", description: t("BASE.CONFIRM_ORDER"), time: "11:05 AM" },
                { title: "2", description: t("BASE.DRIVER_ARRIVED_RESTAURANT"), time: "11:15 AM" },
                { title: "3", description: t("BASE.DRIVER_LEFT_RESTAURANT"), time: "11:25 AM" },
                { title: "4", description: t("BASE.DRIVER_ARRIVED_DESTINATION"), time: "11:40 AM" },
            ],
            md: [
                { title: "1", description: t("MD.CONFIRM_ORDER"), time: "11:05 AM" },
                { title: "2", description: t("MD.DRIVER_ARRIVED_RESTAURANT"), time: "11:15 AM" },
                { title: "3", description: t("MD.DRIVER_LEFT_RESTAURANT"), time: "11:25 AM" },
                { title: "4", description: t("MD.DRIVER_ARRIVED_DESTINATION"), time: "11:40 AM" },
            ],
        }) ?? [];

    const { activeStep } = useSteps({
        index: 1,
        count: steps?.length,
    });

    const max = steps.length - 1;
    const progressPercent = (activeStep / max) * 100;
    return (
        <Flex {...props} bg="white" my="1rem" h="12.4rem" w="100%" justifyContent="center" alignItems="center">
            <Flex w="100.8rem" position="relative">
                <Stepper w="100%" zIndex={2} size="sm" index={activeStep} gap="0">
                    {steps.map((step, index) => (
                        <Flex alignItems="center" gap="1.2rem" flexDir="column" key={index} flex={1}>
                            <Step>
                                <StepIndicator sx={{}}>
                                    <StepStatus
                                        active={
                                            <Image w="1.2rem" h="1.05rem" src="/images/icons/Tick.svg" alt="tick" />
                                        }
                                        complete={
                                            <Image w="1.2rem" h="1.05rem" src="/images/icons/Tick.svg" alt="tick" />
                                        }
                                        incomplete={
                                            <Box borderRadius="50%" bg="var(--gray-200)" w="0.8rem" h="0.8rem" />
                                        }
                                    />
                                </StepIndicator>
                            </Step>
                            <Flex flexDir="column" alignItems="center">
                                <Text
                                    whiteSpace="pre-line"
                                    textAlign="center"
                                    fontSize="1.4rem"
                                    color="var(--gray-700)"
                                    fontWeight="600"
                                >
                                    {step.description}
                                </Text>
                                <Text fontSize="1.4rem" color="var(--gray-600)">
                                    {step.time}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Stepper>
                <Progress
                    mx="12.5%"
                    colorScheme="green"
                    position="absolute"
                    value={progressPercent}
                    height="0.3rem"
                    width="calc(100% - 25%)"
                    bg="var(--gray-200)"
                    top={{ base: "calc(50% - 3.75rem)", md: "calc(50% - 2.75rem)" }}
                />
            </Flex>
        </Flex>
    );
};

export default GroupStepperProgress;
