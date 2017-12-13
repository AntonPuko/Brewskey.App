// @flow

import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  children?: React.Node,
  style?: Object,
};

const Container = ({ children, style }: Props) => (
  <View style={[styles.container, style]}>{children}</View>
);

export default Container;