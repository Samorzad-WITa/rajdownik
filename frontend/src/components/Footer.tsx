import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { CalendarDays, Home, Phone, User } from 'lucide-react';
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
      <Flex fontSize={30} justify="space-around">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Icon
              as={item.icon}
              color={router.pathname === item.href ? 'black' : 'white'}
              fill={router.pathname === item.href ? 'white' : ''}
            ></Icon>
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
    icon: Home,
  },
  {
    href: '/agenda',
    label: 'Agenda',
    icon: CalendarDays,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: Phone,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
  },
];
