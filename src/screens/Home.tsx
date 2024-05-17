import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";

function Home() {
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out</button>
    </div>
  );
}
export default Home;
