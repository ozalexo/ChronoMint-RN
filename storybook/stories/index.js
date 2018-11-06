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
import ListItem from './ListItem'
import TransactionIcon from './TranscationIcon'
import WalletAlert from './WalletAlert'
import WalletOwner from './WalletOwner'

const confirmations = [0, 1, 2, 3, 4]

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Components/Buttons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('TextButton', () => <TextButton label='Test Label' />)
  .add('PrimaryButton', () => <PrimaryButton label='Primary label' />)
  .add('Button', () => <Button label='Button label' />)

storiesOf('Components/Different', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Separator', () => <Separator />)
  .add('SectionHeader title 1', () => <SectionHeader title='First title' />)
  .add('SectionHeader title 2', () => <SectionHeader title='SECOND title' />)
  .add('FetchingIndicators', () => (
    <React.Fragment>
      <FetchingIndicator status='FETCHING' />
      <FetchingIndicator status='SYNCING' />
      <FetchingIndicator status='SYNCED' />
    </React.Fragment>
  ))

storiesOf('Inputs/Input', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Normal Input', () => <Input />)
  .add('Error Input', () => <Input style={{ color: 'red', borderBottomColor: 'red' }} />)

storiesOf('Inputs/Checkboxes', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Checkboxes', () => (
    <React.Fragment>
      <Checkbox label='Dark Checked' isDark isChecked onPress={action('clicked-checkbox')} />
      <Checkbox label='Light Unchecked' />
      <Checkbox />
    </React.Fragment>
  ))

storiesOf('Components/Cautions', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Cautions', Cautions)

storiesOf('Components/Fee Slider', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
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

storiesOf('Components/Labels', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Labels', () => (
    <React.Fragment>
      <Label labelTextAlign='left' labelType='currencyColored' text='FIRST LABEL' />
      <Label labelTextAlign='right' text='SECOND LABEL' />
    </React.Fragment>
  ))
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

storiesOf('Components/List items', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('List item 1', () => (
    <ListItem
      value='Test value'
      title='Test title'
      isDark
    />
  ))
  .add('List item 2', () => (
    <ListItem
      icon={1}
      value='Second Test value'
      hasArrow
      title='Second Test title'
    />
  ))

storiesOf('Components/Transaction icons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Small Sending Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='sending'
          mode='small'
        />
      )}
    </React.Fragment>
  ))
  .add('Big Sending Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='sending'
          mode='big'
        />
      )}
    </React.Fragment>
  ))
  .add('Small Receiving Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='receiving'
          mode='small'
        />
      )}
    </React.Fragment>
  ))
  .add('Big Receiving Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='receiving'
          mode='big'
        />
      )}
    </React.Fragment>
  ))

storiesOf('Components/Wallet', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Wallet Alert 1', () => <WalletAlert />)
  .add('Wallet Alert 2', () => (
    <WalletAlert title="Test title from prop" >
      <Text>Check 1</Text>
      <Text>Check 2</Text>
      <Text>Check 3</Text>
    </WalletAlert>
  ))
  .add('Wallet Owner 1', WalletOwner)
  //have problms with render
  .add('Wallet Owner 2', () => {
    <WalletOwner
      address='Test prop address'
      id='Test prop id'
      name='Test prop name'
    />
  })
