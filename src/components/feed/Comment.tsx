import { styled } from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
export const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface IComment {
  id?: number;
  author?: {
    username: string;
    avatar: string;
  };
  payload?: string;
  children?: React.ReactNode;
}

function Comment({ id, author, payload, children }: IComment) {
  return (
    <CommentContainer>
      <FatText>{author?.username}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
