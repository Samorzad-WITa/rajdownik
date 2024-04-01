import { Contact } from '@/features/contact';
import { fetchContact } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Kontakt</title>
        <meta name="description" content="Kontakt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <Contact />
      </chakra.main>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['contact'],
    queryFn: () => fetchContact(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
