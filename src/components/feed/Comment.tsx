import { styled } from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";

const CommentContainer = styled.div``;
export const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
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
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link key={index} to={`/hashtags/${word}`}>
                {word}{" "}
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
