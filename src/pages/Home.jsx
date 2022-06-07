import {
  Box,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import CreateBantBox from '../components/Home/CreateBantBox';
import PostList from '../components/Home/PostList';
import UserCard from '../components/Home/UserCard';
import WrapContent from '../layout/WrapContent';

function Home() {
  return (
    <Box>
      <WrapContent>
        <HStack
          spacing={[0, 0, 8, 8]}
          alignItems="flexStart"
          justifyContent={'space-between'}
          h="calc(100vh - 81px)"
          position="relative"
          overflow="auto"
        >
          <Stack
            py="20px"
            id="main"
            spacing="5"
            w={['100%', '100%', '70%', '80%']}
            as="main"
            h="full"
            overflow="scroll"
          >
            <CreateBantBox />
            <PostList />
          </Stack>
          <Box
            w={['0', '0', '35%', '30%']}
            display={['none', 'none', 'block', 'block']}
            alignSelf={'flex-start'}
            as="sidebar"
            pos="sticky"
            top="0px"
            h="full"
            bg="white"
            p="4"
          >
            <Stack spacing={'5'}>
              <FormControl>
                <Input
                  rounded="full"
                  placeholder="Search banta communities"
                  _placeholder={{ fontSize: 'sm' }}
                  bg="gray.200"
                />
              </FormControl>
              <Heading
                letterSpacing={'wide'}
                as="h4"
                fontSize={['17px']}
                fontWeight={'bold'}
              >
                Find Bantamates
              </Heading>
              <Stack spacing="3">
                <UserCard name="Dominic Toretto" username="dominic" />
                <UserCard name="Doctor Strange" username="strange" />
                <UserCard name="Wanda Twins" username="miss_wangdu" />
                <UserCard name="Eel on Mosque" username="whaaaat?" />
              </Stack>
              <Footer />
            </Stack>
          </Box>
        </HStack>
      </WrapContent>
    </Box>
  );
}

export default Home;
