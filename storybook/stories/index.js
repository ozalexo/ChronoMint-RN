import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import CenterView from './CenterView'
import Welcome from './Welcome'
import Separator from './Separator'
import Input from './Input'
import Button from './Buttons/Button'
import TextButton from './Buttons/TextButton'
import PrimaryButton from './Buttons/PrimaryButton'
import SectionHeader from './SectionHeader'
import Cautions from './Cautions'
import Checkbox from './Checkbox'

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
  .add('Button', Button)  

storiesOf('Components/Separator', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Separator', Separator)

storiesOf('Components/Inputs', module)
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
  
  storiesOf('Components/Cautions', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Cautions', Cautions)

  storiesOf('Components/Checkboxes', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    }
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Checkbox', () => (
    <Checkbox label='Dark Checked' isDark isChecked onPress={action('clicked-checkbox')}/>
  ))
  .add('Checkbox 1', () => <Checkbox />)
  .add('Checkbox 2', () => <Checkbox label='Light Unchecked' />)
  