import { Button, ButtonOptions } from '@chakra-ui/react';
import React from "react";

export const ScheduleDateButton = (props: {
  children: React.ReactNode;
  index: number;
  disabled: boolean;
  leftIcon?: ButtonOptions['leftIcon'];
  rightIcon?: ButtonOptions['rightIcon'];
  onClick: (date: number) => void;
}) => {
  return (
    <Button
      color="#1F3565"
      fontSize={12}
      padding={3}
      minWidth={105}
      fontWeight="bold"
      outlineColor="#1F3565"
      borderRadius={50}
      size="xs"
      visibility={props.disabled ? "hidden" : "visible"}
      textTransform="uppercase"
      pl={props.leftIcon ? 0 : undefined}
      pr={props.rightIcon ? 0 : undefined}
      isDisabled={props.disabled}
      leftIcon={props.leftIcon ?? undefined}
      rightIcon={props.rightIcon ?? undefined}
      onClick={() => props.onClick(props.index)}
    >
      {props.children}
    </Button>
  );
};
