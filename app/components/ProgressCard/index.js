import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Card, CardItem, Text, Button, Grid, Row, Col } from 'native-base';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { getBookProgress } from 'app/selectors';
import { getETA, shortISO } from 'app/utils';


class ProgressCard extends PureComponent {
  render() {
    const deviceWidth = Dimensions.get('window').width;
    const pieSize = deviceWidth / 2;
    let body;
    let buttonText;
    const { bookId, quota } = this.props.subscription;
    if (!bookId || !quota) {
      body = (
        <Grid>
          <Row height={150}>
            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.title}>
                您还没有制订背诵计划
              </Text>
            </Col>
          </Row>
        </Grid>
      );
      buttonText = '去设置计划';
    } else {
      const { size = 0, viewedCount = 0 } = this.props.books.find(b => b.id === bookId) || {};
      const remaining = Math.max(0, size - viewedCount);
      const pieData = [
        { x: 1, y: viewedCount, label: ' ' },
        { x: 2, y: remaining, label: ' ' },
      ];
      const eta = getETA(remaining, quota);
      body = (
        <Grid>
          <Row>
            <Col style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
              <VictoryPie
                theme={VictoryTheme.material}
                height={pieSize}
                width={pieSize}
                padding={10}
                colorScale={['orange', 'gray']}
                padAngle={1}
                innerRadius={0.4 * pieSize}
                data={pieData}
              />
            </Col>
            <Col style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={material.caption}>已学单词数</Text>
              <Text style={material.title}>{viewedCount}</Text>
              <Text style={material.caption}>计划总单词数</Text>
              <Text style={material.title}>{size}</Text>
              <Text style={material.caption}>预计完成日期</Text>
              <Text style={material.body2}>{shortISO(eta)}</Text>
            </Col>
          </Row>
        </Grid>
      );
      buttonText = '修改计划';
    }
    return (
      <Card>
        <CardItem header bordered style={{ borderTopWidth: 2, borderTopColor: 'orange' }}>
          <Text style={material.subheading}>计划进度</Text>
        </CardItem>
        <CardItem bordered>
          {body}
        </CardItem>
        <CardItem footer bordered>
          <View style={{ flex: 1 }} />
          <Button transparent small onPress={() => this.props.navigation.push('Book')}>
            <Text>{buttonText}</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  books: getBookProgress(state),
  subscription: state.subscription,
});

export default connect(mapStateToProps)(withNavigation(ProgressCard));
