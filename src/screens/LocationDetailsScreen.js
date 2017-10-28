// @flow

import type { Location } from 'brewskey.js-api';
import type DAOEntityStore from '../stores/DAOEntityStore';

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Text, View } from 'react-native';
import flatNavigationParamsAndScreenProps from '../common/flatNavigationParamsAndScreenProps';

type Props = {|
  id: string,
  locationStore: DAOEntityStore<Location, Location>,
  navigation: Object,
|};

@flatNavigationParamsAndScreenProps
@inject('locationStore')
@observer
class LocationDetailsScreen extends React.Component<Props> {
  // todo find types for navigationOptions
  static navigationOptions = ({ navigation }: Object): Object => ({
    title:
      navigation.state.params.location && navigation.state.params.location.name,
  });

  componentDidMount() {
    // todo with this solution title on header appears after some lag :/
    const { locationStore, id, navigation } = this.props;
    navigation.setParams({ location: locationStore.getByID(id) });
  }

  render(): React.Node {
    const location = this.props.locationStore.getByID(this.props.id);
    // todo prettify and move content to separate component
    return (
      <View>
        <Text>{location.name}</Text>
        <Text>{location.description}</Text>
      </View>
    );
  }
}

export default LocationDetailsScreen;
