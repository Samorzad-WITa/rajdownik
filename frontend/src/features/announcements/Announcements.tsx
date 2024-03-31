import { AnnouncementItem, useAnnouncements } from '@/hooks';
import {
  AbsoluteCenter,
  Flex,
  Icon,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

export const Announcements = () => {
  const { data, isPending } = useAnnouncements(10);

  if (isPending)
    return (
      <AbsoluteCenter>
        <Spinner size="xl" color="#ff1c37" />
      </AbsoluteCenter>
    );

  return (
    <Flex
      px={2}
      fontSize={'large'}
      fontWeight={'bold'}
      gap={5}
      direction="column"
    >
      {data?.map((item: AnnouncementItem, index: number) => (
        // TODO: change index to item id when backend is fixed
        <Link key={index} href={`/announcement/${index}`}>
          <Flex backgroundColor="#344756" borderRadius={20} p={4}>
            <Text flex={1} align="center">
              {item.title}
            </Text>
            <Icon fontSize={28} as={ChevronRight} />
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};
