import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePCtx } from '../../context/PostsContext';

function SinglePostWithImage() {
  const { idOrSlug } = useParams();
  const { activePost, dispatchEvent, posts } = usePCtx();
  const [post, setPost] = useState(activePost);
  const [loading, setLoading] = useState(null);

  const fetchPost = useCallback(() => {
    setLoading(true);
    let p = posts.filter(p => p.id === idOrSlug)[0];

    setPost(p);
    dispatchEvent('SET_ACTIVE_POST', p);
    setLoading(false);
  }, [posts, idOrSlug, dispatchEvent]);

  useEffect(() => {
    activePost && setPost(activePost);
    !activePost && fetchPost();
  }, [activePost, fetchPost]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && post && <>ppvvst</>}
    </div>
  );
}

export default SinglePostWithImage;
