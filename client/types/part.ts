import React from "react";

export interface IPartImagesItemProps {
  src: string;
  alt: string;
  callback: (arg0: string) => void;
}

export interface IPartAccordionProps {
  children: React.ReactNode;
  title: string;
}
