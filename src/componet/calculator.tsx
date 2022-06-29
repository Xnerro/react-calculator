import {
    Box,
    Button,
    Container,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { BsBackspace } from 'react-icons/bs';

const pad: any[] = ['C', <BsBackspace />, '', 7, 8, 9, 4, 5, 6, 1, 2, 3];

const opt: string[] = ['+', 'x', '-', '÷', '='];

export const Calculator: FC = () => {
    const [num, setNum] = useState<any[]>([0]);
    const [res, setRes] = useState(Number);
    const [operator, setOperator] = useState(String);
    const [log, setLog] = useState(['']);

    const getNumber = (x: any) => {
        if (num[0] === 0) {
            num.shift();
            setNum([x]);
        } else {
            setNum([...num, x]);
        }
    };

    const backspace = () => {
        if (num.length !== 1) {
            setNum((num) => num.filter((_, i) => i !== num.length - 1));
        } else {
            setNum([0]);
        }
    };

    const getOperator = (x: string) => {
        if (res === 0 && operator !== '-') {
            setRes(Number(num.join('')));
        } else {
            if (operator === '+') {
                setRes(res + Number(num.join('')));
            } else if (operator === '-') {
                setRes(res - Number(num.join('')));
            } else if (operator === 'x') {
                setRes(res * Number(num.join('')));
            } else if (operator === '÷') {
                setRes(res / Number(num.join('')));
            } else {
                setRes(res);
                setNum([0]);
                setLog(['']);
            }
            setOperator(x);
        }
        setLog([...log, num.join('') + x]);
        setNum([0]);
    };

    const clear = () => {
        setNum([0]);
        setRes(0);
        setLog(['']);
        setOperator(String);
    };

    const equal = () => {
        setOperator('=');
        console.log(log[1].slice(-1));
        getOperator(log[1].slice(-1));
        setNum([0]);
        setLog(['']);
        setOperator(String);
    };

    return (
        <Box
            minW="20vw"
            minH="60vh"
            w="20vw"
            bg="gray.700"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
        >
            <Container color="#fff" p="5" minH="15%" textAlign="end">
                <Text fontSize="4xl">
                    {num[0] === 0 ? res : num.map((x) => x)}
                </Text>
                <Text
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    h="1rem"
                    fontSize="0.8rem"
                    w="100%"
                >
                    {log}
                </Text>
            </Container>
            <Box bg="gray.600" display="flex" flexDirection="column">
                <Container minW="100%" minH="80%" display="flex" w="100%" p="0">
                    <Container p="0">
                        <SimpleGrid columns={3} spacing={0}>
                            {pad.map((x, i) => (
                                <Button
                                    fontSize="xx-large"
                                    borderRadius="none"
                                    h="20"
                                    key={i}
                                    onClick={() => {
                                        if (typeof x === 'number') {
                                            getNumber(x);
                                        } else {
                                            if (typeof x === 'object') {
                                                backspace();
                                            } else if (x === 'C') {
                                                clear();
                                            }
                                        }
                                    }}
                                >
                                    {x}
                                </Button>
                            ))}
                            <Button
                                borderRadius="none"
                                fontSize="xx-large"
                                h="20"
                                w="100%"
                                onClick={() => {
                                    if (num[0] !== 0) {
                                        getNumber(0);
                                    }
                                }}
                            >
                                0
                            </Button>
                            <Button
                                borderRadius="none"
                                fontSize="xx-large"
                                h="20"
                                w="100%"
                                onClick={() => {
                                    if (num[0] !== 0) {
                                        getNumber('00');
                                    }
                                }}
                            >
                                00
                            </Button>
                            <Button
                                borderRadius="none"
                                fontSize="xx-large"
                                h="20"
                                w="100%"
                                onClick={() => {
                                    getNumber('.');
                                }}
                            >
                                .
                            </Button>
                        </SimpleGrid>
                    </Container>
                    <Container w="30%" p="0">
                        <VStack spacing={0}>
                            {opt.map((x, i) =>
                                x !== '=' ? (
                                    <Button
                                        bg="gray.400"
                                        borderRadius="none"
                                        fontSize="xx-large"
                                        key={i}
                                        w="100%"
                                        h="20"
                                        onClick={() => getOperator(x)}
                                    >
                                        {x}
                                    </Button>
                                ) : (
                                    <Button
                                        bg="orange.400"
                                        _hover={{
                                            backgroundColor: 'orange.500',
                                        }}
                                        borderRadius="none"
                                        fontSize="xx-large"
                                        h="20"
                                        w="100%"
                                        onClick={() => equal()}
                                    >
                                        {x}
                                    </Button>
                                )
                            )}
                        </VStack>
                    </Container>
                </Container>
            </Box>
        </Box>
    );
};
