import {
  BackButton,
  InfoCard,
  OutlineButton,
  PendingSpinner,
  SystemInformation,
  ActivityNavigationButton
} from '@/components';
import {fetchActivities, useActivities, useActivity} from '@/hooks';
import {nextItemExists, previousItemExists, getPolishWeekday, capitalize} from '@/utils';
import {Flex, Icon, VStack, Text, Link, Center} from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format, isPast, parseISO } from 'date-fns';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();
  const { id, date } = router.query;
  const { data, isPending } = useActivities(date as string);
  const { setProps } = useAppContext();

  useEffect(() => {
    setProps((prevProps) => ({
      ...prevProps,
      shouldRenderBackButton: true,
      backButtonPath: '/schedule'
    }));
  }, [setProps]);

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Nie znaleziono aktywności</SystemInformation>;

  let activityIndex = 0;

  const activity = data?.find((item, index) => {
    if (item.id === id) {
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
      <VStack gap={2} color="#1F3565">
        <VStack gap={0}>
          <Text fontSize={25} fontWeight={'bold'}>
            {activity.location ? activity.location : 'Ośrodek Trzy Jeziora'}
          </Text>
          <Text fontWeight={'bold'} fontSize={12}>
            {capitalize(getPolishWeekday(activity.timeFrom))} | {format(parseISO(activity.timeFrom), 'HH:mm')} - {format(parseISO(activity.timeTo), 'HH:mm')}
          </Text>
        </VStack>
        <InfoCard item={activity} />
        { activity.activityRegistration &&
          <Link
            href={`/activity/registration/${activity.activityRegistration.id}`}
            bgColor="#1F3565"
            borderRadius={100}
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
            width="90%"
            color="#FFFFFF"
            fontWeight={'bold'}
            padding={1}
            marginBottom={15}
          >
            <Center>Zapisz się</Center>
          </Link>
        }
        <Flex width="100%" gap={2} justify="space-between">
          <ActivityNavigationButton
            leftIcon={<Icon color="#1F3565" fontSize={30} as={ChevronLeft} />}
            disabled={!previousItemExists(activityIndex)}
          >
            {previousItemExists(activityIndex) ? (
              <Link
                  href={`/activity/${data?.at(activityIndex - 1)?.id}?date=${data?.at(activityIndex - 1)?.timeFrom}`}
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
              >
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
              <Link
                  href={`/activity/${data?.at(activityIndex + 1)?.id}?date=${data?.at(activityIndex - 1)?.timeFrom}`}
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
              >
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
