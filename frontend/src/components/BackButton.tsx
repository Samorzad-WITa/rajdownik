import { Button, Icon } from '@chakra-ui/react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const BackButton = () => {
  const router = useRouter();

  const pathName = router.pathname;
  const currentPath = pathName.slice(0, pathName.lastIndexOf('/'));

  const redirect = backPaths.find((item, index) => {
    if(item.redirectFrom === currentPath) {
      return true;
    }
  });

  if(redirect === undefined) {
    console.log('Path found!');
    return;
  }

  console.log('Path found!');

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
      backgroundColor="#E4E9F4"
      leftIcon={<Icon fontSize={30} as={ChevronLeft} />}
      onClick={() => router.push(redirect?.redirectTo)}
    >
      POWRÓT
    </Button>
  );
};

const backPaths = [
  {
    redirectFrom: '/announcement',
    redirectTo: '/announcements'
  },
]
