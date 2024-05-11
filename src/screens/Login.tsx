import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "./routes";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const { register, watch, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data, "valid");
  };
  const onInvalid = (data: any) => {
    console.log(data, "Invalid");
  };
  return (
    <AuthLayout>
      <Helmet>
        <title>Log in | InstaClone</title>
      </Helmet>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: 5,
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account? Sign up"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}
export default Login;
