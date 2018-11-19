import React from 'react'
import { Text, View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import StoryProvider from './StoryProvider'

//Screens
import ScreenStart from './ScreenStart'
import ImportMethod from './ImportMethod'
import GenerateMnemonic from './GenerateMnemonic'
import ConfirmMnemonic from './ConfirmMnemonic'
import EnterPrivateKey from './EnterPrivateKey'
import WalletList from './WalletList'

//Wrappers
import StoryWrapper from './StoryWrapper'
import CenterView from './CenterView'
import ScreenWrapper from './ScreenWrapper'
//Components
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

import styles from './styles'

const confirmations = [0, 1, 2, 3, 4]
const transactionsList = [
  {
    address: 'test address',
    amount: 0.000000001,
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
    <StoryWrapper>
      <SectionHeader title='Short title' />
      <SectionHeader title='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
    </StoryWrapper>
  ))
  .add('FetchingIndicators', () => (
    <StoryWrapper>
      <FetchingIndicator status='FETCHING' />
      <FetchingIndicator status='SYNCING' />
      <FetchingIndicator status='SYNCED' />
    </StoryWrapper>
  ))

storiesOf('Components/Inputs', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Input', () => (
    <StoryWrapper>
      <Input placeholder='Default Input' />
      <Input placeholder='Error Input' error='Some kind of error happened here.' />
    </StoryWrapper>
  ))
  .add('Checkboxes', () => (
    <StoryWrapper>
      <Checkbox label='Dark Checked' isDark isChecked onPress={action('clicked-checkbox')} />
      <Checkbox label='Dark Unchecked' isDark onPress={action('clicked-checkbox')} />
      <Checkbox label='Light Checked' isChecked onPress={action('clicked-checkbox')} />
      <Checkbox label='Light Unchecked' onPress={action('clicked-checkbox')} />
    </StoryWrapper>
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
    <StoryWrapper>
      <Label labelTextAlign='left' labelType='currencyColored' text='Currency colored left aligned label' />
      <Label labelTextAlign='right' text='Pure right aligned label' />
    </StoryWrapper>
  ))
  .add('Labeled Items', () => (
    <StoryWrapper>
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
    </StoryWrapper>
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
    <StoryWrapper>
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
    </StoryWrapper>
  ))

storiesOf('Components/Transaction icons', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Small Icons', () => (
    <View style={styles.iconsContainer}>
      <View style={styles.iconsBlock}>
        {confirmations.map((confirmNumber) =>
          <TransactionIcon
            style={{ marginVertical: 10 }}
            key={confirmNumber}
            confirmations={confirmNumber}
            type='sending'
            mode='small'
          />
        )}
      </View>
      <View style={styles.iconsBlock}>
        {confirmations.map((confirmNumber) =>
          <TransactionIcon
            style={{ marginVertical: 10 }}
            key={confirmNumber}
            confirmations={confirmNumber}
            type='receiving'
            mode='small'
          />
        )}
      </View>
    </View>
  ))
  .add('Big Icons', () => (
    <View style={styles.iconsContainer}>
      <View style={styles.iconsBlock}>
        {confirmations.map((confirmNumber) =>
          <TransactionIcon
            style={{ marginVertical: 10 }}
            key={confirmNumber}
            confirmations={confirmNumber}
            type='receiving'
            mode='big'
          />
        )}
      </View>
      <View style={styles.iconsBlock}>
        {confirmations.map((confirmNumber) =>
          <TransactionIcon
            style={{ marginVertical: 10 }}
            key={confirmNumber}
            confirmations={confirmNumber}
            type='sending'
            mode='big'
          />
        )}
      </View>
    </View>
  ))

storiesOf('Complex Components/Wallet', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Wallet Alert', () => <WalletAlert title="Empty Wallet Alert" />)
  .add('Wallet Alert With children', () => (
    <WalletAlert
      title="Test title from prop"
      actions={
        [
          {
            id: 1,
            isMain: true,
            title: 'Main test title',
            onPress: () => { },
          },
          {
            id: 2,
            isMain: false,
            title: 'First test title',
            onPress: () => { },
          },
          {
            id: 3,
            isMain: false,
            title: 'This is very long title for testing purposes ECgludvYJsDsyCMvZC3Vx0YEtu1mtS3RXKgBVHXNyUA9vwxaT5SKvJuICG1x2DpSM7HxHVa8CGTLHXWGIVMPRuVJsN0mTPXJP0qowaLdKkLSCnKTMbRhPv7KgeW8jOM5n8fOIrzCTJ9UNWx3RM4uJt35WYMe2IW2Qw5DKnwCTenbt5Byc1LbLYOX9ubb9azS8R79NwX5ZUu3EIEIjqoXmlwIKRZqb0Ug0KtHfqPeUA6xeAwK1quPGjGtqqjuwtH',
            onPress: () => { },
          },
        ]
      }
    >
      <Text>Check 1</Text>
      <Text>Check 2</Text>
      <Text>Check 3</Text>
    </WalletAlert>
  ))

storiesOf('Complex Components/Fee Slider', module)
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

storiesOf('Complex Components/Transactions List', module)
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

storiesOf('Screens/Login', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <ScreenWrapper>{getStory()}</ScreenWrapper>)
  .addDecorator((story) => <StoryProvider story={story()} />)
  .add('Start Screen', () => <ScreenStart />)
  .add('ImportMethod Screen', () => <ImportMethod />)
  .add('EnterPrivateKey Screen', () => <EnterPrivateKey />)
  .add('GenerateMnemonic Screen', () => (
    <GenerateMnemonic
      mnemonic='check mnemonic phrase'
      password='check123password'
      privateKey='PrivateKeyCheck'
    />
  ))
  .add('ConfirmMnemonic Screen', () => (
    <ConfirmMnemonic
      mnemonic='jacket lady situate brass inflict chest arch series glass second soup food'
      password='testPassword'
      privateKey='testPrivate_Key'
    />
  ))

storiesOf('Screens/Wallet', module)
  .addParameters({
    options: {
      hierarchySeparator: /\//,
      hierarchyRootSeparator: /\|/,
    },
  })
  .addDecorator((getStory) => <ScreenWrapper>{getStory()}</ScreenWrapper>)
  .addDecorator((story) => <StoryProvider story={story()} />)
  .add('WalletList Screen', () => <WalletList />)
