import { PendingSpinner, SystemInformation } from '@/components';
import { useContact } from '@/hooks';
import {Avatar, Box, Center, Container, Flex, Image, Text, VStack} from '@chakra-ui/react';
import Link from 'next/link';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export const Contact = () => {
  const { data, isPending } = useContact();
  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak kontaktów</SystemInformation>;

  return (
    <Flex paddingX={1} gap={4} direction="column">
      {data?.map((item) => (
        <Flex
            key={item.id}
            backgroundColor="#E4E9F4"
            borderRadius={50}
            padding={2}
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
        >
          <Center marginLeft={2}>
            <Avatar boxSize="35px" />
          </Center>

          <Container flex={1}>
            <Text fontSize="17px" fontWeight={'bold'}>
              {item.user.firstName} {item.user.lastName}
            </Text>
            <Text fontSize="10px">
              {item.label}
            </Text>
          </Container>
          <Box>
            <Link href={`tel:+48${item.user.phoneNumber}`}>
              <VStack paddingRight={3} paddingTop={1} gap={0}>
                <Image
                    boxSize="20px"
                    src="/images/phone-call-icon.png"
                    alt="Zadzwoń"
                />
                <Text textAlign="center" fontSize="10px">
                  Zadzwoń
                </Text>
              </VStack>
            </Link>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
