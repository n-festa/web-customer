import { OrderStatusLogType, OrderStatusType } from "@/types/enum";
import { OrderStatusLog } from "@/types/order";
import { YYYYMMDDHHmm, YYYYMMDDhhmma, hhmma } from "@/utils/constants";
import { formatDate } from "@/utils/date";
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
} from "@chakra-ui/react";
import { isAfter, isToday } from "date-fns";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const ErrorStep = [OrderStatusLogType.FAILED, OrderStatusLogType.CANCELLED];

const GroupStepperProgress = ({
    orderStatus,
    isLoading,
    expectedTime,
    ...props
}: FlexProps & { expectedTime?: string | number; isLoading: boolean; orderStatus: OrderStatusLog[] }) => {
    const t = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bp =
        useBreakpointValue({
            base: "BASE",
            lg: "MD",
        }) ?? [];
    const { _step, activeStep } = useMemo(() => {
        let activeIndex = -1;
        const defaultStatusLogs: {
            [key: string]: {
                description: string;
                time: string;
                isError?: boolean;
                isCompleted?: boolean;
                isDefault?: boolean;
                color?: string;
            };
        } = {
            [OrderStatusLogType.CREATED]: { description: t(`${bp}.CREATED`), time: ``, isDefault: true },
            [OrderStatusLogType.CONFIRMED]: { description: t(`${bp}.CONFIRMED`), time: ``, isDefault: true },
            [OrderStatusLogType.STARTED_TO_PROCESS]: {
                description: t(`${bp}.STARTED_TO_PROCESS`),
                time: ``,
                isDefault: true,
            },
            [OrderStatusLogType.PICKED_UP]: { description: t(`${bp}.PICKED_UP`), time: ``, isDefault: true },
            [OrderStatusLogType.COMPLETED]: {
                description: t(`${bp}.COMPLETED`),
                time: expectedTime
                    ? formatDate(
                          Number(expectedTime),
                          isToday(expectedTime) ? hhmma : bp === "BASE" ? YYYYMMDDHHmm : YYYYMMDDhhmma,
                      )
                    : ``,
                isCompleted: true,
                isDefault: true,
                color: isAfter(Number(expectedTime), new Date()) ? "#079455" : "#D92D20",
            },
        };
        const isStuck = orderStatus.some((item) => item.status === OrderStatusType.STUCK);
        orderStatus.forEach((status) => {
            const mileStone = status.milestone;
            if (mileStone) {
                activeIndex = activeIndex + 1;
            }
            if (mileStone && defaultStatusLogs[mileStone]) {
                if (isStuck && mileStone !== OrderStatusLogType.CREATED && mileStone !== OrderStatusLogType.CONFIRMED) {
                    return;
                }
                defaultStatusLogs[mileStone] = {
                    ...defaultStatusLogs[mileStone],
                    time: formatDate(
                        Number(status.logged_at),
                        isToday(status.logged_at) ? hhmma : bp === "BASE" ? YYYYMMDDHHmm : YYYYMMDDhhmma,
                    ),
                    isDefault: false,
                };
            }
            if (mileStone && ErrorStep.includes(mileStone)) {
                defaultStatusLogs[mileStone] = {
                    description: t(`${bp}.${mileStone.toUpperCase()}`),
                    time: formatDate(
                        Number(status.logged_at),
                        isToday(status.logged_at) ? hhmma : bp === "BASE" ? YYYYMMDDHHmm : YYYYMMDDhhmma,
                    ),
                    isDefault: false,
                    isError: true,
                };
                if (Object.keys(defaultStatusLogs).length > 5) {
                    delete defaultStatusLogs[OrderStatusLogType.COMPLETED];
                }
            }
        });
        let isDone = false;
        const _step = Object.values(defaultStatusLogs)
            .sort((a, b) => {
                if (a.isDefault) return 1;
                if (b.isDefault) return -1;
                return 0;
            })
            .filter((item) => {
                if (item.isError) {
                    isDone = true;
                }
                return isDone ? !item.isDefault : true;
            });

        if (isStuck) {
            activeIndex = 1;
        }
        return { _step: _step, activeStep: activeIndex ?? 0 };
    }, [bp, orderStatus, t]);

    const max = _step.length - 1;
    const progressPercent = (activeStep / max) * 100;
    return (
        <Flex {...props} bg="white" my="1rem" h="12.4rem" w="100%" justifyContent="center" alignItems="center">
            {!isLoading && (
                <Flex w="100.8rem" position="relative">
                    <Stepper w="100%" zIndex={2} size="sm" index={activeStep} gap="0">
                        {_step.map((step, index) => (
                            <Flex alignItems="center" gap="1.2rem" flexDir="column" key={`step${index}`} flex={1}>
                                <Step>
                                    <StepIndicator borderColor={step.isError ? "red !important" : undefined} sx={{}}>
                                        <StepStatus
                                            active={
                                                step.isError ? (
                                                    <XIcon color="red" />
                                                ) : (
                                                    <Image
                                                        w="1.2rem"
                                                        h="1.05rem"
                                                        src="/images/icons/Tick.svg"
                                                        alt="tick"
                                                    />
                                                )
                                            }
                                            complete={
                                                step.isError ? (
                                                    <XIcon color="red" />
                                                ) : (
                                                    <Image
                                                        w="1.2rem"
                                                        h="1.05rem"
                                                        src="/images/icons/Tick.svg"
                                                        alt="tick"
                                                    />
                                                )
                                            }
                                            incomplete={
                                                <Box borderRadius="50%" bg="var(--gray-200)" w="0.8rem" h="0.8rem" />
                                            }
                                        />
                                    </StepIndicator>
                                </Step>
                                <Flex flexDir="column" alignItems="center">
                                    <Text
                                        whiteSpace={{ base: "pre-line", lg: "nowrap" }}
                                        textAlign="center"
                                        fontSize={{ base: "1rem", lg: "1.4rem" }}
                                        color="var(--gray-700)"
                                        fontWeight="600"
                                    >
                                        {step.description}
                                    </Text>
                                    <Text
                                        whiteSpace={"nowrap"}
                                        minH="2.1rem"
                                        fontSize={{ base: "1rem", md: "1.2rem", lg: "1.4rem" }}
                                        color={step.color ?? "var(--gray-600)"}
                                    >
                                        {step.time}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Stepper>
                    <Progress
                        mx={`${100 / _step.length / 2}%`}
                        colorScheme="green"
                        position="absolute"
                        value={progressPercent}
                        height="0.3rem"
                        width={`calc(100% - ${100 / _step.length}%)`}
                        bg="var(--gray-200)"
                        top={{ base: "calc(50% - 3.4rem)", lg: "calc(50% - 2.75rem)" }}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default GroupStepperProgress;
