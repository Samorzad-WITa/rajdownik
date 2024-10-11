import { Contact } from '@/features';
import { fetchContact } from '@/hooks';
import { chakra } from '@chakra-ui/react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";
import {ActivityRegistrationList} from "@/features/activity-registration";

export default function Page() {
    const { setProps } = useAppContext();
    useEffect(() => {
        setProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Zapisy na atrakcje',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
            shouldRenderBackButton: true,
            backButtonPath: '/'
        }));
    }, [setProps]);

    return (
        <>
            <Head>
                <title>Lista zapisów na atrakcje</title>
                <meta name="description" content="Lista zapisów na atrakcje" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <ActivityRegistrationList />
            </chakra.main>
        </>
    );
}
