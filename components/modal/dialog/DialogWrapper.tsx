"use client";
import React from "react";
import Dialog, { DialogComponent } from ".";
export const dialogRef = React.createRef<DialogComponent>();

const DialogWrapper = () => {
    return <Dialog ref={dialogRef} />;
};

export default DialogWrapper;
