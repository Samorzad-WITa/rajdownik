import { Box, Flex } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box
      w="100%"
      p={4}
      backgroundColor="#101d27"
      borderColor="#fc1a35"
      borderBottomWidth="5px"
      shadow="base"
    >
      <Flex justify="space-between">
        <Flex align="center" justify="start" gap={2}>
          <Box>logo 1</Box>
          <Box>logo 2</Box>
          <Box>logo 3</Box>
        </Flex>
        <Flex align="center" justify="end" gap={2}>
          <Box>logo x</Box>
        </Flex>
      </Flex>
    </Box>
  );
};
