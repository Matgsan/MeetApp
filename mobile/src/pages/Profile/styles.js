import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;
export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 20 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 5px;
  background-color: #e5556e;
`;
export const LogoutButton = styled(Button)`
  align-self: stretch;
  margin-top: 10px;
  background: #d44059;
`;
