import { useState } from "react";
import { userLogin } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHandler = (event) => setUsername(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);
  const submitHandler = async (event) => {
     event.preventDefault()
     const data = await userLogin (username, password)
     console.log("User logged in", data);

  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>
          <h1>Username</h1>
        </label>
        <input
          type="text"
          value={username}
          placeholder="username"
          required
          onChange={usernameChangeHandler}
        />
      </div>
      <div>
        <label>
          <h1>Password</h1>
        </label>
        <input type="password" 
          value={password}
          placeholder="password"
          required
          onChange={passwordChangeHandler}
        />
      </div>
      <button type="submit"> Login </button>
    </form>
  );
}

