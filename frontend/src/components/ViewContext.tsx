import {Box, Flex, Text} from "@chakra-ui/react";
import {useAppContext} from "@/features/context/AppContext";

export const ViewContext = () => {
    const { appProps } = useAppContext();
    return (
        <Flex alignItems="left" width="100%" paddingLeft={45}>
            <Text
                color="#1E3364"
                fontSize={22}
                fontWeight={'bold'}
            >
                { appProps.pageTitle }
            </Text>
        </Flex>
    )
}