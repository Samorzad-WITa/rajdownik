import {Center, Circle, Flex, Image, Stack, Text, VStack} from "@chakra-ui/react";
import {useAuth} from "@/features/context/AuthProvider";
import {useRouter} from "next/router";
import {useAuthenticatedUser} from "@/hooks/useUser";
import {PendingSpinner} from "@/components";

export const UserProfile = () => {
    const router = useRouter();
    const { token } = useAuth();
    if(token === null) {
        router.push('/login');
        return;
    }

    let { data, isPending } = useAuthenticatedUser(token);

    if(isPending) { return <PendingSpinner></PendingSpinner> }

    if(!data) {
        return <Text width="100%" fontWeight={'bold'} fontSize={'large'} textAlign="center">Nie udało się wczytać profilu użytkownika</Text>
    }

    return (
      <Flex
        flexDirection="column"
        width="100%"
        padding={2}
      >
          <Center>
              <Circle
                border="2px"
                padding={4}
                borderColor='#1F3565'
              >
                  <Image
                    width="70px"
                    src="/images/user-profile-page-icon.png"
                  />
              </Circle>
          </Center>
          <VStack marginTop={5} gap={0}>
              <Text fontWeight={'bold'} fontSize={25}>
                  { data.firstName + " " + data.lastName }
              </Text>
              <Text fontSize={13}>
                  { data.email }
              </Text>
          </VStack>
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
                          fontSize={12}
                          paddingLeft={4}
                          fontWeight={'bold'}
                          boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                      >
                          { data[item.field] || 'Brak danych' }
                      </Text>
                  </Stack>
              ))}
          </Flex>
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