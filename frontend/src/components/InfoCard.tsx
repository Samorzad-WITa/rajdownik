import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

export const InfoCard = ({
  item,
}: {
  item: {
    title: string;
    description: string;
  };
}) => {
  return (
    <Card
        width="90%"
        minH="40vh"
        backgroundColor="#1F3565"
        borderRadius={20}
        marginBottom={5}
        px={5}
        overflowY="auto"
        boxShadow="0px 10px 25px 0px rgba(0, 0, 0, 0.20)"
    >
      <CardHeader p={3}>
        <Flex justify="center">
          <Heading size="md" color="#FFFFFF" textAlign="center">{item.title}</Heading>
        </Flex>
      </CardHeader>
      <Divider borderWidth={1.5} borderRadius={100} color="#FFFFFF"/>
      <CardBody px={0} pt={3}>
        <Text color="#FFFFFF">{item.description}</Text>
      </CardBody>
    </Card>
  );
};
