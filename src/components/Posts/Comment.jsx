import { Avatar, Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Comment() {
  return (
    <Box bg="gray.50" pt="5">
      <HStack spacing="5" alignItems={'flex-start'}>
        <Avatar
          // as={Link}

          size="sm"
          name={'James Hajm'}
          src="https://source.unsplash.com/random/50x50/?portrait"
        />
        <Box>
          <Heading
            _hover={{ textDecoration: 'underline' }}
            as="h3"
            fontSize="sm"
          >
            James jakkd
          </Heading>
          <Text color="gray.500" as="h4" fontSize="xs">
            replying to post
          </Text>
          <Text>
            ummunity moderated by the users using blockchain governance
            principles.
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default Comment;
