import React from "react";
import { Text, TextProps } from "uikit";

export const InputError: React.FC<TextProps> = ({ children, ...props }) => (
  <Text color="text-error" textStyle="detail" {...props}>
    {children}
  </Text>
);
