import {Box, Text} from "@chakra-ui/react";

type ViewContextProps = {
    label: string
}

export const ViewContext = ({ label }: ViewContextProps) => {
    return (
        <Box>
           <Text
               fontSize={'large'}
               fontWeight={'bold'}
               textAlign={['left', 'center']}
           >
               { label }
           </Text>
        </Box>
    )
}