import { AbsoluteCenter } from '@chakra-ui/react';

export const SystemInformation = (props: { children: React.ReactNode }) => {
  return (
    <AbsoluteCenter
      fontSize={20}
      fontWeight="bold"
      textAlign="center"
      color="#101d27"
    >
      {props.children}
    </AbsoluteCenter>
  );
};
