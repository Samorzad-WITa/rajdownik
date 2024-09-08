import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Image } from '@chakra-ui/react';
import {BackButton} from "@/components/BackButton";
import {useAppContext} from "@/features/context/AppContext";

export const Navbar = () => {
  const { appProps } = useAppContext();

  return (
    <Box
      w="100%"
      p={4}
      pb={0}
      backgroundColor="#E4E9F4"
    >
      <Flex align="center" justify="space-between">
        <Flex justify="start" gap={3}>
          {appProps.shouldRenderBackButton && appProps.backButtonPath && <BackButton to={appProps.backButtonPath}/>}
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
