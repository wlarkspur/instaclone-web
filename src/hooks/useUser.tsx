import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import routes from "../screens/routes";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken, // 사용자가 LocalStorage를 통해 로그인한 경우에만 실행
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
export default useUser;
