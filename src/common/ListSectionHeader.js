// @flow

import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TYPOGRAPHY, COLORS } from '../theme';

const styles = StyleSheet.create({
  header: {
    ...TYPOGRAPHY.secondary,
    backgroundColor: COLORS.secondary2,
    color: COLORS.text,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

type Props = {|
  title: string,
|};

class ListSectionHeader extends React.PureComponent<Props> {
  render() {
    return <Text style={styles.header}>{this.props.title}</Text>;
  }
}

export default ListSectionHeader;
