// @flow

import type {
  Beverage,
  BeverageMutator,
  EntityID,
  LoadObject,
} from 'brewskey.js-api';
import type { Navigation } from '../types';

import * as React from 'react';
import nullthrows from 'nullthrows';
import InjectedComponent from '../common/InjectedComponent';
import { computed } from 'mobx';
import { observer } from 'mobx-react/native';
import DAOApi from 'brewskey.js-api';
import { BeverageStore, waitForLoaded } from '../stores/DAOStores';
import ErrorScreen from '../common/ErrorScreen';
import { errorBoundary } from '../common/ErrorBoundary';
import LoaderComponent from '../common/LoaderComponent';
import Container from '../common/Container';
import Header from '../common/Header';
import flatNavigationParamsAndScreenProps from '../common/flatNavigationParamsAndScreenProps';
import BeverageForm from '../components/BeverageForm';
import SnackBarStore from '../stores/SnackBarStore';

type InjectedProps = {|
  id: EntityID,
  navigation: Navigation,
|};

@errorBoundary(<ErrorScreen showBackButton />)
@flatNavigationParamsAndScreenProps
@observer
class EditBeverageScreen extends InjectedComponent<InjectedProps> {
  @computed
  get _beverageLoader(): LoadObject<Beverage> {
    return BeverageStore.getByID(this.injectedProps.id);
  }

  _onFormSubmit = async (values: BeverageMutator): Promise<void> => {
    DAOApi.BeverageDAO.put(nullthrows(values.id), values);
    await waitForLoaded(() => this._beverageLoader);
    this.injectedProps.navigation.goBack(null);
    SnackBarStore.showMessage({ text: 'The beverage edited.' });
  };

  render() {
    return (
      <Container>
        <Header showBackButton title="Edit beverage" />
        <LoaderComponent
          loadedComponent={LoadedComponent}
          loader={this._beverageLoader}
          onFormSubmit={this._onFormSubmit}
          updatingComponent={LoadedComponent}
        />
      </Container>
    );
  }
}

type LoadedComponentProps = () => {
  onFormSubmit: (values: BeverageMutator) => void,
  value: Beverage,
};

const LoadedComponent = ({ onFormSubmit, value }: LoadedComponentProps) => (
  <BeverageForm
    beverage={value}
    onSubmit={onFormSubmit}
    submitButtonLabel="Edit beverage"
  />
);

export default EditBeverageScreen;
