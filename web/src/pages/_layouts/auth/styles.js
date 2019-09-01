import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #22202c 0%, #402845 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    input {
      opacity: 0.2;
      background: #000000;
      border-radius: 4px;
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0px 20px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    span {
      color: red;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
    }
    button {
      margin: 15px 0 0;
      height: 50px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      margin-top: 20px;
      font-size: 16px;
      opacity: 0.6;
      font-weight: bold;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
