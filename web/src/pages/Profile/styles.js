import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.2);
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
    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
    div {
      display: flex;
      justify-content: flex-end;

      button {
        padding: 12px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0 0;
        background: #f94d6a;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#F94D6A')};
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;
