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
              <VStack key={linkGroup.groupLabel} paddingBottom={10} gap={4}>
                  <Text fontSize="20px">
                      {linkGroup.groupLabel}
                  </Text>
                  { linkGroup.groupLinks.map((link) => (
                      <Link
                          key={link.href}
                          width="100%"
                          isExternal
                          href={link.href}
                          bgColor="#E4E9F4"
                          borderRadius={15}
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                          _focus={{ boxShadow: "none" }}
                          boxShadow="0px 10px 25px 0px rgba(0, 0, 0, 0.20)"
                      >
                          <Flex>
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
                label: 'Grupa na Facebooku',
                href: 'https://www.facebook.com/groups/1917599038753483',
                icon: <LinkIcon />
            },
            {
                label: 'Wydarzenie na Facebooku',
                href: 'https://www.facebook.com/events/878143053822784',
                icon: <LinkIcon />
            },
            {
                label: 'Facebook - Samorząd SSWArch (W1)',
                href: 'https://www.facebook.com/SSWArch?locale=pl_PL',
                icon: <LinkIcon />
            },
            {
                label: 'Facebook - Samorząd SSWArch (W1)',
                href: 'https://www.facebook.com/SSWArch?locale=pl_PL',
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
                label: 'Sklep Livio',
                href: 'https://maps.app.goo.gl/6nD8P2XW4e51XuKs6',
                icon: <LinkIcon />
            },
            {
                label: 'Pizzeria-Kręgielnia „Dziupla”',
                href: 'https://maps.app.goo.gl/5P3WAwwk5yoq3SZ38',
                icon: <LinkIcon />
            },
        ]
    },
    {
        groupLabel: 'Regulaminy atrakcji',
        groupLinks: [
            {
                label: 'Turniej Flanek',
                href: 'https://drive.google.com/file/d/1KDwRjGs6rYagpfGydQnQo4DuF8Xi5G3J/view?usp=sharing',
                icon: <LinkIcon />
            },
            {
                label: 'Jugger',
                href: 'https://pl.wikipedia.org/wiki/Jugger',
                icon: <LinkIcon />
            },
            {
                label: 'Beerpong',
                href: 'https://drive.google.com/file/d/1HrR9Gt5KTlUF_AVSQdZSKRJSEy37FbsF/view?usp=sharing',
                icon: <LinkIcon />
            },
            {
                label: 'Quiz średniowieczny ',
                href: 'https://drive.google.com/file/d/15lVtVNp_Bpyfhc494f4fxhpVJQvyjhFu/view?usp=sharing',
                icon: <LinkIcon />
            },
            {
                label: 'Turniej siatkówki',
                href: 'https://drive.google.com/file/d/1j3h3j-jUxRvQ1s_fs2bndnh3EWFt6IvP/view?usp=sharing',
                icon: <LinkIcon />
            },
            {
                label: 'Gra Nocna',
                href: 'https://drive.google.com/file/d/1cRbp6fcJ5vg8c0iPSWdcQJNzznBhIv9O/view?usp=sharing',
                icon: <LinkIcon />
            },
            {
                label: 'Szachoszermierkolej',
                href: 'https://drive.google.com/file/d/1yp3qsKa9euswyg03_Azte1kFL0xpYwPA/view?usp=sharing',
                icon: <LinkIcon />
            },
        ]
    }
]
