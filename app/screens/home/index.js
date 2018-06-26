import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import ProgressCard from 'app/components/ProgressCard';
import HistoryCard from 'app/components/HistoryCard';
import TodayCard from 'app/components/TodayCard';

class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          {!isEmpty(this.props.subscription) && <TodayCard />}
          <ProgressCard />
          <HistoryCard />
        </Content>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Word Bank',
};

const mapStateToProps = state => ({
  subscription: state.subscription,
  rehydrated: state.rehydrated,
});

export default connect(mapStateToProps)(HomeScreen);
