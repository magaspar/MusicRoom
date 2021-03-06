import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, Image, Animated, Dimensions,
} from 'react-native';
import { Icon } from 'native-base';
import SeekBar from '../AdminPlayer/SeekBar';
import { Colors, Typography } from '../../styles';

export default class MiniPlayer extends React.Component {
  constructor(props) {
    super(props);
    this._reduced = new Animated.Value(0);
    this.state = {
      active: true,
    };
  }

  onPressReduceButton = () => {
    const { active } = this.state;
    if (active) {
      Animated.timing(this._reduced, {
        duration: 300,
        toValue: Dimensions.get('window').width - 35,
      }).start();
    } else {
      Animated.timing(this._reduced, {
        duration: 300,
        toValue: 0,
      }).start();
    }
    this.setState({ active: !active });
  };

  seek(time) {
    const { audioElement, setCurrentPosition, paused } = this.props;
    const newTime = Math.round(time);

    if (audioElement) {
      audioElement.seek(newTime);
    }
    setCurrentPosition(newTime);
    paused(false);
  }

  render() {
    const {
      handlePress, cover, details, totalLength, onForward,
      onPressPause, onPressPlay, currentPosition, isPaused, paused,
    } = this.props;
    const { active } = this.state;
    this._onSeek = this.seek.bind(this);
    let reduceArrow = 'ios-arrow-back';
    if (active) reduceArrow = 'ios-arrow-forward';
    return (
      <Animated.View style={[styles.mainContainer, { transform: [{ translateX: this._reduced }] }]}>
        <TouchableOpacity
          style={[styles.reduceButton, Typography.iconWrapper]}
          onPress={this.onPressReduceButton}
        >
          <Icon
            name={reduceArrow}
            style={Typography.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainTouchable} onPress={handlePress} activeOpacity={1}>
          <View style={styles.upContainer}>
            <View style={styles.coverContainer}>
              {cover}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={{ fontSize: 16, color: 'white' }}>
                {details.artist.toUpperCase()}
              </Text>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {details.title}
              </Text>
            </View>
            <View style={styles.controls}>
              {!isPaused
                ? (
                  <TouchableOpacity onPress={onPressPause}>
                    <View style={styles.playButton}>
                      <Image source={require('../../assets/images/ic_pause_white_48pt.png')} />
                    </View>
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity onPress={onPressPlay}>
                    <View style={styles.playButton}>
                      <Image source={require('../../assets/images/ic_play_arrow_white_48pt.png')} />
                    </View>
                  </TouchableOpacity>
                )}
              <View style={{ width: 20 }} />
              <TouchableOpacity
                onPress={() => onForward()}
                disabled={false}
              >
                <Image
                  style={{ opacity: 0.3 }}
                  source={require('../../assets/images/ic_skip_next_white_36pt.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.downContainer}>
            <SeekBar
              onSeek={this._onSeek}
              trackLength={totalLength}
              onSlidingStart={() => paused(true)}
              currentPosition={currentPosition}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
  },
  reduceButton: {
    width: 35,
    height: 70,
    backgroundColor: Colors.miniplayer,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: Colors.lightGreen,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  mainTouchable: {
    height: 140,
    width: Dimensions.get('window').width - 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.miniplayer,
    borderColor: Colors.lightGreen,
    flexDirection: 'column',
  },
  coverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    height: 50,
    width: 50,
  },
  detailsContainer: {
    flex: 3,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controls: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downContainer: {
    width: '100%',
  },
});
