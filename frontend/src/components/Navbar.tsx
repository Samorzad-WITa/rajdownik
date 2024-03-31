import { Box, Flex, Image } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box
      w="100%"
      p={4}
      backgroundColor="#101d27"
      borderColor="#ff1c37"
      borderBottomWidth="5px"
      shadow="base"
    >
      <Flex align="center" justify="space-between">
        <Flex justify="start" gap={3}>
          <Box>
            <Image
              width="45px"
              src="/images/w4-logo.png"
              alt="Logo Samorządu W4"
            />
          </Box>
          <Box>
            <Image
              width="45px"
              src="/images/w7-logo.png"
              alt="Logo Samorządu W7"
            />
          </Box>
          <Box>
            <Image
              width="45px"
              src="/images/w14-logo.png"
              alt="Logo Samorządu W14"
            />
          </Box>
        </Flex>
        <Flex justify="end">
          <Box>
            <Image height="45px" src="/images/rajd-logo.png" alt="Logo Rajdu" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
