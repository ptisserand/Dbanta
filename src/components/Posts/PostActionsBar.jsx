import React, { useEffect } from 'react';
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
import { BiHeart, BiMoney } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useACtx } from '../../context/AuthContext';

function PostActionsBar({ upvotes, comments, shares, id }) {
  const [liked, setLikedByUser] = useState(false);
  const [likesCount, setLikedCount] = useState(0);
  const { isAuth, contract } = useACtx();

  const handleLikeClick = async () => {
    console.log("Post ID:", id);
    if (liked) {
      await contract.unlikePost(id);
      setLikedCount(prev => prev - 1);
      setLikedByUser(false);
    } else {
      await contract.likePost(id);
      setLikedCount(prev => prev + 1);
      setLikedByUser(true);
    }
  };

  const fetchPostLikesCount = async () => {
    //get post likes
    let value = 0;
    if (contract !== undefined) {
      value = await contract.getLikes(id);
    }
    setLikedCount(value);
  };

  const fetchUserLikesPost = async () => {
    let liked = await contract.userLikesPost(id, isAuth);
    setLikedByUser(liked);
  };

  useEffect(() => {
    fetchPostLikesCount();
    fetchUserLikesPost();
  }, [contract]);

  return (
    <Box>
      <HStack spacing={[3, 5, 8]} pb="4" justifyContent={'space-between'}>
        <Button
          size="sm"
          variant={'flushed'}
          fontSize={'13px'}
          fontFamily={'Plus Jakarta Sans'}
          onClick={handleLikeClick}
          leftIcon={
            liked ? (
              <Box fontSize="xl" color="crimson">
                <BsFillHeartFill />
              </Box>
            ) : (
              <Box fontSize="xl" color="blue.500">
                <BiHeart />
              </Box>
            )
          }
        >
          {likesCount}
        </Button>
        <DonatePopover>
          <Button
            size="sm"
            variant={'flushed'}
            fontSize={'13px'}
            fontFamily={'Plus Jakarta Sans'}
            leftIcon={
              <Box fontSize="xl" color="blue.500">
                <BiMoney />
              </Box>
            }
          >
            {/* Upvote */}
            90
          </Button>
        </DonatePopover>
        {id && (
          <Button
            variant={'flushed'}
            as={Link}
            to={`/banta/${id}`}
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'xs'}
            leftIcon={
              <Box fontSize="xl" color="blue.500">
                <FaComment />
              </Box>
            }
          >
            {/* Comments */}
          </Button>
        )}
        {!id && (
          <Button
            variant={'flushed'}
            fontFamily={'Plus Jakarta Sans'}
            size="sm"
            fontSize={'xs'}
            leftIcon={
              <Box fontSize="xl" color="blue.500">
                <FaComment />
              </Box>
            }
          >
            {/* Comments */}
          </Button>
        )}
        <Button
          variant={'flushed'}
          fontFamily={'Plus Jakarta Sans'}
          size="sm"
          fontSize={'xs'}
          leftIcon={
            <Box fontSize={'xl'} color="blue.500">
              <AiOutlineRetweet />
            </Box>
          }
        >
          {/* ReBant! */}
        </Button>
      </HStack>
    </Box>
  );
}

export default PostActionsBar;

function DonatePopover({ children }) {
  const [tipAmt, setTipAmt] = useState(1);
  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent color="white" bg="blue.800">
        <PopoverHeader
          fontSize="sm"
          pt={4}
          border="0"
          fontFamily="Plus Jakarta Sans"
          fontWeight={'bold'}
        >
          Tip :
          <br />
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody as={HStack}>
          <Input
            size="sm"
            value={tipAmt}
            onChange={e => setTipAmt(e.target.value)}
            placeholder="Enter amt $"
            type="number"
            min="1"
            bg="gray.800"
          />
          <Button
            disabled={tipAmt < 1}
            px="40px"
            rounded="sm"
            size="sm"
            colorScheme={'teal'}
          >
            Tip {tipAmt}
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
