import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  background-color: #ffff;
  flex: 1;
  margin-bottom: 20px;
  border-radius: 4px;
  height: 345px;
`;

export const Content = styled.View`
  padding: 20px;
  height: 195px;
`;
export const Banner = styled.Image.attrs({
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
})`
  height: 150px;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ActionButton = styled(Button)`
  height: 40px;
  margin-top: 15px;
  background-color: ${props => (props.subscribed ? '#D44059' : '#F94D6A')};
`;
