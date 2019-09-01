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

    a {
      padding: 12px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
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

  ul {
    display: grid;
    grid-gap: 10px;
    margin-top: 50px;
    li {
      padding: 20px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      strong {
        margin-left: 10px;
        display: block;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
      div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        span {
          opacity: 0.6;
          display: block;
          font-size: 16px;
          color: #fff;
          margin-right: 30px;
        }
      }
    }
  }
`;
