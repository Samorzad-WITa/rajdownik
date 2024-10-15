import {Box, Button, Center, Circle, Flex, HStack, Icon, Image, Link, Stack, Text, VStack} from "@chakra-ui/react";
import {useAuth} from "@/features/context/AuthProvider";
import {useRouter} from "next/router";
import {useAuthenticatedUser} from "@/hooks/useUser";
import {PendingSpinner} from "@/components";
import React, {useEffect, useState} from "react";
import {format, isPast, parseISO} from "date-fns/index";
import {ChevronRight} from "lucide-react";

export const UserProfile = () => {
    const router = useRouter();
    const [ isLoggingOut, setIsLoggingOut] = useState(false);
    const { token , setToken } = useAuth(!isLoggingOut);
    const { data, isPending } = useAuthenticatedUser(token!);

    if(!token || isPending) { return <PendingSpinner></PendingSpinner> }

    if(!data) {
        return <Text width="100%" fontWeight={'bold'} fontSize={'large'} textAlign="center">Nie udało się wczytać profilu użytkownika</Text>
    }

    const logoutButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoggingOut(false);
        setToken(null);
        await router.push('/');
    }

    let busNumber: string;
    switch (data.busNumber) {
        case 0:
            busNumber = 'Dojazd własny';
            break;
        case 1:
            busNumber = 'I tura (10:00)';
            break;
        case 2:
            busNumber = 'II tura (16:00)';
            break;
    }


    return (
      <Flex
        flexDirection="column"
        width="100%"
        padding={2}
        color="#1F3565"
      >
          <Center>
              <Image
                  width={600}
                  src="/images/user-frame.png"
              />
          </Center>
          <VStack marginTop={5} gap={0}>
              <Text fontWeight={'bold'} fontSize={25}>
                  { data.firstName + " " + data.lastName }
              </Text>
              <Text fontSize={13}>
                  { data.email }
              </Text>
          </VStack>
          <Stack gap={0} marginTop="2vh">
              <Text fontSize={13} marginLeft={4}>Kod użytkownika</Text>
              <Text
                  width="100%"
                  bgColor="#E4E9F4"
                  borderRadius={30}
                  padding={2}
                  fontSize={13}
                  paddingLeft={4}
                  fontWeight={'bold'}
                  boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
              >
                  { data.code || 'Brak danych' }
              </Text>
          </Stack>
          <Text fontWeight={'bold'} fontSize={20} marginTop="5vh" color="#1F3565" marginBottom={3}>
              Podstawowe dane
          </Text>
          <Flex flexDirection="column" gap={3} color="#1F3565">
              {userData.map((item) => (
                  <Stack gap={0} key={ item.label }>
                      <Text fontSize={13} marginLeft={4}>{ item.label }</Text>
                      <Text
                          width="100%"
                          bgColor="#E4E9F4"
                          borderRadius={30}
                          padding={2}
                          fontSize={14}
                          paddingLeft={4}
                          fontWeight={'bold'}
                          boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                      >
                          { item.field === 'busNumber' ? busNumber : (data as Record<string, any>)[item.field] || 'Brak danych' }
                      </Text>
                  </Stack>
              ))}
          </Flex>
          {data.activityEntries.length !== 0 && <Box>
              <Text fontWeight={'bold'} fontSize={20} marginTop="5vh" color="#1F3565" marginBottom={3}>
                  Atrakcje
              </Text>
              <Flex flexDirection="column" gap={5} color="#1F3565">
                  {data.activityEntries.map((entry) => (
                      <Link
                          key={entry.activityRegistration.title}
                          href={`/activity/registration/${entry.activityRegistration.id}`}
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                          _focus={{ boxShadow: "none" }}
                      >
                          <HStack
                              color="#1F3565"
                              backgroundColor="#E4E9F4"
                              borderRadius={30}
                              padding={2}
                              fontSize={14}
                              fontWeight={'bold'}
                              boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
                          >
                              <Text flex={1} align="left" padding={1} paddingLeft={2}>{entry.activityRegistration.title}</Text>
                              <Icon fontSize={28} as={ChevronRight} alignSelf="flex-end"/>
                          </HStack>
                      </Link>
                  ))}
              </Flex>
          </Box>}
          <Button
            bgColor="#1F3565"
            borderRadius={100}
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
            width="100%"
            color="#FFFFFF"
            fontWeight={'bold'}
            marginTop={50}
            onClick={logoutButtonClick}
            leftIcon={<Image src="/images/logout-icon.png" width={4}/>}
          >
              <Center>Wyloguj się</Center>
          </Button>
      </Flex>
    );
}

const userData = [
    {
        label: 'Dieta',
        field: 'dietType'
    },
    {
        label: 'Numer domku',
        field: 'roomNumber'
    },
    {
        label: 'Numer autokaru',
        field: 'busNumber'
    }
]