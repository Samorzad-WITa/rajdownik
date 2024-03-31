import { PendingSpinner, SystemInformation } from '@/components';
import { useActivities } from '@/hooks';
import { Box, Flex, Icon, Link, StackDivider, VStack } from '@chakra-ui/react';
import { format, isPast, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';

export const Schedule = () => {
  const { data, isPending } = useActivities();

  if (isPending) return <PendingSpinner />;

  // if (data?.length === 0)
  //   return <SystemInformation>Brak harmonogramu</SystemInformation>;

  return (
    <VStack
      width="100%"
      p={4}
      backgroundColor="#344756"
      borderRadius={12}
      fontSize="large"
      justify="space-around"
      spacing={4}
      divider={<StackDivider />}
    >
      {items.map((item) => (
        <Link key={item.id} href={`/activity/${item.id}`}>
          <Flex
            align="center"
            justify="space-between"
            gap={3}
            color={isPast(parseISO(item.timeTo)) ? '#616f7b' : 'inherit'}
          >
            <Box>{format(parseISO(item.timeFrom), 'HH:mm')}</Box>
            <Box>{item.title}</Box>
            <Icon fontSize={28} as={ChevronRight} />
          </Flex>
        </Link>
      ))}
    </VStack>
  );
};

const items = [
  {
    id: 7,
    title: 'Wydarzenie 7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 1',
    timeFrom: '2024-03-31T22:35:32.686Z',
    timeTo: '2024-03-31T23:35:32.686Z',
  },
  {
    id: 6,
    title: 'Wydarzenie 6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 2',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: 5,
    title: 'Wydarzenie 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: 4,
    title: 'Wydarzenie 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: 3,
    title: 'Wydarzenie 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: 2,
    title: 'Wydarzenie 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
  {
    id: 1,
    title: 'Wydarzenie 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Sala 3',
    timeFrom: '2024-03-31T21:35:32.686Z',
    timeTo: '2024-03-31T22:35:32.686Z',
  },
];
