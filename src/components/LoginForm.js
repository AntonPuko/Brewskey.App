// @flow

import type AuthStore from '../stores/AuthStore';
import type { FormProps } from '../common/form/types';
import type { UserCredentials } from '../authApi';
import type { FormInput } from 'react-native-elements';

import * as React from 'react';
import InjectedComponent from '../common/InjectedComponent';
import nullthrows from 'nullthrows';
import { inject, observer } from 'mobx-react';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, FormValidationMessage } from 'react-native-elements';
import { form, FormField } from '../common/form';
import TextField from './TextField';

const validate = (values: UserCredentials): { [key: string]: string } => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'User name is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

type InjectedProps = {
  authStore: AuthStore,
  ...FormProps,
};

@form({ validate })
@inject('authStore')
@observer
class LoginForm extends InjectedComponent<InjectedProps> {
  _passwordInputRef: ?FormInput;

  _onUserNameSubmit = (): void => nullthrows(this._passwordInputRef).focus();

  _onSubmit = async (formValues: Object): Promise<void> => {
    Keyboard.dismiss();
    await this.injectedProps.authStore.login(formValues);
  };

  _onSubmitButtonPress = (): Promise<void> =>
    this.injectedProps.handleSubmit(this._onSubmit);

  render(): React.Node {
    const { formError, invalid, pristine, submitting } = this.injectedProps;
    return (
      <KeyboardAwareScrollView>
        <FormField
          component={TextField}
          disabled={submitting}
          label="User name"
          name="userName"
          onSubmitEditing={this._onUserNameSubmit}
        />
        <FormField
          component={TextField}
          disabled={submitting}
          label="Password"
          inputRef={ref => (this._passwordInputRef = ref)}
          name="password"
          onSubmitEditing={this._onSubmitButtonPress}
          secureTextEntry
        />
        <FormValidationMessage>{formError}</FormValidationMessage>
        <Button
          disabled={submitting || invalid || pristine}
          onPress={this._onSubmitButtonPress}
          title="Log in"
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default LoginForm;
