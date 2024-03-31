import { AnnouncementItem } from '@/hooks';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

export const Announcement = ({
  announcement,
}: {
  announcement: AnnouncementItem;
}) => {
  return (
    <Card width="90%" backgroundColor="#344756" borderRadius={20} px={5}>
      <CardHeader p={3}>
        <Flex justify="center">
          <Heading size="md">{announcement.title}</Heading>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody px={0} pt={3}>
        <Text>{announcement.description}</Text>
      </CardBody>
    </Card>
  );
};
