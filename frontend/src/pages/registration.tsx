import { Registration } from '@/features';
import { chakra } from '@chakra-ui/react';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Rejestracja na domki',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
            shouldRenderBackButton: true,
            backButtonPath: '/'
        }));
    }, [setProps]);

    return (
        <>
            <Head>
                <title>Rejestracja na domki</title>
                <meta name="description" content="Rejestracja na domki" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <Registration />
            </chakra.main>
        </>
    );
}