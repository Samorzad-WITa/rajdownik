import { Calendar } from '@/features/agenda/Calendar';
import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        <HStack gap={2}>
          <Button
            size='xs'
            pl={0}
            variant="outline"
            color="#283d4e"
            outlineColor="#283d4e"
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
          >
            Piątek
          </Button>
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
          <Button
            size='xs'
            pr={0}
            variant="outline"
            color="#283d4e"
            outlineColor="#283d4e"
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
          >
            Niedziela
          </Button>
        </HStack>
        <Calendar />
      </VStack>
    </>
  );
}
