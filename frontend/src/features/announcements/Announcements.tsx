import { PendingSpinner, SystemInformation } from '@/components';
import { useAnnouncements } from '@/hooks';
import {Box, Link, Flex, Icon, Text} from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export const Announcements = () => {
  const { data, isPending } = useAnnouncements();

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak ogłoszeń</SystemInformation>;

  return (
      <Flex
          paddingX={2}
          fontSize={'large'}
          fontWeight={'bold'}
          gap={5}
          flexDirection="column"
      >
        {data?.map((item) => (
            <Link
                key={item.id}
                href={`/announcement/${item.id}`}
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
            >
              <Flex
                  backgroundColor="#E4E9F4"
                  borderRadius={20} p={4}
                  boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
              >
                <Text flex={1} align="center" color="#1F3565">
                  {item.title}
                </Text>
                <Icon fontSize={28} as={ChevronRight} />
              </Flex>
            </Link>
        ))}
      </Flex>
  );
};
