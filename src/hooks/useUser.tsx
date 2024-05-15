import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn, // 사용자가 LocalStorage를 통해 로그인한 경우에만 실행
  });
  console.log(data, error);
  return;
}
export default useUser;
