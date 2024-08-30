import {
  BackButton,
  InfoCard,
  OutlineButton,
  PendingSpinner,
  SystemInformation,
} from '@/components';
import {fetchAnnouncements, useAnnouncement, useAnnouncements} from '@/hooks';
import { nextItemExists, previousItemExists } from '@/utils';
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon, VStack } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { id } = router.query;
  if(id === undefined) {
    return <SystemInformation>Nie znaleziono ogłoszenia</SystemInformation>;
  }

  const {data, isPending} = useAnnouncement(id);


  if (isPending) return <PendingSpinner />;

  if (data === undefined)
    return <SystemInformation>Nie znaleziono ogłoszenia</SystemInformation>;

  return (
    <>
      <Head>
        <title>Szczegóły ogłoszenia</title>
        <meta name="description" content="Ogłoszenia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack gap={5}>
        {/*<BackButton to="/" />*/}

        <InfoCard item={data} />

        {/*<Flex width="100%" gap={2} justify="space-between" overflow="visible">*/}
        {/*  <OutlineButton*/}
        {/*    leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}*/}
        {/*    disabled={nextItemExists(announcementIndex, data?.length!)}*/}
        {/*  >*/}
        {/*    {nextItemExists(announcementIndex, data?.length!) ? (*/}
        {/*      <Link*/}
        {/*        href={`/announcement/${data?.at(announcementIndex + 1)?.id}`}*/}
        {/*      >*/}
        {/*        Poprzednie*/}
        {/*      </Link>*/}
        {/*    ) : (*/}
        {/*      'Poprzednie'*/}
        {/*    )}*/}
        {/*  </OutlineButton>*/}

        {/*  <OutlineButton*/}
        {/*    rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}*/}
        {/*    disabled={previousItemExists(announcementIndex)}*/}
        {/*  >*/}
        {/*    {previousItemExists(announcementIndex) ? (*/}
        {/*      <Link*/}
        {/*        href={`/announcement/${data?.at(announcementIndex - 1)?.id}`}*/}
        {/*      >*/}
        {/*        Następne*/}
        {/*      </Link>*/}
        {/*    ) : (*/}
        {/*      'Następne'*/}
        {/*    )}*/}
        {/*  </OutlineButton>*/}
        {/*</Flex>*/}
      </VStack>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['announcements'],
    queryFn: () => fetchAnnouncements(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
