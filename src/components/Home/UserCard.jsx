import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BiUserPlus } from 'react-icons/bi';

function UserCard({ name, username }) {
  return (
    <HStack justifyContent={'space-between'}>
      <HStack spacing={'2'}>
        <Avatar
          size="sm"
          name="John Doe"
          src="https://source.unsplash.com/random/50x50/?portrait"
        />
        <Box>
          <Heading as="h3" fontSize="sm">
            {name}
          </Heading>
          <Text color="gray.500" as="h4" fontSize="xs">
            @{username}
          </Text>
        </Box>
      </HStack>
      <IconButton
        color="blue.500"
        variant="flushed"
        icon={<BiUserPlus />}
        fontSize="3xl"
      />
    </HStack>
  );
}

export default UserCard;
