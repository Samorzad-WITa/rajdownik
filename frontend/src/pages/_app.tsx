import { Footer, Navbar } from '@/components';
import theme from '@/theme';
import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <VStack minH="100vh" backgroundColor="#aeb5bb">
            <Navbar />
            <Container
              maxW="container.xl"
              flex={1}
              display="flex"
              flexDir="column"
              pt={6}
            >
              <Component {...pageProps} />
            </Container>
            <Footer />
          </VStack>
        </ChakraProvider>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
