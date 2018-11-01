import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import Separator from './Separator';
import Input from './Input';
import TextButton from './Buttons/TextButton';
import PrimaryButton from './Buttons/PrimaryButton';
import SectionHeader from './SectionHeader';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Components/Buttons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('TextButton', TextButton)
  .add('PrimaryButton', PrimaryButton)
  .add('with text1', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

storiesOf('Components/Separator', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Separator', Separator)

storiesOf('Components/Input', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Input', Input)

storiesOf('Components/Section Header', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('SectionHeader', SectionHeader)
  