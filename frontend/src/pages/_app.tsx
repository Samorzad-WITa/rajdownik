import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import theme from '@/theme';
import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <VStack minH="100vh" backgroundColor="#aeb5bb">
        <Navbar />
        <Container maxW="container.xl" flex={1} display="flex" flexDir="column">
          <Component {...pageProps} />
        </Container>
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}
