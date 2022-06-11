import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaComment, FaFilter, FaShare } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiUpvote } from 'react-icons/bi';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { usePCtx } from '../../context/PostsContext';
import { Link } from 'react-router-dom';

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
        <Link to={`/banta/${post.id}/photo`}>
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
      <Box>
        <HStack spacing="8" px="4" pb="4" justifyContent={'space-between'}>
          <Popover placement="bottom" closeOnBlur={false}>
            <PopoverTrigger>
              <Button
                size="sm"
                fontSize={'13px'}
                fontFamily={'Plus Jakarta Sans'}
                leftIcon={
                  <Box fontSize="xl" color="blue.500">
                    <BiUpvote />
                  </Box>
                }
              >
                Upvote ({post.upvotes})
              </Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.500">
              <PopoverHeader
                fontSize="sm"
                pt={4}
                border="0"
                fontFamily="Plus Jakarta Sans"
              >
                You like this, share some Bantokens!
                <br />
                <small>quick select :</small>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <ButtonGroup gap="2" color="gray.900">
                  <Button size="sm" rounded="sm">
                    5{' '}
                  </Button>
                  <Button size="sm" rounded="sm">
                    10{' '}
                  </Button>
                  <Button size="sm" rounded="sm">
                    20
                  </Button>
                  <Button size="sm" rounded="sm">
                    50
                  </Button>
                  <Input
                    size="sm"
                    placeholder="Enter amt"
                    bg="white"
                    type="number"
                  />
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'13px'}
            leftIcon={
              <Box fontSize="lg" color="blue.500">
                <FaComment />
              </Box>
            }
          >
            Comments ({post.comments})
          </Button>
          <Button
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'13px'}
            leftIcon={
              <Box fontSize="lg" color="blue.500">
                <FaShare />
              </Box>
            }
          >
            ReBant! ({post.shares})
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
}
