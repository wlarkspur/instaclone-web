import { styled } from "styled-components";
import { FatText } from "../shared";
import Comment, { CommentCaption } from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  margin: 10px 0;
  display: block;
  opacity: 0.7;
  font-weight: 600;
  font-size: 12px;
`;

interface IComments {
  photoId: number;
  author: {
    username: string;
    avatar: string;
  };
  caption: string;
  commentNumber: number;
  comments: [
    {
      id: number;
      user: {
        username: string;
        avatar: string;
      };
      payload: string;
      isMine: boolean;
      createdAt: string;
    }
  ];
}

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: IComments) {
  const { data: userData } = useUser();
  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      console.log(newCacheComment);
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    }) /* .catch((error) => {
      console.error("Error Creating comment:", error);
    }) */;
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1
          ? "1 comment"
          : commentNumber === 0
          ? "0 comment"
          : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user}
          payload={comment.payload}
          isMine={comment.isMine}
        >
          <FatText>{comment.user.username}</FatText>
          <CommentCaption>{comment.payload}</CommentCaption>
        </Comment>
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment"
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
