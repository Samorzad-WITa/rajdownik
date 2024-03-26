import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Button, chakra } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Rajd</title>
        <meta name="description" content="Rajd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.main>
        <Button colorScheme="blue">Button</Button>
      </chakra.main>
    </>
  );
}
