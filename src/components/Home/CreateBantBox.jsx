import { useEffect, useState } from 'react';
import { Box, Button, FormControl, HStack, IconButton, Text } from '@chakra-ui/react';
import { FcAddImage, FcVideoCall, FcCheckmark } from 'react-icons/fc';
import { useACtx } from '../../context/AuthContext';
import TextArea from './TextArea';
import { pinJSONToIPFS, unpinIPFS } from '../../util/pinata';
import { createPost } from '../../util/backend';

function CreateBantBox() {

  const { isAuth, contract } = useACtx();
  const [logged, setLogged] = useState(false);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = event.target.post.value;
    const metadata = {};
    // FIXME
    metadata.name = "FIX NAME!";
    metadata.description = post;
    let response = await pinJSONToIPFS(metadata);
    console.log(response);
    if (response.success !== true) {
      console.log("Failed to pin on IPFS");
      return;
    }
    // FIXME
    const data = {
      hashtag: "FIX ME",
      content: response.url,
      imgHash: "FIX ME"
    };
    try {
      const tx = await createPost(contract, data);
      console.log(tx);
      dispatchEvent("SET_NEW_POST", )
    } catch(error) {
      console.error(error);
      // unpin 
      await unpinIPFS(response.cid);
      alert(error.message);
    }
    // dispatchEvent()
  }

  useEffect(() => {
    setLogged(isAuth !== false);
  }, [isAuth]);

  return (
    <Box
      shadow="base"
      borderRadius="md"
      p={4}
      bg="white"
      w={['full', '95%']}
      mx="auto"
    >
      <HStack as="form" justifyContent={'space-between'} alignItems="flex-start" onSubmit={handleSubmit}>
        <Box w="100%">
          <Text as="h3" size="lg" mb={4} fontWeight="semibold" fontSize={'lg'}>
            What's on your mind? Steve
          </Text>
          <FormControl isRequired>
            <TextArea
              bg="gray.100"
              name="post"
              placeholder="write a banta asap!"
              letterSpacing="wide"
              overflow="hidden"
              resize="none"
              rows="5"
            />
          </FormControl>
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
              disabled={!logged}
            >
              Bant live
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              size="sm"
              leftIcon={
                <Box fontSize="1g">
                  <FcCheckmark />
                </Box>
              }
              fontSize="sm"
              disabled={!logged}
              type="submit">
                Post
              </Button>
          </HStack>
        </Box>
        <IconButton
          variant="flushed"
          icon={<FcAddImage />}
          size="sm"
          rounded="sm"
          fontSize={'2xl'}
          disabled={!logged}
        />
      </HStack>
    </Box>
  );
}

export default CreateBantBox;
