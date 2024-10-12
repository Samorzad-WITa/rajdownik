import {Footer, Navbar, ViewContext} from '@/components';
import theme from '@/theme';
import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {AppProvider, ExtendedAppProps, useAppContext} from "@/features/context/AppContext";
import {AuthProvider} from "@/features/context/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [extendedProps] = useState<ExtendedAppProps>({
    pageTitle: 'Strona główna',
    shouldRenderNavbar: true,
    shouldRenderFooter: true,
    shouldRenderBackButton: false,
    backButtonPath: ''
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AppProvider initialProps={extendedProps}>
          <AuthProvider>
            <ChakraProvider theme={theme}>
              <ContentWrapper Component={ Component } pageProps={ pageProps } />
            </ChakraProvider>
          </AuthProvider>
        </AppProvider>
      </HydrationBoundary>
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
}

export const ContentWrapper = ({Component, pageProps}: {Component: any; pageProps: ExtendedAppProps}) => {
  const { appProps } = useAppContext();
  return (
      <VStack minH="100vh" maxH="100vh" backgroundColor="#E4E9F4">
        { appProps.shouldRenderNavbar && <Navbar />}
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
        { appProps.shouldRenderFooter && <Footer /> }
      </VStack>
  );
}
