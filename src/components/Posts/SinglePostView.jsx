import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { usePCtx } from '../../context/PostsContext';
import Comment from './Comment';
import PostActionsBar from './PostActionsBar';

function SinglePostView() {
  const { idOrSlug } = useParams();
  const { activePost, dispatchEvent, posts } = usePCtx();
  const [post, setPost] = useState(activePost);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(() => {
    let p = posts.filter(p => p.id === idOrSlug)[0];

    setPost(p);
    dispatchEvent('SET_ACTIVE_POST', p);
    setLoading(false);
  }, [posts, idOrSlug, dispatchEvent]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (activePost) {
      setTimeout(() => {
        setPost(activePost);
        setLoading(false);
      }, 500);
    }
    !activePost && fetchPost();
  }, [activePost, fetchPost]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && post && (
        <Box px="4" pb="40px">
          <Heading as="h1" fontSize={['24px', '28px']}>
            Post
          </Heading>{' '}
          <HStack justifyContent={'space-between'} py="4">
            <HStack spacing="5">
              <Avatar
                as={Link}
                to={`/user/${post.user}`}
                size="sm"
                name={post.user}
                src="https://source.unsplash.com/random/50x50/?portrait"
              />
              <Box>
                <Link to={`/user/${post.user}`}>
                  <Heading
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
            <IconButton
              variant="flushed"
              icon={<BsThreeDots />}
              fontSize="2xl"
            />
          </HStack>
          <Box pb="4">
            <Text>{post.body}</Text>
          </Box>
          {post.image && (
            <Image objectFit={'cover'} maxH="400px" w="100%" src={post.image} />
          )}
          <Box py="4">
            <PostActionsBar
              comments={post.comments}
              shares={post.shares}
              upvotes={post.upvotes}
              id={post.id}
            />
          </Box>
          <HStack alignItems={'flex-start'}>
            <Avatar
              name="user"
              size="md"
              src="https://source.unsplash.com/random/50x50/?portrait"
            />
            <Box w="full">
              <FormControl isRequired>
                <Textarea resize={'none'} rows="2" placeholder="post a reply" />
              </FormControl>
              <Button
                ml="auto"
                display={'block'}
                type="submit"
                colorScheme="blue"
                mt="2"
              >
                Reply
              </Button>
            </Box>
          </HStack>
          <Divider py="4" />
          <Stack divider={<StackDivider />} spacing="5">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </Stack>
        </Box>
      )}
    </div>
  );
}

export default SinglePostView;
