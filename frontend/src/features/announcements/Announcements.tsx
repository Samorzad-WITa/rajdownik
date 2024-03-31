import { PendingSpinner, SystemInformation } from '@/components';
import { AnnouncementItem, useAnnouncements } from '@/hooks';
import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

export const Announcements = () => {
  const { data, isPending } = useAnnouncements();

  if (isPending) return <PendingSpinner />;

  if (data?.length === 0)
    return <SystemInformation>Brak ogłoszeń</SystemInformation>;

  return (
    <Flex
      px={2}
      fontSize={'large'}
      fontWeight={'bold'}
      gap={5}
      direction="column"
    >
      {data?.map((item) => (
        <Link key={item.id} href={`/announcement/${item.id}`}>
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
