import { PendingSpinner, SystemInformation } from '@/components';
import { useActivities } from '@/hooks';
import { Link } from '@chakra-ui/next-js';
import {Box, Flex, HStack, Icon, StackDivider, Text, VStack} from '@chakra-ui/react';
import { format, isPast, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';

export const Schedule = (props: {
  date: string
}) => {
  const { data, isPending } = useActivities(props.date);
  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak harmonogramu</SystemInformation>;

  return (
    <Flex
      p={4}
      width="100%"
      fontSize={'large'}
      fontWeight={'bold'}
      flexDirection="column"
      gap={5}
    >
      {data?.map((item) => (
        <Link key={item.id} href={`/activity/${item.id}`}>
          <HStack
            // color={isPast(parseISO(item.timeTo)) ? '#616f7b' : '#1F3565'}
              color="#1F3565"
            backgroundColor="#E4E9F4"
            borderRadius={15}
            padding={2}
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
          >
            <Text padding={1} fontSize={12}>
              {format(parseISO(item.timeFrom), 'HH:mm')} - {format(parseISO(item.timeTo), 'HH:mm')}
            </Text>
            <Text flex={1} align="left" padding={1} paddingLeft={2}>{item.title}</Text>
            <Icon fontSize={28} as={ChevronRight} alignSelf="flex-end"/>
          </HStack>
        </Link>
      ))}
    </Flex>
  );
};
