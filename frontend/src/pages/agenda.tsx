import { Calendar } from '@/features/agenda/Calendar';
import { Box, Button, Text, VStack, chakra } from '@chakra-ui/react';
import Head from 'next/head';

export default function Agenda() {
  return (
    <>
      <Head>
        <title>Harmonogram</title>
        <meta name="description" content="Harmonogram rajdu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack mt={3} gap={5}>
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
          <Text as="b" fontSize="x-small">
            13 kwietnia 2024
          </Text>
        </Box>
        <Calendar />
      </VStack>
    </>
  );
}
