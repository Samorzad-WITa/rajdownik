import { Box, Flex, Icon, Link, StackDivider, VStack } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

export const Calendar = () => {
  return (
    <VStack
      width="100%"
      p={4}
      backgroundColor="#344756"
      borderRadius={12}
      fontSize={'large'}
      justify="space-around"
      spacing={4}
      divider={<StackDivider />}
    >
      {calendarItems.map((item) => (
        <Link key={item.id} href={`/agenda/${item.id}`}>
          <Flex align="center" justify="space-between" gap={3}>
            <Box>{item.hour}</Box>
            <Box>{item.title}</Box>
            <Icon fontSize={28} as={ChevronRight} />
          </Flex>
        </Link>
      ))}
    </VStack>
  );
};

const calendarItems = [
  {
    id: 7,
    title: 'Wydarzenie 7',
    hour: '22:00',
    day: '2022-01-01',
  },
  {
    id: 6,
    title: 'Wydarzenie 6',
    hour: '21:00',
    day: '2022-01-01',
  },
  {
    id: 5,
    title: 'Wydarzenie 5',
    hour: '19:00',
    day: '2022-01-01',
  },
  {
    id: 4,
    title: 'Wydarzenie 4',
    hour: '18:00',
    day: '2022-01-01',
  },
  {
    id: 3,
    title: 'Wydarzenie 3',
    hour: '15:00',
    day: '2022-01-01',
  },
  {
    id: 2,
    title: 'Wydarzenie 2',
    hour: '13:00',
    day: '2022-01-01',
  },
  {
    id: 1,
    title: 'Wydarzenie 1',
    hour: '10:00',
    day: '2022-01-01',
  },
];
