import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { usePCtx } from '../../context/PostsContext';

function SinglePostView() {
  const { idOrSlug } = useParams();
  const { activePost, dispatchEvent, posts } = usePCtx();
  const [post, setPost] = useState(activePost);
  const [loading, setLoading] = useState(null);

  const fetchPost = useCallback(() => {
    setLoading(true);
    let p = posts.filter(p => p.id === idOrSlug)[0];

    setPost(p);
    dispatchEvent('SET_ACTIVE_POST', p);
    setLoading(false);
  }, [posts, idOrSlug, dispatchEvent]);

  useEffect(() => {
    activePost && setPost(activePost);
    !activePost && fetchPost();
  }, [activePost, fetchPost]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && post && (
        <Box px="4">
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
            <Link to={`/banta/${post.id}/photo`}>
              <Image
                objectFit={'cover'}
                maxH="400px"
                w="100%"
                src={post.image}
              />
            </Link>
          )}
        </Box>
      )}
    </div>
  );
}

export default SinglePostView;
