// @flow

// todo add LocationMutator type to the lib
import type { Location } from 'brewskey.js-api';
import type { Navigation } from '../types';
import type DAOEntityStore from '../stores/DAOEntityStore';

import * as React from 'react';
import InjectedComponent from '../common/InjectedComponent';
import { inject } from 'mobx-react';
import LocationForm from '../components/LocationForm';

type InjectedProps = {|
  navigation: Navigation,
  locationStore: DAOEntityStore<Location, Location>,
|};

@inject('locationStore')
class NewLocationScreen extends InjectedComponent<InjectedProps> {
  static navigationOptions = {
    title: 'New location',
  };

  _onFormSubmit = async (values: Location): Promise<void> => {
    const { locationStore, navigation } = this.injectedProps;
    const { id } = await locationStore.post(values);
    // todo figure out how to replace page instead adding to stack history
    // the navigation object injected in the component
    // doesn't have reset function.
    navigation.navigate('locationDetails', { id });
  };

  render(): React.Node {
    return (
      <LocationForm
        onSubmit={this._onFormSubmit}
        submitButtonLabel="Create location"
      />
    );
  }
}

export default NewLocationScreen;
