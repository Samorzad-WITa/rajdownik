import { Link } from '@chakra-ui/next-js';
import { Image, Box, Flex, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const Footer = () => {
  const router = useRouter();

  return (
    <Box
      w="100%"
      p={4}
      backgroundColor="#101d27"
      borderColor="#ff1c37"
      borderTopWidth="5px"
      shadow="base"
    >
      <Flex justify="space-around">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} filter="invert(100%)">
            {router.pathname === item.href ? (
              <Image width={30} src={item.iconActive} alt={item.label} />
            ) : (
              <Image width={30} src={item.iconInactive} alt={item.label} />
            )}
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

const navItems = [
  {
    href: '/',
    label: 'Home',
    iconActive: '/images/home-active.png',
    iconInactive: '/images/home-inactive.png',
  },
  {
    href: '/schedule',
    label: 'Schedule',
    iconActive: '/images/schedule-active.png',
    iconInactive: '/images/schedule-inactive.png',
  },
  {
    href: '/contact',
    label: 'Contact',
    iconActive: '/images/sos-active.png',
    iconInactive: '/images/sos-inactive.png',
  },
  {
    href: '/profile',
    label: 'Profile',
    iconActive: '/images/profile-active.png',
    iconInactive: '/images/profile-inactive.png',
  },
];
