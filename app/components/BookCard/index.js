import React, { PureComponent } from 'react';
import { material } from 'react-native-typography';
import { Card, CardItem, Body, Right, Text, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';

class BookCard extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    isCurrent: PropTypes.bool,
    viewedCount: PropTypes.number,
    jump: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isCurrent: false,
    viewedCount: 0,
  };
  render() {
    return (
      <Card>
        <CardItem header style={{ borderTopWidth: 2, borderTopColor: 'teal' }}>
          <Body>
            <Text style={material.title}>
              {this.props.name}
            </Text>
          </Body>
          {this.props.isCurrent && (
            <Right>
              <Text style={material.caption}>当前背诵</Text>
              <Icon name="checkmark" style={{ color: 'teal' }} />
            </Right>
          )}
        </CardItem>
        <CardItem bordered>
          <Body style={{ alignItems: 'center' }}>
            <Text style={material.subheading}>已学单词 / 总单词数</Text>
            <Text style={material.headline}>
              {`${this.props.viewedCount} / ${this.props.size}`}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Body />
          <Right>
            <Button transparent small onPress={() => this.props.jump()}>
              <Text>{this.props.isCurrent ? '更改计划' : '订阅'}</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default BookCard;
