import { AbsoluteCenter, Spinner } from '@chakra-ui/react';

export const PendingSpinner = () => {
  return (
    <AbsoluteCenter>
      <Spinner size="xl" color="#ff1c37" />
    </AbsoluteCenter>
  );
};
