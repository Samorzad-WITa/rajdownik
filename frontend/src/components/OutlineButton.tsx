import { Button, ButtonOptions, chakra } from '@chakra-ui/react';

export const OutlineButton = (props: {
  children: React.ReactNode;
  leftIcon?: ButtonOptions['leftIcon'];
  rightIcon?: ButtonOptions['rightIcon'];
}) => {
  return (
    <Button
      color="#283d4e"
      fontSize={15}
      fontWeight="bold"
      outlineColor="#283d4e"
      size="xs"
      textTransform="uppercase"
      variant="outline"
      pl={props.leftIcon ? 0 : undefined}
      pr={props.rightIcon ? 0 : undefined}
      leftIcon={props.leftIcon ?? undefined}
      rightIcon={props.rightIcon ?? undefined}
    >
      {props.children}
    </Button>
  );
};
