import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

export const Announcements = () => {
  return (
    <Flex
      px={2}
      fontSize={'large'}
      fontWeight={'bold'}
      gap={5}
      direction="column"
    >
      {items.map((item) => (
        <Link key={item.id} href={`/announcement/${item.id}`}>
          <Flex backgroundColor="#344756" borderRadius={20} p={4}>
            <Text flex={1} align="center">
              {item.title}
            </Text>
            <Icon fontSize={28} as={ChevronRight} />
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

const items = [
  {
    id: 7,
    title: 'Ogłoszenie 7',
    description: 'Opis ogłoszenia 7',
  },
  {
    id: 6,
    title: 'Ogłoszenie 6',
    description: 'Opis ogłoszenia 6',
  },
  {
    id: 5,
    title: 'Ogłoszenie 5',
    description: 'Opis ogłoszenia 5',
  },
  {
    id: 4,
    title: 'Ogłoszenie 4',
    description: 'Opis ogłoszenia 4',
  },
  {
    id: 3,
    title: 'Ogłoszenie 3',
    description: 'Opis ogłoszenia 3',
  },
  {
    id: 2,
    title: 'Ogłoszenie 2',
    description: 'Opis ogłoszenia 2',
  },
  {
    id: 1,
    title: 'Ogłoszenie 1',
    description: 'Opis ogłoszenia 1',
  },
];
