import {
  BackButton,
  InfoCard,
  OutlineButton,
  PendingSpinner,
  SystemInformation,
  ActivityNavigationButton
} from '@/components';
import { fetchActivities, useActivities } from '@/hooks';
import {nextItemExists, previousItemExists, getPolishWeekday, capitalize} from '@/utils';
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon, VStack, Text } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format, isPast, parseISO } from 'date-fns';

export default function Home() {
  const router = useRouter();

  const { data, isPending } = useActivities('2024-04-13T11:00:00');

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Nie znaleziono aktywności</SystemInformation>;

  let activityIndex = 0;

  const activity = data?.find((item, index) => {
    if (item.id === router.query.id) {
      activityIndex = index;
      return true;
    }
  })!;

  return (
    <>
      <Head>
        <title>Ogłoszenia</title>
        <meta name="description" content="Ogłoszenia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack gap={2} color="#1F3565" >
        <VStack gap={0}>
          <Text fontSize={25} fontWeight={'bold'}>
            {/*{activity.location}*/}
            Marina
          </Text>
          <Text fontWeight={'bold'} fontSize={12}>
            {capitalize(getPolishWeekday(activity.timeFrom))} | {format(parseISO(activity.timeFrom), 'HH:mm')} - {format(parseISO(activity.timeTo), 'HH:mm')}
          </Text>
        </VStack>
        <InfoCard item={activity} />

        <Flex width="100%" gap={2} justify="space-between">
          <ActivityNavigationButton
            leftIcon={<Icon color="#1F3565" fontSize={30} as={ChevronLeft} />}
            disabled={!previousItemExists(activityIndex)}
          >
            {previousItemExists(activityIndex) ? (
              <Link href={`/activity/${data?.at(activityIndex - 1)?.id}`}>
                Poprzednie
              </Link>
            ) : (
              'Poprzednie'
            )}
          </ActivityNavigationButton>

          <ActivityNavigationButton
            rightIcon={<Icon color="#1F3565" fontSize={30} as={ChevronRight} />}
            disabled={!nextItemExists(activityIndex, data?.length!)}
          >
            {nextItemExists(activityIndex, data?.length!) ? (
              <Link href={`/activity/${data?.at(activityIndex + 1)?.id}`}>
                Następne
              </Link>
            ) : (
              'Następne'
            )}
          </ActivityNavigationButton>
        </Flex>
      </VStack>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities(''),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
