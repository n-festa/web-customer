import { showCartState } from "@/recoil/recoilState";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { CSSProperties, useEffect } from "react";
import { BottomSheet as RSBS } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useSetRecoilState } from "recoil";

interface Props {
    open: boolean;
    children: React.ReactNode;
    header?: React.ReactNode;
    blocking?: boolean;
    onClose?: () => void;
    className?: string;
    style?: CSSProperties;
}

const Swapper = styled(RSBS)`
    [data-rsbs-header] {
        box-shadow: ${(props) => props.header && "none !important"};
    }
    [data-rsbs-overlay] {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .custom-backdrop {
        overscroll-behavior: none;
        touch-action: none;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        top: -60px;
        bottom: -60px;
        cursor: pointer;
        background: ${(props) => props.style?.background};
    }
`;

const BottomSheet = (props: Props) => {
    const setOpenModal = useSetRecoilState(showCartState);

    useEffect(() => {
        setOpenModal(props.open);
    }, [props.open, setOpenModal]);

    useEffect(() => {
        if (props.open) document.body.classList.add("disabled-scroll");
        else document.body.classList.remove("disabled-scroll");
    }, [props.open]);

    useEffect(() => {
        return () => {
            setOpenModal(false);
            document.body.classList.remove("disabled-scroll");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Swapper
            open={props.open}
            onDismiss={props.onClose}
            header={props.header}
            scrollLocking={false}
            blocking={props.blocking ?? false}
            className={props.className}
            style={{ position: "fixed", zIndex: 1000, background: props.open ? "rgba(0,0,0,0.8)" : "", ...props.style }}
            sibling={
                <Box
                    willChange={"transform"}
                    className="custom-backdrop"
                    onClick={(e) => {
                        // Prevent interactive elements beneath overlay (iOS)
                        e.preventDefault();
                        e.stopPropagation();
                        props?.onClose?.();
                    }}
                />
            }
            id="bottom-sheet-container"
        >
            <Box willChange={"transform"}>{props.children}</Box>
        </Swapper>
    );
};

export default BottomSheet;
