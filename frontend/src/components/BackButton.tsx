import { Button, Icon } from '@chakra-ui/react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const BackButton = (props: { to: string }) => {
  const router = useRouter();

  return (
    <Button
      alignSelf="flex-start"
      size="xs"
      fontSize={15}
      fontWeight="bold"
      textTransform="uppercase"
      pl={0}
      py={3}
      variant="outline"
      backgroundColor="#ff1c37"
      leftIcon={<Icon fontSize={30} as={ChevronLeft} />}
      onClick={() => router.push(props.to)}
    >
      Wyjdź
    </Button>
  );
};
