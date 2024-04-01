import {
  BackButton,
  InfoCard,
  OutlineButton,
  PendingSpinner,
} from '@/components';
import { fetchActivities, useActivities } from '@/hooks';
import { nextItemExists, previousItemExists } from '@/utils';
import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Icon, VStack } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { data, isPending } = useActivities();

  if (isPending) return <PendingSpinner />;

  // if (data?.length === 0)
  //   return <SystemInformation>Nie znaleziono aktywności</SystemInformation>;

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
      <VStack gap={5}>
        <BackButton to="/schedule" />

        <InfoCard item={activity} />

        <Flex width="100%" gap={2} justify="space-between">
          <OutlineButton
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
            disabled={nextItemExists(activityIndex, data?.length!)}
          >
            {nextItemExists(activityIndex, data?.length!) ? (
              <Link href={`/activity/${data?.at(activityIndex + 1)?.id}`}>
                Poprzednie
              </Link>
            ) : (
              'Poprzednie'
            )}
          </OutlineButton>

          <OutlineButton
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
            disabled={previousItemExists(activityIndex)}
          >
            {previousItemExists(activityIndex) ? (
              <Link href={`/activity/${data?.at(activityIndex - 1)?.id}`}>
                Następne
              </Link>
            ) : (
              'Następne'
            )}
          </OutlineButton>
        </Flex>
      </VStack>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
