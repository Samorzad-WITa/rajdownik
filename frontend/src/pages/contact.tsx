import { Contact } from '@/features';
import { fetchContact } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
  const { setProps } = useAppContext();
  useEffect(() => {
    setProps((prevProps) => ({
      ...prevProps,
      pageTitle: 'Kontakt',
      shouldRenderNavbar: true,
      shouldRenderFooter: true,
      shouldRenderBackButton: false,
    }));
  }, [setProps]);

  return (
    <>
      <Head>
        <title>Kontakt</title>
        <meta name="description" content="Kontakt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <Contact />
      </chakra.main>
    </>
  );
}
