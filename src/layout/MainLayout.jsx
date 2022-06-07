import {
  Center,
  Flex,
  HStack,
  Icon,
  VStack,
  Link,
  Box,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import WrapContent from '../layout/WrapContent';
import Home from '../pages/Home';

function MainLayout() {
  return (
    <WrapContent px="0">
      <Flex>
        <VStack as="nav" w={[0, '60px', '70px', '20%']}>
          <Link href="/" bg="gray.200">
            <Center>
              <HStack spacing="5">
                <Icon as={FaHome} size="20px" />
              </HStack>
            </Center>
          </Link>
        </VStack>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Flex>
    </WrapContent>
  );
}

export default MainLayout;
