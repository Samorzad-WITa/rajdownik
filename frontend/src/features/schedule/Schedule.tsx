import { PendingSpinner, SystemInformation } from '@/components';
import { useActivities } from '@/hooks';
import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Icon, StackDivider, VStack } from '@chakra-ui/react';
import { format, isPast, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';

export const Schedule = () => {
  const { data, isPending } = useActivities();

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak harmonogramu</SystemInformation>;

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
      {data?.map((item) => (
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
