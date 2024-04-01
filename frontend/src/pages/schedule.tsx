import { OutlineButton } from '@/components';
import { Schedule } from '@/features';
import { fetchActivities } from '@/hooks';
import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Harmonogram</title>
        <meta name="description" content="Harmonogram rajdu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack mt={3} gap={5}>
        <HStack gap={2}>
          <OutlineButton
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
          >
            Piątek
          </OutlineButton>

          <Box
            p={4}
            paddingX={6}
            bgColor="#ff1c37"
            borderRadius={15}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Text as="b" fontSize="large">
              Sobota
            </Text>
            <br />
            <Text as="b" fontSize="xx-small">
              13 kwietnia 2024
            </Text>
          </Box>

          <OutlineButton
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
          >
            Niedziela
          </OutlineButton>
        </HStack>

        <Schedule />
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
