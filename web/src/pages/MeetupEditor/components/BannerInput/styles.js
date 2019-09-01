import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  max-width: 940px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    svg {
      opacity: 0.3;
    }
    img {
      height: 100%;
      width: 100%;
    }
    p {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      opacity: 0.3;
    }
    input {
      display: none;
    }
  }
`;
