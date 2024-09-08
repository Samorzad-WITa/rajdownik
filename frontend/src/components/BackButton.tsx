import {Button, Icon, IconButton, Image} from '@chakra-ui/react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const BackButton = ({
  to,
}:{
  to: string;
}) => {
  const router = useRouter();

  return (
        <IconButton
          icon={<Image width="30px" src="/images/back-button-icon.png" alt="back"/>}
          aria-label={'back'}
          onClick={() => router.push(to)}
          // bgColor="#E4E9F4"
          bgColor="#FFFFFF"
          borderRadius="30px"
        />
    // <Button
    //   alignSelf="flex-start"
    //   size="xs"
    //   fontSize={15}
    //   fontWeight="bold"
    //   textTransform="uppercase"
    //   pl={0}
    //   py={3}
    //   variant="outline"
    //   backgroundColor="#E4E9F4"
    //   leftIcon={<Icon fontSize={30} as={ChevronLeft} />}
    //   onClick={() => router.push(to)}
    // >
    //   POWRÓT
    // </Button>
  );
};

const backPaths = [
  {
    redirectFrom: '/announcement',
    redirectTo: '/announcements'
  },
]
