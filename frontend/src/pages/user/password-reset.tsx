import { chakra } from '@chakra-ui/react';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";
import {PasswordResetPage} from "@/features/password-reset";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Zmiana hasła',
            shouldRenderNavbar: true,
            shouldRenderFooter: false,
            shouldRenderBackButton: false
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
                <PasswordResetPage />
            </chakra.main>
        </>
    );
}