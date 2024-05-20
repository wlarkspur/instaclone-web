import { styled } from "styled-components";
import { IFeedPhoto } from "./Photo";
import { FatText } from "../shared";
import Comment, { CommentCaption } from "./Comment";

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

function Comments({ author, caption, commentNumber, comments }: IComments) {
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
    </CommentsContainer>
  );
}

export default Comments;
