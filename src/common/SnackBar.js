// @flow

import type { SnackBarMessage } from '../stores/SnackBarStore';

import * as React from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../theme';
import SnackBarStore from '../stores/SnackBarStore';

const ENTER_ANIMATION_DURATION = 200;
const EXIT_ANIMATION_DURATION = 200;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 49,
    height: 60,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 12,
    position: 'absolute',
    width: 300,
  },
  text: {
    color: COLORS.textInverse,
    textAlign: 'center',
  },
});

@observer
class SnackMessage extends React.Component<{}> {
  state = {
    bottomAnimValue: new Animated.Value(-60),
  };

  constructor(props) {
    super(props);

    reaction(
      () => SnackBarStore.currentMessage,
      (currentMessage: ?SnackBarMessage) => {
        if (currentMessage) {
          Animated.sequence([
            Animated.timing(this.state.bottomAnimValue, {
              duration: ENTER_ANIMATION_DURATION,
              toValue: 0,
            }),
            Animated.timing(this.state.bottomAnimValue, {
              delay:
                currentMessage.duration -
                ENTER_ANIMATION_DURATION -
                ENTER_ANIMATION_DURATION,
              duration: EXIT_ANIMATION_DURATION,
              toValue: -60,
            }),
          ]).start(({ finished }: { finished: boolean }) => {
            finished && SnackBarStore.dropCurrentMessage();
          });
        }
      },
    );
  }

  _onMessagePress = () => {
    Animated.timing(this.state.bottomAnimValue, {
      duration: EXIT_ANIMATION_DURATION,
      toValue: -60,
    }).start(SnackBarStore.dropCurrentMessage);
  };

  render() {
    return (
      <View pointerEvents="box-none" style={styles.container}>
        <TouchableWithoutFeedback onPress={this._onMessagePress}>
          <Animated.View
            style={[
              styles.messageContainer,
              { bottom: this.state.bottomAnimValue },
            ]}
          >
            {SnackBarStore.currentMessage && (
              <Text numberOfLines={1} style={styles.text}>
                {SnackBarStore.currentMessage.text}
              </Text>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default SnackMessage;