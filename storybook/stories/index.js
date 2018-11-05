import React from 'react'
import { Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

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
import FeeSlider from './FeeSlider'
import FetchingIndicator from './FetchingIndicator'
import Label from './Label'
import LabeledItem from './LabeledItem'

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Components/Buttons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('TextButton', () => <TextButton label='Test Label' />)
  .add('PrimaryButton', () => <PrimaryButton label='Primary test label' />)
  .add('Button', Button)

storiesOf('Components/Separator', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Separator', Separator)

storiesOf('Components/Inputs', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Input', Input)

storiesOf('Components/Section Header', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('SectionHeader title 1', () => <SectionHeader title='First title' />)
  .add('SectionHeader title 2', () => <SectionHeader title='SECOND title' />)

storiesOf('Components/Cautions', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Cautions', Cautions)

storiesOf('Components/Checkboxes', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Checkbox', () => (
    <Checkbox label='Dark Checked' isDark isChecked onPress={action('clicked-checkbox')} />
  ))
  .add('Checkbox 1', () => <Checkbox />)
  .add('Checkbox 2', () => <Checkbox label='Light Unchecked' />)

storiesOf('Components/Fee Slider', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('FeeSlider', () => (
    <FeeSlider
      tokenSymbol='ETH'
      selectedCurrency='USD'
      value={1}
      calculatedFeeValue={0.5}
      calculatedFeeValueInSelectedCurrency={0.5}
      maximumValue={10}
      minimumValue={0}
      step={0.5}
    />
  ))

storiesOf('Components/Fetching Indicators', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('FetchingIndicator FETCHING', () => (
    <FetchingIndicator status='FETCHING' />
  ))
  .add('FetchingIndicator SYNCING', () => (
    <FetchingIndicator status='SYNCING' />
  )).add('FetchingIndicator SYNCED', () => (
    <FetchingIndicator status='SYNCED' />
  ))

storiesOf('Components/Labels', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Label 1', () => (
    <Label labelTextAlign='left' labelType='currencyColored' text='FIRST LABEL' />
  ))
  .add('Label 2', () => (
    <Label labelTextAlign='right' text='SECOND LABEL' />
  ))

storiesOf('Components/Labeled items', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Labeled Item 1', () => (
    <LabeledItem labelTextAlign='left' labelAlign="top" labelType='currencyColored' labelText='FIRST LABEL'>
      <Text>
        Check1
        <Text>
          Check2
        </Text>
      </Text>
    </LabeledItem>
  ))
  .add('Labeled Item 2', () => (
    <LabeledItem labelTextAlign='right' labelAlign="bottom" labelText='SECOND LABEL ITEM' />
  ))
