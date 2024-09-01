import {Box, Link} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

type HomeCardProps = {
    title: string,
    href: string,
    isExternal?: boolean
}

export const HomeCard = (props: HomeCardProps) => {

    return (
        <Link href={props.href} isExternal={props.isExternal} width="100%" heigth="100%">
            <Box
                bgColor="#E4E9F4"
                height={150}
                borderRadius={20}
                boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
                padding={3}
            >
                { props.title } { props.isExternal ? (<ExternalLinkIcon />) : (<></>) }
            </Box>
        </Link>
    );
}