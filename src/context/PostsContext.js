import React, { useEffect, useState } from 'react';
import { useACtx } from './AuthContext';


const PostsContext = React.createContext({});

export const usePCtx = () => {
  return React.useContext(PostsContext);
};
const PostsProvider = ({ children }) => {
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { isAuth, contract } = useACtx();

  const fetchPostsAPI = async () => {
    if (contract !== undefined) {
      setLoading(true);
      const posts = await contract.fetchPosts(isAuth);
      setPosts(posts);
      setLoading(false);
    }
  }

  const dispatchEvent = (actionType, payload) => {
    switch (actionType) {
      case 'SET_ACTIVE_POST':
        setActivePost(payload);
        return;

      case 'SET_ALL_POSTS':
        setPosts(payload);
        return;
      case 'SET_NEW_POST':
        setPosts(prev => [payload, ...prev]);
        setImage(null);
        setPosted(true);
        return;
      case 'SET_NEW_IMAGE':
        setImage(payload);
        return;
      case 'SET_POSTED':
        setPosted(payload);
        return;

      default:
        return;
    }
  };


  useEffect(() => {
    fetchPostsAPI();
  }, [isAuth, contract]);

  return (
    <PostsContext.Provider
      value={{ posts, posted, image, activePost, dispatchEvent }}
    >
      {children}
    </PostsContext.Provider>
  );
};
export default PostsProvider;
