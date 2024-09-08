import { LoginPage } from '@/features/login';
import { chakra } from '@chakra-ui/react';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Logowanie',
            shouldRenderNavbar: true,
            shouldRenderFooter: false,
            shouldRenderBackButton: false,
        }));
    }, [setProps]);

    return (
        <>
            <Head>
                <title>Logowanie</title>
                <meta name="description" content="Logowanie" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <LoginPage />
            </chakra.main>
        </>
    );
}