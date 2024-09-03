import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Image } from '@chakra-ui/react';
import {BackButton} from "@/components/BackButton";

export const Navbar = () => {

  return (
    <Box
      w="100%"
      p={4}
      pb={0}
      backgroundColor="#E4E9F4"
    >
      <Flex align="center" justify="space-between">
        <Flex justify="start" gap={3}>
          {/*<BackButton to={'/'} />*/}
        </Flex>
        <Flex justify="end">
          <Box>
            <Link href="/">
              <Image
                height="45px"
                src="/images/rajd-logo.png"
                alt="Logo Rajdu"
              />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
