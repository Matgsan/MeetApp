import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Text } from './styles';

export default function Detail({ style, icon, children }) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={15} color="#999999" />}
      <Text>{children}</Text>
    </Container>
  );
}

Detail.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  style: PropTypes.arrayOf(PropTypes.shape()),
};
Detail.defaultProps = {
  icon: false,
  style: [],
};
