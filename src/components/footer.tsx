import { Center, Container, Divider, Stack } from '@mantine/core';
import { BsGithub } from 'react-icons/bs';
import { AiFillTwitterCircle, AiFillMediumCircle } from 'react-icons/ai';

export default function Footer () {

    return (
        <Container fluid mt={20} mr={30} mb={50}>
            <Divider my="sm" variant="dashed" />
            <Stack mt={20}>
                <Center >
                    Bu uygulama React öğrenmek amacıyla Hamza Ak tarafından 2023 yılında oluşturulmuştur.
                </Center>
                <Center>
                    <a href='https://github.com/hamzaak/hmdb' target='_blank' style={{color: 'white'}} rel="noreferrer">
                        <BsGithub size="2rem" />
                    </a>
                    <a href='https://twitter.com/haamzaak' target='_blank' style={{color: 'white', marginLeft: '0.5rem'}} rel="noreferrer">
                        <AiFillTwitterCircle size="2.4rem" />
                    </a>
                    <a href='https://medium.com/@hamzaak' target='_blank' style={{color: 'white', marginLeft: '0.5rem'}} rel="noreferrer">
                        <AiFillMediumCircle size="2.4rem" />
                    </a>
                </Center>
            </Stack>
            
        </Container>
    )
};