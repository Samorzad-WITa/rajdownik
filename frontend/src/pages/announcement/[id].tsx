import { OutlineButton } from '@/components/OutlineButton';
import {
  Announcement,
  AnnouncementItem,
} from '@/features/announcements/Announcement';
import { Button, Flex, Icon, VStack } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const announcement = items.find(
    (item) => item.id === parseInt(router.query.id as string),
  )!;

  return (
    <>
      <Head>
        <title>Ogłoszenia</title>
        <meta name="description" content="Ogłoszenia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack gap={5}>
        <Button
          alignSelf="flex-start"
          size="xs"
          fontSize={15}
          fontWeight="bold"
          textTransform="uppercase"
          pl={0}
          py={3}
          variant="outline"
          backgroundColor="#ff1c37"
          leftIcon={<Icon fontSize={30} as={ChevronLeft} />}
          onClick={() => router.back()}
        >
          Wyjdź
        </Button>
        <Announcement announcement={announcement} />
        <Flex width="100%" gap={2} justify="space-between">
          <OutlineButton
            leftIcon={<Icon color="#283d4e" fontSize={30} as={ChevronLeft} />}
          >
            Poprzednie
          </OutlineButton>
          <OutlineButton
            rightIcon={<Icon color="#283d4e" fontSize={30} as={ChevronRight} />}
          >
            Następne
          </OutlineButton>
        </Flex>
      </VStack>
    </>
  );
}

export const getServerSideProps = (async () => {
  return {
    props: {
      items: [
        {
          id: 7,
          title: 'Ogłoszenie 7',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae convallis ante. Donec eget metus in nisl vestibulum pulvinar. In convallis cursus augue nec pretium. Sed blandit mi ex, sed vestibulum tortor ullamcorper ut. Maecenas ullamcorper vehicula accumsan. Donec eu mi id neque imperdiet sollicitudin. Pellentesque porta ornare velit in maximus. Proin posuere lectus sit amet posuere suscipit. ',
        },
        {
          id: 6,
          title: 'Ogłoszenie 6',
          description: 'Opis ogłoszenia 6',
        },
        {
          id: 5,
          title: 'Ogłoszenie 5',
          description: 'Opis ogłoszenia 5',
        },
        {
          id: 4,
          title: 'Ogłoszenie 4',
          description: 'Opis ogłoszenia 4',
        },
        {
          id: 3,
          title: 'Ogłoszenie 3',
          description: 'Opis ogłoszenia 3',
        },
        {
          id: 2,
          title: 'Ogłoszenie 2',
          description: 'Opis ogłoszenia 2',
        },
        {
          id: 1,
          title: 'Ogłoszenie 1',
          description: 'Opis ogłoszenia 1',
        },
      ],
    },
  };
}) satisfies GetServerSideProps<{ items: AnnouncementItem[] }>;
