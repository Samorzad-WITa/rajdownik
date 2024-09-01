import {ScheduleDateButton} from '@/components';
import { Schedule } from '@/features';
import { fetchActivities } from '@/hooks';
import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import {useEffect, useState} from "react";
import {useAppContext} from "@/features/context/AppContext";

const dates = [
  {
    label: 'PIĄTEK',
    date: "2024-04-12T12:00:00",
    dateLabel: '12 kwietnia 2024'
  },
  {
    label: 'SOBOTA',
    date: "2024-04-13T12:00:00",
    dateLabel: '13 kwietnia 2024'
  },
  {
    label: 'NIEDZIELA',
    date: "2024-04-14T12:00:00",
    dateLabel: '14 kwietnia 2024'
  },
]

export default function Page() {
  const [dayIndex, setDayIndex] = useState(1);
  const { setAppProps } = useAppContext();

  useEffect(() => {
    setAppProps((prevProps) => ({
      ...prevProps,
      pageTitle: 'Harmonogram'
    }));
  }, []);

  const handleDateChange = (index: number) => {
    setDayIndex(index);
  }

  const prevDay = dates[dayIndex - 1];
  const currentDay = dates[dayIndex];
  const nextDay = dates[dayIndex + 1];

  return (
    <>
      <Head>
        <title>Harmonogram</title>
        <meta name="description" content="Harmonogram" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack mt={3} gap={5}>
        <HStack gap={2}>
          <ScheduleDateButton
            disabled={!prevDay}
            leftIcon={prevDay && <Icon color="#1F3565" fontSize={25} as={ChevronLeft} />}
            onClick={handleDateChange}
            index={dayIndex - 1}
          >
            {!prevDay ? '-' : prevDay.label}
          </ScheduleDateButton>

          <Box
            p={2}
            paddingX={6}
            bgColor="#1F3565"
            borderRadius={15}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Text as="b" fontSize="large" color="#FFFFFF" boxShadow="0px 10px 25px 0px rgba(0, 0, 0, 0.20)">
              {currentDay.label}
            </Text>
            <br />
            <Text as="b" fontSize="xx-small" color="#FFFFFF">
              { currentDay.dateLabel }
            </Text>
          </Box>

          <ScheduleDateButton
            rightIcon={nextDay && <Icon color="#1F3565" fontSize={25} as={ChevronRight} />}
            onClick={handleDateChange}
            disabled={!nextDay}
            index={dayIndex + 1}
          >
            {!nextDay ? '-' : nextDay.label}
          </ScheduleDateButton>
        </HStack>

        <Schedule date={currentDay.date} />
      </VStack>
    </>
  );
}
