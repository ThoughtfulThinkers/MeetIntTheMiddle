import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from '../../common';

class GuestListItem extends Component {
  render() {
    const { name } = this.props.guest;
    return (
      <CardSection style={{ justifyContent: 'center' }}>
        <Text style={styles.titleStyle}>
          {name}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
};

export default GuestListItem;