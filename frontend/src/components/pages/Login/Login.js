import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../store/contexts/auth";

import { Input } from "../../atoms";

import "./Login.scss";

export default function Login() {
  const { state: authState, actions } = useContext(AuthContext);
  const history = useHistory();

  if (authState.isAuthenticated) {
    history.push("/admin");
  }

  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValues = {
      username: formUsername,
      password: formPassword,
    };

    actions.login(formValues);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h3>Admin login</h3>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(event) => setFormUsername(event.target.value)}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setFormPassword(event.target.value)}
        />

        <Input type="submit"></Input>
      </form>
    </div>
  );
}
