import { Button, ButtonOptions } from '@chakra-ui/react';
import React from "react";

export const OutlineButton = (props: {
  children: React.ReactNode;
  disabled?: boolean;
  leftIcon?: ButtonOptions['leftIcon'];
  rightIcon?: ButtonOptions['rightIcon'];
}) => {
  return (
    <Button
      color="#1F3565"
      bgColor="#E4E9F4"
      fontSize={12}
      padding={4}
      minWidth={105}
      fontWeight="bold"
      boxShadow="0px 10px 25px 0px rgba(0, 0, 0, 0.20)"
      borderRadius={50}
      size="xs"
      textTransform="uppercase"
      visibility={props.disabled ? "hidden" : "visible"}
      pl={props.leftIcon ? 0 : undefined}
      pr={props.rightIcon ? 0 : undefined}
      isDisabled={props.disabled}
      leftIcon={props.leftIcon ?? undefined}
      rightIcon={props.rightIcon ?? undefined}
    >
      {props.children}
    </Button>
  );
};
