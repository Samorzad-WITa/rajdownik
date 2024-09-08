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
import {useEffect} from "react";
import {useAppContext} from "@/features/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { setProps } = useAppContext();

  useEffect(() => {
    setProps((prevProps) => ({
      ...prevProps,
      shouldRenderBackButton: true,
      backButtonPath: '/announcements'
    }));
  }, [setProps]);

  const {data, isPending} = useAnnouncements();


  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Nie znaleziono ogłoszenia</SystemInformation>;

  let announcementIndex = 0;

  const announcement = data?.find((item, index) => {
    if (item.id === router.query.id) {
      announcementIndex = index;
      return true;
    }
  })!;

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

        <InfoCard item={announcement} />

        <Flex width="100%" gap={2} justify="space-between" overflow="visible">
          <OutlineButton
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
            disabled={nextItemExists(announcementIndex, data?.length!)}
          >
            {nextItemExists(announcementIndex, data?.length!) ? (
              <Link
                href={`/announcement/${data?.at(announcementIndex + 1)?.id}`}
              >
                Poprzednie
              </Link>
            ) : (
              'Poprzednie'
            )}
          </OutlineButton>

          <OutlineButton
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
            disabled={previousItemExists(announcementIndex)}
          >
            {previousItemExists(announcementIndex) ? (
              <Link
                href={`/announcement/${data?.at(announcementIndex - 1)?.id}`}
              >
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
    queryKey: ['announcements'],
    queryFn: () => fetchAnnouncements(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
