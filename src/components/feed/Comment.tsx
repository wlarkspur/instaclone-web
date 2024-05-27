import { keyframes, styled } from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DELETE_COMMENT_MUTAION = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const vibration = keyframes`
  0% { transform: translate(0.2px, 0.2px) rotate(0deg); }
  10% { transform: translate(-0.2px, -0.5px) rotate(-0.2deg); }
  20% { transform: translate(-0.5px, 0px) rotate(0.2deg); }
  30% { transform: translate(0.5px, 0.5px) rotate(0deg); }
  40% { transform: translate(0.2px, -0.2px) rotate(0.2deg); }
  50% { transform: translate(-0.2px, 0.5px) rotate(-0.2deg); }
  60% { transform: translate(-0.5px, 0.2px) rotate(0deg); }
  70% { transform: translate(0.5px, 0.2px) rotate(-0.2deg); }
  80% { transform: translate(-0.2px, -0.2px) rotate(0.2deg); }
  90% { transform: translate(0.2px, 0.5px) rotate(0deg); }
  100% { transform: translate(0.2px, -0.5px) rotate(-0.2deg); }
  
`;

const Xbutton = styled.div`
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    animation: ${vibration} 0.4s infinite;
  }
`;

const CommentContainer = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
`;
export const CommentCaption = styled.span`
  font-weight: 600;
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
  photoId?: number;
  author?: {
    username: string;
    avatar: string;
  };
  payload: string;
  isMine?: boolean;
  children?: React.ReactNode;
}

function Comment({ id, photoId, author, payload, isMine }: IComment) {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTAION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
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
      {isMine ? (
        <Xbutton onClick={onDeleteClick}>
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "red", fontSize: "15px" }}
          />
        </Xbutton>
      ) : null}
    </CommentContainer>
  );
}

export default Comment;
