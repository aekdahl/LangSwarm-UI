import React from "react";
import styled, { keyframes } from "styled-components";

// Pulsating dots animation
const dots = keyframes`
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
`;

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 10px;
  margin: 5px;
  font-size: 1rem;
  color: #007bff;
`;

const Dots = styled.span`
  &:after {
    display: inline-block;
    animation: ${dots} 1.5s steps(3, end) infinite;
    content: '...';
  }
`;

const LoadingIndicator = ({ isUser }) => (
  <IndicatorWrapper isUser={isUser}>
    <Dots />
  </IndicatorWrapper>
);

export default LoadingIndicator;
