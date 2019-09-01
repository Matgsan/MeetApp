import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const DateSelector = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 30px 0px;
`;
export const DateText = styled.Text`
  font-size: 20px;
  color: #ffff;
  font-weight: bold;
  margin: 0px 15px;
`;
export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 20,
    paddingTop: 0,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Empty = styled.Text`
  align-self: center;
  font-size: 16px;
  color: #9999;
  font-weight: bold;
`;
