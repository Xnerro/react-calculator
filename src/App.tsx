import React from 'react';
import { ChakraProvider, Box, theme, Heading, VStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Calculator } from './componet/calculator';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box
                w="100%"
                minW="100vh"
                textAlign="center"
                fontSize="xl"
                display="flex"
                justifyContent="center"
            >
                <VStack mt="16">
                    <Heading mb="20">Calculator With React</Heading>
                    <Calculator />
                </VStack>
                <ColorModeSwitcher position="absolute" right="0%" />
            </Box>
        </ChakraProvider>
    );
};
