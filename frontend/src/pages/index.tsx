import { Announcements } from '@/features';
import { fetchAnnouncements } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import {HomePage} from "@/features/home";
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Home() {
  const { setAppProps } = useAppContext();
  useEffect(() => {
    setAppProps((prevProps) => ({
      ...prevProps,
      pageTitle: 'Strona główna',
      shouldRenderNavbar: true,
      shouldRenderFooter: true,
      shouldRenderBackButton: false,
    }));
  }, [setAppProps]);

  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta name="description" content="Strona główna" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <HomePage />
      </chakra.main>
    </>
  );
}