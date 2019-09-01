import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 32;
      color: #ffff;
    }
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      button {
        padding: 12px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #d44059;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#D44059')};
        }
        svg {
          margin-right: 10px;
        }
      }
      a {
        margin-right: 15px;
        padding: 12px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #4dbaf9;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#4DBAF9')};
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 50px;
  img {
    width: 100%;
    height: 300px;
  }
  p {
    display: block;
    margin-top: 25px;
    color: #ffff;
    line-height: 32px;
    font-size: 18px;
    text-align: left;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 30px;
      svg {
        margin-right: 10px;
      }
    }
  }
`;
