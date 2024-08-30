import { Link } from '@chakra-ui/next-js';
import {Box, Circle, Flex, Icon, Image, Text, VStack} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const Footer = () => {
  const router = useRouter();

  return (
    <Box
      width="100%"
      backgroundColor="#FFFFFF"
    >
      <Flex
          width="100%"
          backgroundColor="#E4E9F4"
          borderRadius="50px"
          paddingX={5}
          justify="space-between"
          // gap={20}
      >
        {navItems.map((item) => {
          const isHome = item.href === '/';
          return (
              <Link key={item.href} href={item.href} width={55}>
                {isHome ? (
                    <Circle size="60px" bg="#1F3565" marginBottom={3}>
                      <Image width={30} src={item.iconInactive} alt={item.label}/>
                    </Circle>
                ) : (
                    <VStack paddingY={5}>
                      {router.pathname === item.href ? (
                          <Image width={35} src={item.iconActive} alt={item.label} />
                      ) : (
                          <Image width={35} src={item.iconInactive} alt={item.label} />
                      )}
                    </VStack>
                )}
              </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

const navItems = [
  {
    href: '/announcement',
    label: 'Ogłoszenia',
    iconActive: '/images/announcement-icon-active-new.png',
    iconInactive: '/images/announcement-icon-inactive-new.png'
  },
  {
    href: '/schedule',
    label: 'Harmonogram',
    iconActive: '/images/schedule-icon-active-new.png',
    iconInactive: '/images/schedule-icon-inactive-new.png'
  },
  {
    href: '/',
    label: 'Dom',
    iconActive: '/images/home-icon-inactive-new.png',
    iconInactive: '/images/home-icon-inactive-new.png'
  },
  {
    href: '/contact',
    label: 'S.O.S.',
    iconActive: '/images/phone-icon-active-new.png',
    iconInactive: '/images/phone-icon-inactive-new.png'
  },
  {
    href: '/profile',
    label: 'Profil',
    iconActive: '/images/user-icon-active-new.png',
    iconInactive: '/images/user-icon-inactive-new.png'
  },
];
