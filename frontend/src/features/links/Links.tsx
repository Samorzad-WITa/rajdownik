import {Center, Flex, Link, Text, VStack} from "@chakra-ui/react";
import {LinkIcon} from "@chakra-ui/icons";
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";

export const Links = () => {

    return (
      <Flex
        paddingX={2}
        fontSize="13px"
        fontWeight={'bold'}
        gap={2}
        flexDirection="column"

      >
          {groups.map((linkGroup) => (
              <VStack key={linkGroup.groupLabel} paddingBottom={5}>
                  <Text fontSize="20px">
                      {linkGroup.groupLabel}
                  </Text>
                  { linkGroup.groupLinks.map((link) => (
                      <Link key={link.href} width="100%" isExternal href={link.href}>
                          <Flex
                              width="100%"
                              bgColor="#E4E9F4"
                              borderRadius={15}
                          >
                              <Center padding={2} paddingLeft={4}>
                                  { link.icon }
                                  <Text
                                      paddingLeft={2}
                                  >
                                      {link.label}
                                  </Text>
                              </Center>
                          </Flex>
                      </Link>
                  ))}
              </VStack>
          ))}
      </Flex>
    );
}

const groups = [
    {
        groupLabel: 'Media społecznościowe',
        groupLinks: [
            {
                label: 'Facebook - Samorząd WBLiW (W2)',
                href: 'https://www.facebook.com/Samorzad.WBLiW?locale=pl_PL',
                icon: <LinkIcon />
            },
            {
                label: 'Facebook - Samorząd WITa (W4)',
                href: 'https://www.facebook.com/samorzad.wita?locale=pl_PL',
                icon: <LinkIcon />
            },

            {
                label: 'Facebook - Samorząd WGGiG (W6)',
                href: 'https://www.facebook.com/samorzadw6?locale=pl_PL',
                icon: <LinkIcon />
            },
        ]
    },
    {
        groupLabel: 'Sklepy i restauracje',
        groupLinks: [
            {
                label: 'Facebook - Samorząd WBLiW (W2)',
                href: 'https://www.facebook.com/Samorzad.WBLiW?locale=pl_PL',
                icon: <LinkIcon />
            },
            {
                label: 'Facebook - Samorząd WITa (W4)',
                href: 'https://www.facebook.com/samorzad.wita?locale=pl_PL',
                icon: <LinkIcon />
            },

            {
                label: 'Facebook - Samorząd WGGiG (W6)',
                href: 'https://www.facebook.com/samorzadw6?locale=pl_PL',
                icon: <LinkIcon />
            },
        ]
    },
]
