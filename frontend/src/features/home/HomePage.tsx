import { HomeCard } from "@/components/HomeCard";
import {Box, Flex, Grid, SimpleGrid, Link} from "@chakra-ui/react";
import {useAppContext} from "@/features/context/AppContext";
import {useEffect} from "react";
import {useAuth} from "@/features/context/AuthProvider";

export const HomePage = () => {
    return (
      <Flex
          width="100%"
          fontSize={'large'}
          fontWeight={'bold'}
          gap={7}
          paddingX={3}
          flexDirection="column"
      >
          <Flex
            width="100%"
            bgColor="#FFFFF"
            borderColor="#1F3565"
            borderRadius={20}
            padding={3}
            height={100}
            border='2px'
            boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.20)"
          >
            Witamy na Rajdzie Jesiennym W1xW4xW6!
          </Flex>
          <SimpleGrid
            width="100%"
            columns={2}
            spacing={5}
          >
              {cards.map((card) => (
                  <HomeCard key={card.title} title={card.title} href={card.href} isExternal={card.isExternal} />
              ))}
          </SimpleGrid>
      </Flex>
    );
}

const cards = [
    {
        title: 'Przydatne linki',
        href: '/links',
        isExternal: false
    },
    {
        title: 'Rejestracja na domki',
        href: '/registration',
        isExternal: false
    },
    {
        title: 'Regulamin',
        href: 'https://drive.google.com/file/d/1vnCX1rHCBf8q9UWamHVeKvTetP0duA34/view?usp=sharing',
        isExternal: true
    },
    {
        title: 'Mapka ośrodka',
        href: '/images/resort-map.png',
        isExternal: true
    },
]