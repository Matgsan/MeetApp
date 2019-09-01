import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  background-color: #ffff;
  flex: 1;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const Content = styled.View`
  padding: 20px;
`;
export const Banner = styled.Image`
  height: 150px;
`;
export const Title = styled.Text``;

export const ActionButton = styled(Button)`
  margin-top: 15px;
  background-color: ${props => (props.subscribed ? '#D44059' : '#F94D6A')};
`;
