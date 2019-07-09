import React, { useGlobal } from "reactn";
import SignIn from "./SignIn";

function Home(props) {
  const [authenticate] = useGlobal("authenticate");

  if (authenticate === true || authenticate === "true") {
    return <div>MyHome</div>;
  } else {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}

export default Home;
