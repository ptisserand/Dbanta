import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import customTheme from './styles/customTheme';
import PostsProvider from './context/PostsContext';
import ScrollToTop from './components/utils/ScrollToTop';
import './styles/globals.css';
import Home from './pages/Home';
import AuthProvider from './context/AuthContext';
import SinglePostWithImage from './components/Posts/SinglePostWithImage';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <PostsProvider>
          <Box bg="gray.50" minH="100vh">
            <BrowserRouter>
              <ScrollToTop>
                <Header />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/" element={<Home />}>
                    <Route path={'/banta/:idOrSlug'} element={<Home />} />
                  </Route>
                  <Route
                    path={'/banta/:idOrSlug/photo'}
                    element={<SinglePostWithImage />}
                  />
                </Routes>
              </ScrollToTop>
            </BrowserRouter>
          </Box>
        </PostsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
