import { useEffect, useState, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { Box, Button, FormControl, HStack, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { FcAddImage, FcVideoCall, FcCheckmark } from 'react-icons/fc';
import { usePCtx } from '../../context/PostsContext';
import { useACtx } from '../../context/AuthContext';
import TextArea from './TextArea';
import { pinJSONToIPFS, pinFileToIPFS, unpinIPFS } from '../../util/pinata';

function CreateBantBox() {
  const toast = useToast();

  const { dispatchEvent } = usePCtx();
  const { isAuth, contract } = useACtx();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState({url: "", cid: ""});
  const fileRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.post.value;
    const metadata = {};
    // FIXME
    metadata.name = "FIX NAME!";
    metadata.description = content;
    setLoading(true);
    let response = await pinJSONToIPFS(metadata);
    console.log(response);
    if (response.success !== true) {
      console.log("Failed to pin on IPFS");
      toast({
        status: 'error',
        title: 'IPFS upload failed',
        description: 'Failed to upload post content to IPFS',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    // FIXME
    const data = {
      hashtag: "FIX ME",
      content: response.url,
      imgHash: imageData.url,
    };
    try {
      const tx = await contract.createPost(data);
      console.log(tx);
      const post = {
        body: content
      };
      dispatchEvent("SET_NEW_POST", post);
      setLoading(false);
      toast({
        status: 'success',
        title: 'Post created!',
        description: `Transaction id: ${tx}`,
        duration: 2000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error(error);
      // unpin 
      await unpinIPFS(response.cid);
      // remove image also
      await unpinIPFS(imageData.cid);
      
      toast({
        status: 'error',
        title: 'Post creation failed',
        description: `${error.message}`,
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
    // dispatchEvent()
  }

  const handleImage = async (e) => {
      const [file] = e.target.files;
      //dispatchEvent('SET_NEW_IMAGE', e.target.files[0]);
      let ret = await pinFileToIPFS(file);
      console.log(ret);
      setImageData({url: ret.url, cid: ret.cid});
  };

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
          onClick={() => fileRef.current.click()}
        />
        <Input
          ref={fileRef}
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleImage}
          size="lg"
          display="none"
        />
      </HStack>
      {loading && <Spinner></Spinner>}
    </Box>
  );
}

export default CreateBantBox;
