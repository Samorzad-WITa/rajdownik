import Head from "next/head";
import {chakra} from "@chakra-ui/react";
import {Announcements} from "@/features";
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export default function Page() {
    const { setAppProps } = useAppContext();
    useEffect(() => {
        setAppProps((prevProps) => ({
            ...prevProps,
            pageTitle: 'Ogłoszenia',
            shouldRenderNavbar: true,
            shouldRenderFooter: true,
        }));
    }, []);

    return (
        <>
            <Head>
                <title>Ogłoszenia</title>
                <meta name="description" content="Ogłoszenia" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <chakra.main>
                <Announcements />
            </chakra.main>
        </>
    );
}