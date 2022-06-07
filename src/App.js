import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import customTheme from './styles/customTheme';
import PostsProvider from './context/PostsContext';
import ScrollToTop from './components/utils/ScrollToTop';
import './styles/globals.css';
import Home from './pages/Home';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <PostsProvider>
        <Box bg="gray.50" minH="100vh">
          <BrowserRouter>
            <ScrollToTop>
              <Header />
              <Routes>
                <Route path={'/'} element={<Home />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </Box>
      </PostsProvider>
    </ChakraProvider>
  );
}

export default App;
