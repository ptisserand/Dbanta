import { Box, Container, Text } from '@chakra-ui/react';
import Logo from '../Logo';

export default function Footer() {
  return (
    <>
      <Box color="gray.700">
        <Container maxW={'container.xl'} py={4} spacing={4}>
          <Logo />
          <Text fontSize="xs">
            Dbanta is a free decentrelized cummunity moderated by the users
            using blockchain governance principles.
          </Text>
          <Text fontSize="xs">All rights reserved.</Text>
        </Container>
      </Box>
    </>
  );
}
