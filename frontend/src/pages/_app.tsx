import {Footer, Navbar, ViewContext} from '@/components';
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
import {AppProvider, ExtendedAppProps} from "@/features/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const extendedProps: ExtendedAppProps = {
    pageTitle: 'Strona główna'
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AppProvider initialProps={extendedProps}>
          <ChakraProvider theme={theme}>
            <VStack minH="100vh" maxH="100vh" backgroundColor="#E4E9F4">
              <Navbar />
              <ViewContext />
              <Container
                  overflowY="auto"
                  borderTopRightRadius={45}
                  borderTopLeftRadius={45}
                  bgColor="#FFFFFF"
                  flex={1}
                  display="flex"
                  flexDir="column"
                  paddingTop={10}
                  paddingBottom={7}
              >
                <Component {...pageProps} />
              </Container>
              <Footer />
            </VStack>
          </ChakraProvider>
        </AppProvider>
      </HydrationBoundary>
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
}
