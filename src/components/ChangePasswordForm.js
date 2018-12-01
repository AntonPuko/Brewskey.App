// @flow

import type { FormProps } from '../common/form/types';

import * as React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import AuthApi from '../AuthApi';
import InjectedComponent from '../common/InjectedComponent';
import { FormValidationMessage } from 'react-native-elements';
import { form, FormField } from '../common/form';
import SectionContent from '../common/SectionContent';
import TextField from '../components/TextField';
import Button from '../common/buttons/Button';

export type ChangePasswordFormFields = {|
  newPassword: string,
  oldPassword: string,
|};

const validate = ({
  newPassword,
  oldPassword,
}: ChangePasswordFormFields): { [key: string]: string } => {
  const errors = {};

  if (!oldPassword) {
    errors.oldPassword = 'Old password is required';
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required';
  }

  if (newPassword && newPassword === oldPassword) {
    errors.newPassword = 'New password the same as old';
  }

  if (newPassword && newPassword.length < 6) {
    errors.newPassword = 'password should be at least 6 characters long';
  }

  return errors;
};

@form({ validate })
@observer
class ChangePasswordForm extends InjectedComponent<FormProps> {
  _onSubmitButtonPress = (): Promise<void> =>
    this.injectedProps.handleSubmit(AuthApi.changePassword);

  render() {
    const { formError, invalid, submitting } = this.injectedProps;
    return (
      <View>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          component={TextField}
          disabled={submitting}
          label="Old password"
          name="oldPassword"
          nextFocusTo="newPassword"
          secureTextEntry
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          component={TextField}
          disabled={submitting}
          label="New password"
          name="newPassword"
          onSubmitEditing={this._onSubmitButtonPress}
          secureTextEntry
        />
        <FormValidationMessage>{formError}</FormValidationMessage>
        <SectionContent paddedVertical>
          <Button
            disabled={submitting || invalid}
            loading={submitting}
            onPress={this._onSubmitButtonPress}
            title="Change password"
          />
        </SectionContent>
      </View>
    );
  }
}

export default ChangePasswordForm;
