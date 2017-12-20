// @flow

import type { EntityID, FlowSensor, FlowSensorMutator } from 'brewskey.js-api';
import type { Navigation } from '../types';

import * as React from 'react';
import nullthrows from 'nullthrows';
import { withNavigation } from 'react-navigation';
import DAOApi, { LoadObject } from 'brewskey.js-api';
import { observer } from 'mobx-react';
import InjectedComponent from '../common/InjectedComponent';
import { FlowSensorStore, waitForLoaded } from '../stores/DAOStores';
import Container from '../common/Container';
import Header from '../common/Header';
import FlowSensorForm from '../components/FlowSensorForm';
import LoaderComponent from '../common/LoaderComponent';
import flatNavigationParamsAndScreenProps from '../common/flatNavigationParamsAndScreenProps';

type InjectedProps = {|
  navigation: Navigation,
  tapId: EntityID,
|};

// todo redirect to newFlowSensorScreen or render something reasonable
// if flowSensor doesn't exist
@flatNavigationParamsAndScreenProps
@observer
class EditFlowSensorScreen extends InjectedComponent<InjectedProps> {
  render() {
    const { tapId } = this.injectedProps;
    return (
      <Container>
        <Header showBackButton title="Update tap sensor" />
        <LoaderComponent
          loader={FlowSensorStore.getMany({
            filters: [DAOApi.createFilter('tap/id').equals(tapId)],
            limit: 1,
          }).map(
            (loaders: Array<LoadObject<FlowSensor>>): LoadObject<FlowSensor> =>
              loaders[0] || LoadObject.empty(),
          )}
          loadedComponent={LoadedComponent}
        />
      </Container>
    );
  }
}

type LoadedComponentProps = {
  value: FlowSensor,
};

type InjectedLoadedComponentProps = {
  navigation: Navigation,
};

@withNavigation
@observer
class LoadedComponent extends InjectedComponent<
  InjectedLoadedComponentProps,
  LoadedComponentProps,
> {
  _onFormSubmit = async (values: FlowSensorMutator): Promise<void> => {
    const { value: initialFlowSensor } = this.props;
    const { navigation } = this.injectedProps;

    if (initialFlowSensor.flowSensorType === values.flowSensorType) {
      const id = nullthrows(values.id);
      DAOApi.FlowSensorDAO.put(id, values);
      await waitForLoaded(() => FlowSensorStore.getByID(id));
    } else {
      DAOApi.FlowSensorDAO.post(values);
      // todo fix: if I wait for loading I get a warning about
      // updating state during rendering
      // probably related with observables
      // https://github.com/mobxjs/mobx-react#faq
      // await waitForLoaded(() => FlowSensorStore.getByID(clientID));
    }

    navigation.goBack();
  };

  render() {
    const { value } = this.props;

    return (
      <FlowSensorForm
        flowSensor={value}
        onSubmit={this._onFormSubmit}
        tapId={value.tap.id}
      />
    );
  }
}

export default EditFlowSensorScreen;