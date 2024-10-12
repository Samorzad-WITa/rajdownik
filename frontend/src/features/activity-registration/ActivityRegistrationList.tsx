import {Flex, Icon, Text} from "@chakra-ui/react";
import {useActivityRegistrations} from "@/hooks";
import {PendingSpinner, SystemInformation} from "@/components";
import {useAuth} from "@/features/context/AuthProvider";
import {ChevronRight} from "lucide-react";
import {Link} from "@chakra-ui/next-js";

export const ActivityRegistrationList = () => {

    const { data, isPending } = useActivityRegistrations();
    const { token } = useAuth(true);

    if(isPending) return <PendingSpinner />
    if(!data || data?.length === 0)
        return <SystemInformation>Brak aktywnych zapisów na atrakcje</SystemInformation>

    return (
        <Flex
            paddingX={2}
            fontSize={'large'}
            fontWeight={'bold'}
            gap={5}
            flexDirection="column"
        >
            { data?.map((item) => (
                <Link
                    key={item.id}
                    href={`/activity/registration/${item.id}`}
                >
                    <Flex
                        backgroundColor="#E4E9F4"
                        borderRadius={20} p={4}
                        boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
                    >
                        <Text flex={1} align="center">
                            {item.title }
                        </Text>
                        <Icon fontSize={28} as={ChevronRight} />
                    </Flex>
                </Link>
            ))}
        </Flex>
    );
}