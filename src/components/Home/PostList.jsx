import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import { usePCtx } from '../../context/PostsContext';
import { Link } from 'react-router-dom';
import PostActionsBar from '../Posts/PostActionsBar';

function PostList() {
  const { posts, loading } = usePCtx();
  return (
    <Stack>
      <HStack justifyContent={'space-between'} py="1">
        <Heading as="h1" px="4" fontSize={['24px', '28px']}>
          Posts
        </Heading>
        <Button
          size="sm"
          variant="flushed"
          leftIcon={
            <Box color="blue.500">
              <FaFilter />
            </Box>
          }
        >
          Filters
        </Button>
      </HStack>
      {!loading &&
        posts &&
        posts.map((post, i) => <Post key={i} post={post} />)}
    </Stack>
  );
}

export default PostList;

function Post({ post }) {
  const { dispatchEvent } = usePCtx();

  function setActivePost() {
    dispatchEvent('SET_ACTIVE_POST', post);
  }
  return (
    <Stack
      shadow="base"
      rounded="lg"
      bg="white"
      w={['full', '95%']}
      style={{ margin: 'auto', marginTop: '10px', marginBottom: '25px' }}
    >
      <HStack
        as={Link}
        to={`/banta/${post.id}`}
        justifyContent={'space-between'}
        p="4"
      >
        <HStack spacing="5">
          <Avatar
            onClick={setActivePost}
            as={Link}
            to={`/user/${post.user}`}
            size="sm"
            name={post.user}
            src="https://source.unsplash.com/random/50x50/?portrait"
          />
          <Box>
            <Link to={`/user/${post.user}`}>
              <Heading
                onClick={setActivePost}
                _hover={{ textDecoration: 'underline' }}
                as="h3"
                fontSize="sm"
              >
                {post.user}
              </Heading>
            </Link>
            <Text color="gray.500" as="h4" fontSize="xs">
              {post.time}
            </Text>
          </Box>
        </HStack>
        <IconButton variant="flushed" icon={<BsThreeDots />} fontSize="2xl" />
      </HStack>
      {post.image && (
        <Link to={`/banta/${post.id}`}>
          <Image
            onClick={setActivePost}
            objectFit={'cover'}
            maxH="400px"
            w="100%"
            src={post.image}
          />
        </Link>
      )}
      <Text onClick={setActivePost} as={Link} to={`/banta/${post.id}`} p="4">
        {post.body}
      </Text>
      <Box px="4">
        <PostActionsBar
          comments={post.comments}
          shares={post.shares}
          upvotes={post.upvotes}
        />{' '}
      </Box>
    </Stack>
  );
}
