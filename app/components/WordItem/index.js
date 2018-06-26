import React, { PureComponent } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, Left, Body, Right, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';

class WordItem extends PureComponent {
  static propTypes = {
    word: PropTypes.string.isRequired,
    isViewed: PropTypes.bool.isRequired,
    navigatable: PropTypes.bool,
    onPress: PropTypes.func,
    isMistaken: PropTypes.bool,
  };
  static defaultProps = {
    navigatable: true,
    onPress: Function.prototype,
    isMistaken: false,
  };
  render() {
    const icon = this.props.isMistaken ? 'clear' : 'check';
    const color = this.props.isMistaken ? 'red' : 'teal';
    return (
      <ListItem icon onPress={this.props.onPress}>
        <Left>
          <MaterialIcon name={icon} style={{ color: this.props.isViewed ? color : 'grey' }} />
        </Left>
        <Body>
          <Text>{this.props.word}</Text>
        </Body>
        <Right>
          {this.props.navigatable && (<Icon name="arrow-forward" />)}
        </Right>
      </ListItem>
    );
  }
}

export default WordItem;
