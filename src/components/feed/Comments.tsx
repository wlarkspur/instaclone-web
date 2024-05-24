import { styled } from "styled-components";
import { IFeedPhoto } from "./Photo";
import { FatText } from "../shared";
import Comment, { CommentCaption } from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
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
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { register, handleSubmit, setValue } = useForm();
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
    });
    setValue("payload", "");
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
          author={comment.user}
          payload={comment.payload}
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
