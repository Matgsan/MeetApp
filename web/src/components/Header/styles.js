import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0px 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
    }
  }
  aside {
    display: flex;
    align-items: center;

    button {
      padding: 12px 30px;
      background: #d44059;
      border-radius: 4px;
      border: 0;
      font-size: 16px;
      font-weight: bold;
      color: white;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-right: 30px;
  div {
    text-align: right;
    strong {
      display: block;
      color: #ffff;
    }
    a {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      color: #999;
    }
  }
`;
