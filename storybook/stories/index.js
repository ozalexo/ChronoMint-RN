import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PrimaryButton from '../../src/components/PrimaryButton';
import CenterView from './CenterView';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('PrimaryButton', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with label', () => (
    <PrimaryButton onPress={action('clicked-text')} />
  ));
