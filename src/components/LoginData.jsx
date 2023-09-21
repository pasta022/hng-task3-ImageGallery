import React, { useState } from "react";
import styled from "styled-components";
import background from "../background/backgroundImg.jpg";
import { mobile } from "../responsive";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  opacity: 0.6;
`;

const FormContainer = styled.div`
  z-index: 99;
  width: 30%;
  padding: 20px;
  background-color: whitesmoke;

  ${mobile({
    width: "75%",
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin: 5px;
  display: ${(props) => (props.error ? "block" : "none")};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1d1d1d;
  }
`;

const LoginData = () => {
  // component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //user credentials
  // const userEmail = "user@example.com";
  // const userPassword = "1Password";

  //   createUserWithEmailAndPassword(auth, userEmail, userPassword)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // occurs when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged in");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <Container>
      <Background />
      <FormContainer>
        <Title>LOG IN</Title>
        <ErrorMessage error={error}>
          Wrong Email or Password. Try Again!!
        </ErrorMessage>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
            <Button type="submit">LOG IN</Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginData;
