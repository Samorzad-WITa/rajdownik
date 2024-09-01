import { Button, ButtonOptions } from '@chakra-ui/react';
import React from "react";

export const ActivityNavigationButton = (props: {
  children: React.ReactNode;
  disabled: boolean;
  leftIcon?: ButtonOptions['leftIcon'];
  rightIcon?: ButtonOptions['rightIcon'];
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
      textTransform="uppercase"
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
