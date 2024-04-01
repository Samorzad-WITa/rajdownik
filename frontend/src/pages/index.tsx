import { Announcements } from '@/features';
import { fetchAnnouncements } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ogłoszenia</title>
        <meta name="description" content="Ogłoszenia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <Announcements />
      </chakra.main>
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
