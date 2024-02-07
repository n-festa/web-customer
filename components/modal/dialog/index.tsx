"use client";

import { Button, HStack, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React, { forwardRef } from "react";

interface PromiseInfo {
    resolve?: (value: unknown) => void;
}

interface Params {
    title?: string;
    message?: string;
    isNativeMessage?: boolean;
    negative?: {
        text?: string;
        onClick?: () => Promise<void>;
    };
    positive?: {
        text?: string;
        onClick?: () => Promise<void>;
    };
    isNavigatingAfterResolve?: boolean;
}
interface State {
    show: boolean;
    params: Params;
    loading?: boolean;
}
class DialogComponent extends React.Component<{ ref: React.Ref<DialogComponent> }, State> {
    state: State = {
        show: false,
        params: {
            negative: {},
            positive: {},
        },
        loading: false,
    };
    promiseInfo: PromiseInfo = {};
    currentTask = new Promise((resolve) => {
        resolve("init");
    });
    show = (params: Params) => {
        if (this.state.show) {
            return this.currentTask;
        }

        return (this.currentTask = new Promise((resolve) => {
            this.promiseInfo = {
                resolve,
            };

            this.setState({
                show: true,
                params,
            });
        }));
    };
    unshow = () => {
        this.setState({
            show: false,
            params: {},
        });
        this.promiseInfo.resolve?.("unshow");
    };
    handleNegative = async () => {
        const { negative, isNavigatingAfterResolve } = this.state.params;
        if (negative?.onClick) {
            this.setState({
                loading: true,
            });
            await negative?.onClick();
            this.setState({
                loading: false,
            });
        }
        //Do not close on waiting for navigating
        if (isNavigatingAfterResolve) {
            this.promiseInfo.resolve?.(false);

            return;
        }
        this.setState({
            show: false,
            params: {},
        });
        this.promiseInfo.resolve?.(false);
    };
    handlePositive = async () => {
        const { positive, isNavigatingAfterResolve } = this.state.params;
        if (positive?.onClick) {
            this.setState({
                loading: true,
            });
            await positive?.onClick();
            this.setState({
                loading: false,
            });
        }
        //Do not close on waiting for navigating
        if (isNavigatingAfterResolve) {
            this.promiseInfo.resolve?.(true);

            return;
        }
        this.setState({
            show: false,
            params: {},
        });
        this.promiseInfo.resolve?.(true);
    };

    render = () => {
        const {
            show,
            params: { title, message, negative, positive },
        } = this.state;

        return (
            <Modal
                isOpen={show}
                onClose={() => {
                    //
                }}
            >
                <ModalOverlay opacity="0.6" />
                <ModalContent
                    alignSelf="center"
                    maxW="42.6rem"
                    boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)"
                    display="flex"
                    flexDir="column"
                    borderRadius="0.8rem"
                    overflow="auto"
                    p="1.5rem"
                >
                    <Text textAlign="center" fontSize="2rem" lineHeight="2.4rem" fontWeight="bold">
                        {title || ""}
                    </Text>
                    <Text
                        textAlign="center"
                        fontSize="1.8rem"
                        wordBreak="break-word"
                        lineHeight="1.8rem"
                        fontWeight="medium"
                        className="text"
                        mt="2rem"
                    >
                        {message}
                    </Text>
                    <HStack
                        pt="2rem"
                        mx="auto"
                        alignItems="center"
                        spacing="2.5rem"
                        w="95%"
                        maxW="26.5rem"
                        justifyContent="center"
                    >
                        <Button
                            borderRadius="1.5rem"
                            w="100%"
                            onClick={this.handleNegative}
                            h="4rem"
                            fontWeight="bold"
                            isLoading={this.state.loading}
                        >
                            {negative?.text ?? "Đóng"}
                        </Button>
                        {positive && (
                            <Button
                                w="100%"
                                h="4rem"
                                isLoading={this.state.loading}
                                borderRadius="1.5rem"
                                onClick={this.handlePositive}
                                fontWeight="bold"
                            >
                                {positive?.text ?? "Xác nhận"}
                            </Button>
                        )}
                    </HStack>
                </ModalContent>
            </Modal>
        );
    };
}

const Dialog = forwardRef((_, ref: React.Ref<DialogComponent>) => {
    return <DialogComponent ref={ref} />;
});

Dialog.displayName = "Dialog";

export default Dialog;

export { DialogComponent };
