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

function PostList() {
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
      <Post />
      <Post />
    </Stack>
  );
}

export default PostList;

function Post() {
  return (
    <Stack
      spacing="5"
      shadow="base"
      rounded="lg"
      bg="white"
      w={['full', '95%']}
      style={{ margin: 'auto', marginTop: '10px', marginBottom: '25px' }}
    >
      <HStack justifyContent={'space-between'} p="4">
        <HStack spacing="5">
          <Avatar
            size="sm"
            name="John Doe"
            src="https://source.unsplash.com/random/50x50/?portrait"
          />
          <Box>
            <Heading as="h3" fontSize="sm">
              John Doe
            </Heading>
            <Text color="gray.500" as="h4" fontSize="xs">
              2 hours ago
            </Text>
          </Box>
        </HStack>
        <IconButton variant="flushed" icon={<BsThreeDots />} fontSize="2xl" />
      </HStack>
      <Image
        objectFit={'cover'}
        maxH="400px"
        w="100%"
        src={'https://source.unsplash.com/random/800x600/?nature,food,party'}
      />
      <Text px="4">
        If you're not single-minded and tough in these instances, your
        entrepreneurial activity is pretty meaningless.
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
                Upvote (100)
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
            Comments (10)
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
            ReBant! (5)
          </Button>
        </HStack>
      </Box>
    </Stack>
  );
}
