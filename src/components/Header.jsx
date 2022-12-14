import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import WrapContent from '../layout/WrapContent';
import Logo from '../Logo';
import Auth from './Auth/Auth';

function Header() {
  return (
    <Box
      borderBottom="1px solid"
      borderBottomColor={'gray.200'}
      pos="sticky"
      top="0"
      px="4"
      zIndex={3}
      backdropFilter="blur(10px)"
    >
      <WrapContent>
        <HStack justifyContent={'space-between'}>
          <Logo />

          <HStack spacing="8" py="5">
            <Auth />
          </HStack>
        </HStack>
      </WrapContent>
    </Box>
  );
}

export default Header;
