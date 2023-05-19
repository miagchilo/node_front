import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`)
    .then( res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(error => {
      console.warn(error);
      alert('err');
    });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isEditable
      >
      <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "stas",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "test",
          },
          {
            user: {
              fullName: "stas",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "test",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};