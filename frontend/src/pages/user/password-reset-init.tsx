import { PasswordResetInitPage } from '@/features';
import { chakra } from '@chakra-ui/react';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Zmiana hasła',
            shouldRenderNavbar: true,
            shouldRenderFooter: false,
            shouldRenderBackButton: true,
            backButtonPath: '/login'
        }));
    }, [setProps]);

    return (
        <>
            <Head>
                <title>Zmiana hasła</title>
                <meta name="description" content="Zmiana hasła" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <PasswordResetInitPage />
            </chakra.main>
        </>
    );
}