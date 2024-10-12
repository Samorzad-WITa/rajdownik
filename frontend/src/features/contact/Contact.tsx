import { PendingSpinner, SystemInformation } from '@/components';
import {ContactItem, useContact} from '@/hooks';
import {Avatar, Box, Center, Container, Flex, Image, Text, VStack, Link} from '@chakra-ui/react';

export const Contact = () => {
  const { data, isPending } = useContact();
  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak kontaktów</SystemInformation>;

  const groupItems = (data: ContactItem[]) => {
    console.log(data);
    return data.reduce(
        (result: { [key: string]: ContactItem[] }, currentValue: ContactItem) => {
          if(!result[currentValue.groupName]) {
            result[currentValue.groupName] = [];
          }
          result[currentValue.groupName]?.push(currentValue);
          return result;
        },
        {} as { [key: string]: ContactItem[] }
    );
  }

  const getContactComponent = (item: ContactItem) => {
      if(item.contactType === 'PhoneNumber' && item.user.phoneNumber) {
          return (<Box>
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
          </Box>);
      }
      if(item.contactType === 'FacebookProfile' && item.user.profileUrl) {
          return (<Box>
              <Link href={item.user.profileUrl}>
                  <VStack paddingRight={3} paddingTop={1} gap={0}>
                      <Image
                          src="/images/messenger-icon.png"
                          boxSize="20px"
                          alt="messenger icon"
                      />
                      <Text textAlign="center" fontSize="10px">
                          Napisz
                      </Text>
                  </VStack>
              </Link>
          </Box>);
      }
      return (<></>);
  }

  const groupedItems = groupItems(data!);

  return (
    <Flex paddingX={1} gap={4} direction="column">
      {Object.keys(groupedItems).map((groupName) => (
          <Flex
              key={groupName}
              flexDirection="column"
              marginY={2}
          >
            <Text
                color="#1F3565"
                fontWeight={'bold'}
                marginLeft={5}
                marginBottom={1}
                fontSize={17}
            >
                {groupName}
            </Text>
            {groupedItems[groupName]?.map((item) => (
                <Flex
                    key={item.id}
                    backgroundColor="#E4E9F4"
                    borderRadius={50}
                    padding={2}
                    marginY={2}
                    boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                >
                  <Center marginLeft={2}>
                    <Avatar boxSize="35px" />
                  </Center>

                  <Container flex={1}>
                    <Text fontSize="17px" fontWeight={'bold'} color="#1F3565">
                      {item.user.firstName} {item.user.lastName}
                    </Text>
                    <Text fontSize="10px" color="#1F3565">
                      {item.label}
                    </Text>
                  </Container>
                    {getContactComponent(item)}
                </Flex>
            ))}
          </Flex>
          ))}
    </Flex>
  );
};
