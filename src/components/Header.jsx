import { Box, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import WrapContent from '../layout/WrapContent';
import Logo from '../Logo';
import { BiLogInCircle } from 'react-icons/bi';

function Header() {
  return (
    <Box
      borderBottom="1px solid"
      borderBottomColor={'gray.200'}
      pos="sticky"
      top="0"
      zIndex={3}
      backdropFilter="blur(10px)"
    >
      <WrapContent>
        <HStack justifyContent={'space-between'}>
          <Logo />

          <HStack spacing="8" py="5">
            <Link to="/bant">Post a banta!</Link>
            <Button colorScheme="green" rightIcon={<BiLogInCircle />}>
              Login
            </Button>
          </HStack>
        </HStack>
      </WrapContent>
    </Box>
  );
}

export default Header;
