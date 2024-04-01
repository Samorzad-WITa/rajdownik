import { PendingSpinner, SystemInformation } from '@/components';
import { useContact } from '@/hooks';
import { Avatar, Container, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Contact = () => {
  const { data, isPending } = useContact();

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak kontaktów</SystemInformation>;

  return (
    <Flex px={2} fontWeight={'bold'} gap={4} direction="column">
      {data?.map((item) => (
        <Flex key={item.id} backgroundColor="#344756" borderRadius={50} p={4}>
          <Avatar />
          <Container flex={1}>
            <Text fontSize="md">{item.name}</Text>
            <Text fontSize="xs" as="i">
              {item.role}
            </Text>
          </Container>
          <Link href={`tel:+48${item.phone}`}>
            <Image
              boxSize="48px"
              src="/images/phone-call.png"
              alt="Zadzwoń"
              filter="invert(100%)"
            />
          </Link>
        </Flex>
      ))}
    </Flex>
  );
};
