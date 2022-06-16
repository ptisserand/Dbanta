import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';
import { BiUpvote } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function PostActionsBar({ upvotes, comments, shares, id }) {
  // const
  return (
    <Box>
      <HStack spacing={[3, 5, 8]} pb="4" justifyContent={'space-between'}>
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
              Upvote
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
        {id && (
          <Button
            as={Link}
            to={`/banta/${id}`}
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'xs'}
            leftIcon={
              <Box fontSize={['sm', 'sm', 'lg']} color="blue.500">
                <FaComment />
              </Box>
            }
          >
            Comments
          </Button>
        )}
        {!id && (
          <Button
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'xs'}
            leftIcon={
              <Box fontSize={['sm', 'sm', 'lg']} color="blue.500">
                <FaComment />
              </Box>
            }
          >
            Comments
          </Button>
        )}
        <Button
          fontFamily={'Plus Jakarta Sans'}
          size="sm"
          fontSize={'xs'}
          leftIcon={
            <Box fontSize={['sm', 'sm', 'lg']} color="blue.500">
              <AiOutlineRetweet />
            </Box>
          }
        >
          ReBant!
        </Button>
      </HStack>
    </Box>
  );
}

export default PostActionsBar;
