import { Report } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`;

const ErrorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const StyledReport = styled(Report)`
  color: red;
  font-size: large;
`;

const ErrorMessage = styled.div`
  font-size: large;
  font-weight: 300;
`;

const Error = ({ message }) => {
  return (
    <Container>
      <ErrorContainer>
        <ErrorIcon>
          <StyledReport />
        </ErrorIcon>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorContainer>
    </Container>
  );
};

export default Error;
