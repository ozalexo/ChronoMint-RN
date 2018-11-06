import React from 'react'
import { Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'
import Welcome from './Welcome'
import Separator from './Separator'
import Input from './Input'
import TextButton from './Buttons/TextButton'
import PrimaryButton from './Buttons/PrimaryButton'
import SectionHeader from './SectionHeader'
import Checkbox from './Checkbox'
import FeeSlider from './FeeSlider'
import FetchingIndicator from './FetchingIndicator'
import Label from './Label'
import LabeledItem from './LabeledItem'
import ListItem from './ListItem'
import TransactionIcon from './TranscationIcon'
import WalletAlert from './WalletAlert'
import TransactionsList from './TransactionsList'

const confirmations = [0, 1, 2, 3, 4]
const transactionsList = [
  {
    address: 'test address',
    amount: 0.001,
    confirmations: 0,
    symbol: 'BCC',
    type: 'sending',
    mode: 'small',
  },
  {
    address: 'test address',
    amount: 100,
    confirmations: 1,
    symbol: 'WAVES',
    type: 'sending',
    mode: 'small',
  },
  {
    address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
    amount: 99,
    confirmations: 2,
    symbol: 'BTC',
    type: 'receiving',
    mode: 'small',
  },
  {
    address: 'test address',
    amount: 0.001,
    confirmations: 3,
    symbol: 'LHT',
    type: 'sending',
    mode: 'small',
  },
  {
    address: 'second test address',
    amount: 45,
    confirmations: 4,
    symbol: 'LTC',
    type: 'receiving',
    mode: 'small',
  },
  {
    address: '0xf1106d1eb597ef2f14c8f5343c1b4203fa0f2e9b',
    amount: 0.001,
    confirmations: 4,
    symbol: 'ETH',
    type: 'receiving',
    mode: 'small',
  },
]

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

storiesOf('Components/Different', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Separator', () => <Separator />)
  .add('SectionHeaders', () => (
    <React.Fragment>
      <SectionHeader title='Short title' />
      <SectionHeader title='Super long titletitletitletitletitletitle' />
    </React.Fragment>
  ))
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
  .add('Error Input', () => <Input error={true} />)
  .add('Success Input', () => <Input error={false} />)

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
      style={{ backgroundColor: 'white' }}
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
      <Label labelTextAlign='left' labelType='currencyColored' text='Currency colored left aligned label' />
      <Label labelTextAlign='right' text='Pure right aligned label' />
    </React.Fragment>
  ))
  .add('Labeled Items', () => (
    <React.Fragment>
      <LabeledItem
        labelTextAlign='left'
        labelAlign='top'
        labelType='currencyColored'
        labelText='Top left currency colored labeled item'>
        <Text>
          Check1
          <Text>
            Check2
          </Text>
        </Text>
      </LabeledItem>
      <LabeledItem
        labelTextAlign='right'
        labelAlign='bottom'
        labelText='Pure right bottom label' />
    </React.Fragment>
  ))

storiesOf('Components/List items', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('List items', () => (
    <React.Fragment>
      <ListItem
        icon={1}
        value='Test value'
        title='Test title'
        isDark
      />
      <ListItem
        icon={1}
        value='Second Test value'
        hasArrow
        title='Second Test title'
      />
      <ListItem
        icon={1}
        value='Third Test value'
        title='Third Test title'
        isDark
      />
      <ListItem
        icon={0}
        value='Fourth Test value'
        hasArrow
        title='Fourth Test title'
      />
    </React.Fragment>
  ))

storiesOf('Components/Transaction icons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Sending Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='sending'
          mode='small'
        />
      )}
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
  .add('Receiving Icons', () => (
    <React.Fragment>
      {confirmations.map((confirmNumber) =>
        <TransactionIcon
          key={confirmNumber}
          confirmations={confirmNumber}
          type='receiving'
          mode='small'
        />
      )}
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
  .add('Wallet Alert', () => <WalletAlert />)
  .add('Wallet Alert With children', () => (
    <WalletAlert title="Test title from prop" >
      <Text>Check 1</Text>
      <Text>Check 2</Text>
      <Text>Check 3</Text>
    </WalletAlert>
  ))

storiesOf('Components/Transactions List', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Transactions List', () => (
    <TransactionsList
      mainWalletTransactionLoadingStatus={{ isFetched: true, isFetching: false, isInited: true }}
      latestTransactionDate={new Date()}
      transactions={transactionsList}
    />
  ))
