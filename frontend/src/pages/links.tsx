import { Contact } from '@/features';
import { fetchContact } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import {Links} from "@/features/links/Links";
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setAppProps } = useAppContext();
    useEffect(() => {
        setAppProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Przydatne linki',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
            shouldRenderBackButton: true,
            backButtonPath: '/'
        }));
    }, []);

    return (
        <>
            <Head>
                <title>Przydatne linki</title>
                <meta name="description" content="Przydatne linki" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <Links />
            </chakra.main>
        </>
    );
}