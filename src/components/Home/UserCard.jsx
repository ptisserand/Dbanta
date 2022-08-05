import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { useACtx } from '../../context/AuthContext';

function UserCard({ name, username, id }) {
  const toast = useToast();
  const { isAuth, contract } = useACtx();
  const [loading, setLoading] = useState(false);

  const followUser = async () => {
    console.info("Following ", name, id);
    if (isAuth !== false && contract !== undefined) {
      setLoading(true);
      try {
      const user = await contract.getUserAddress(id.toNumber());
      const tx = await contract.followUser(user);
      toast({
        status: 'success',
        title: 'User followed',
        description: `Transaction id: ${tx}`,
        duration: 2000,
        isClosable: true
      });
      setLoading(false);
      } catch(error) {
        toast({
          status: 'error',
          title: 'Fail to follow user',
          description: `${error.message}`,
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    }
  }

  return (
    <HStack justifyContent={'space-between'}>
      <HStack spacing={'2'}>
        <Avatar
          size="sm"
          name={name}
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
        onClick={followUser}
      />
    {loading && <Spinner></Spinner>}
    </HStack>
  );
}

export default UserCard;
