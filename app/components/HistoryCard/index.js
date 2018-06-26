import React, { PureComponent } from 'react';
import { Card, CardItem, Text, Grid, Row, Col } from 'native-base';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { getHistory } from 'app/selectors';
import { Dimensions } from 'react-native';

class HistoryCard extends PureComponent {
  render() {
    const sampleData = [
      { x: '180617', y: 32 },
      { x: '180618', y: 5 },
      { x: '180619', y: 40 },
      { x: '180620', y: 40 },
      { x: '180621', y: 20 },
      { x: '180622', y: 50 },
      { x: '180623', y: 10 },
      { x: '180624', y: 6 },
    ];
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Card>
        <CardItem header bordered style={{ borderTopWidth: 2, borderTopColor: 'dimgray' }}>
          <Text style={material.subheading}>学习历史</Text>
        </CardItem>
        <CardItem cardBody bordered>
          <Grid>
            {this.props.history.length === 0 ? (
              <Row height={100}>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={material.title}>暂无历史数据</Text>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <VictoryChart
                    width={deviceWidth - 20}
                    padding={{
                      left: 30, right: 30, top: 40, bottom: 40,
                    }}
                  >
                    <VictoryBar
                      padding={0}
                      data={sampleData}
                      labels={d => d.y}
                      style={{
                        data: { fill: '#295cc4' },
                      }}
                    />
                    <VictoryAxis
                      fixLabelOverlap
                    />
                  </VictoryChart>
                  <Text style={material.caption}>日背诵单词数量</Text>
                </Col>
              </Row>
            )}
          </Grid>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  history: getHistory(state),
});

export default connect(mapStateToProps)(HistoryCard);
