import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import { CardItem, Text, Grid, Row, Col, Button } from 'native-base';
import PropTypes from 'prop-types';
import { oxfordAPI } from 'app/http';
import constants from 'app/constants';
import { prettyDefinition, prettyTranslation } from 'app/utils';

class WordCard extends PureComponent {
  state = {
    loadingAudio: false,
  };
  static propTypes = {
    viewed: PropTypes.bool,
    word: PropTypes.string.isRequired,
    phonetic: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    definition: PropTypes.string,
  };
  static defaultProps = {
    viewed: false,
    definition: '',
  };
  playSound = () => {
    if (this.state.loadingAudio) return;
    if (!this.sound) {
      this.getAudio();
      return;
    }
    this.sound.play();
  };
  audioError = (error) => {
    console.log(error);
    Alert.alert('音频错误', '当前无法播放音频', [{ text: '好', onPress: () => {} }]);
  };
  getAudio = () => {
    this.setState({ loadingAudio: true });
    oxfordAPI.get(constants.api.oxford.url.replace('{WORD}', this.props.word))
      .then((response) => {
        const url = response.data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
        if (!url.endsWith('.mp3')) return;
        this.sound = new Sound(url, null, (error) => {
          if (error) {
            this.audioError(error);
          } else {
            this.sound.play();
          }
        });
      })
      .catch(e => console.log(e))
      .finally(() => this.setState({ loadingAudio: false }));
  };
  render() {
    return (
      <CardItem bordered style={{ flex: 1 }}>
        <Grid>
          <Row style={{ flex: 0 }}>
            <Col style={{ flex: 1 }} />
            <Col style={{ flex: 0 }}>
              {this.props.viewed && <Icon name="ios-checkmark-circle" color="teal" size={24} />}
            </Col>
          </Row>
          <Row style={{ flex: 2 }}>
            <Col>
              <Text style={material.display1}>{this.props.word}</Text>
              <Row>
                <Col>
                  <Text style={material.caption}>{this.props.phonetic}</Text>
                </Col>
                <Col style={{ flex: 0 }}>
                  <Button
                    transparent
                    icon
                    disabled={this.state.loadingAudio}
                    onPress={this.playSound}
                  >
                    <Icon name="ios-volume-up" color="grey" size={24} />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ flex: 2 }}>
            <Text style={material.subheading}>{prettyTranslation(this.props.translation)}</Text>
          </Row>
          <Row style={{ flex: 2 }}>
            <Text style={material.body2}>{prettyDefinition(this.props.definition)}</Text>
          </Row>
        </Grid>
      </CardItem>
    );
  }
}

export default WordCard;
