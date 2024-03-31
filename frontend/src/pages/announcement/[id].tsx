import { OutlineButton, PendingSpinner, SystemInformation } from '@/components';
import { Announcement } from '@/features/announcements';
import {
  AnnouncementItem,
  fetchAnnouncements,
  useAnnouncements,
} from '@/hooks';
import { Button, Flex, Icon, VStack } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { data, isPending } = useAnnouncements(10);

  if (isPending) return <PendingSpinner />;

  if (data.length === 0)
    return <SystemInformation>Nie znaleziono ogłoszenia</SystemInformation>;

  const announcement = data?.find(
    (item: AnnouncementItem) => item.id === parseInt(router.query.id as string),
  )!;

  return (
    <>
      <Head>
        <title>Ogłoszenia</title>
        <meta name="description" content="Ogłoszenia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack gap={5}>
        <Button
          alignSelf="flex-start"
          size="xs"
          fontSize={15}
          fontWeight="bold"
          textTransform="uppercase"
          pl={0}
          py={3}
          variant="outline"
          backgroundColor="#ff1c37"
          leftIcon={<Icon fontSize={30} as={ChevronLeft} />}
          onClick={() => router.back()}
        >
          Wyjdź
        </Button>
        <Announcement announcement={announcement} />
        <Flex width="100%" gap={2} justify="space-between">
          <OutlineButton
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
            disabled={
              data?.find((item: AnnouncementItem) => item.id < announcement.id)
                ? true
                : undefined
            }
          >
            Poprzednie
          </OutlineButton>
          <OutlineButton
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
            disabled={
              data?.find((item: AnnouncementItem) => item.id > announcement.id)
                ? true
                : undefined
            }
          >
            Następne
          </OutlineButton>
        </Flex>
      </VStack>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['announcements', 10],
    queryFn: () => fetchAnnouncements(10),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
