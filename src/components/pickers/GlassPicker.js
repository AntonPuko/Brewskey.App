// @flow

import type { Glass, QueryOptions } from 'brewskey.js-api';
import type { PickerValue } from '../../stores/PickerStore';

import * as React from 'react';
import DAOPicker from './DAOPicker';
import { GlassStore } from '../../stores/DAOStores';
import LoaderRow from '../../common/LoaderRow';
import SelectableListItem from '../../common/SelectableListItem';

type Props = {|
  error?: ?string,
  multiple?: boolean,
  onChange: (value: PickerValue<Glass>) => void,
  queryOptions?: QueryOptions,
  value: PickerValue<Glass>,
|};

class GlassPicker extends React.Component<Props> {
  _renderRow = ({ item: row, isSelected, toggleItem }) => (
    <LoaderRow
      isSelected={isSelected}
      loadedRow={LoadedRow}
      loader={row.loader}
      toggleItem={toggleItem}
    />
  );

  render() {
    return (
      <DAOPicker
        {...this.props}
        daoStore={GlassStore}
        headerTitle="Select Glass"
        label="Glass"
        renderRow={this._renderRow}
        stringValueExtractor={(glass: Glass): string => glass.name}
      />
    );
  }
}

// todo annotate better
const LoadedRow = ({ item: glass, isSelected, toggleItem }: Object) => (
  <SelectableListItem
    hideChevron
    isSelected={isSelected}
    item={glass}
    title={glass.name}
    toggleItem={toggleItem}
  />
);

export default GlassPicker;