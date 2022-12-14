import {
  Box,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer';
import CreateBantBox from '../components/Home/CreateBantBox';
import PostList from '../components/Home/PostList';
import UserCard from '../components/Home/UserCard';
import SinglePostView from '../components/Posts/SinglePostView';
import WrapContent from '../layout/WrapContent';
import { useACtx } from '../context/AuthContext';
import { useEffect, useState } from 'react';

function Home() {
  const { isAuth, contract } = useACtx();
  const [users, setUsers] = useState([]);


  // FIXME: should be provided by smart contract
  const getSuggestedUsers = async (address) => {
    let ret = []
    for (let i = 0; i < 4; i++) {
      let user = await contract.getUser(i);
      ret.push(user);
    }
    setUsers(ret);
  }

  useEffect(() => {
    if (isAuth !== false && contract !== undefined) {
      getSuggestedUsers();
    }
  }, [contract, isAuth]);

  return (
    <Box>
      <WrapContent>
        <HStack
          spacing={[0, 0, 8, 8]}
          alignItems="flexStart"
          justifyContent={'space-between'}
          h="calc(100vh - 81px)"
          position="relative"
          overflow="hidden"
        >
          <Stack
            pt="20px"
            id="main"
            spacing="5"
            w={['100%', '100%', '70%', '80%']}
            as="main"
            h="full"
            overflow="auto"
          >
            <Routes>
              <Route exact path="/" element={<HomePostList />} />
              <Route path={'/banta/:idOrSlug'} element={<SinglePostView />} />
            </Routes>
          </Stack>

          <Box
            w={['0', '0', '35%', '30%']}
            display={['none', 'none', 'block', 'block']}
            alignSelf={'flex-start'}
            as="aside"
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
                {users && users.map((user, i) => <UserCard name={user.name} username={user.username} id={user.id} key={i} />)}
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

function HomePostList() {
  return (
    <>
      <CreateBantBox />
      <PostList />
    </>
  );
}
