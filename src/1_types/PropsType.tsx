import React from "react";

export interface Children {
    children: React.ReactNode;
}

export interface PresentationProps extends Children {
    imgUrl?: string;
    carousel?: React.ReactNode;
}