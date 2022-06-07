import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FcAddImage, FcVideoCall } from 'react-icons/fc';
import TextArea from './TextArea';

function CreateBantBox() {
  return (
    <Box
      shadow="base"
      borderRadius="md"
      p={4}
      bg="white"
      w={['full', '95%']}
      mx="auto"
    >
      <HStack justifyContent={'space-between'} alignItems="flex-start">
        <Box w="100%">
          <Text as="h3" size="lg" mb={4} fontWeight="semibold" fontSize={'lg'}>
            What's on your mind? Steve
          </Text>
          <TextArea
            bg="gray.100"
            name="post"
            placeholder="write a banta asap!"
            letterSpacing="wide"
            overflow="hidden"
            resize="none"
            rows="5"
          />
          <HStack spacing="5" pt="5">
            <Button
              variant="outline"
              colorScheme="blue"
              size="sm"
              leftIcon={
                <Box fontSize="lg">
                  <FcVideoCall />
                </Box>
              }
              fontSize="sm"
            >
              Bant live
            </Button>
          </HStack>
        </Box>
        <IconButton
          variant="flushed"
          icon={<FcAddImage />}
          size="sm"
          rounded="sm"
          fontSize={'2xl'}
        />
      </HStack>
    </Box>
  );
}

export default CreateBantBox;
