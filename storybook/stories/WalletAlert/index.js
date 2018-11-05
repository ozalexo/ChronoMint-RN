import React from 'react'
import PropTypes from 'prop-types'
import WalletAlert from '../../../src/components/WalletAlert'

export default function StoryWalletAlert ({ actions, title, children, style, contentContainerStyle }) {
  return (
    <WalletAlert
      actions={actions}
      title={title}
    >
      {children}
    </WalletAlert>
  )
}

StoryWalletAlert.defaultProps = {
  contentContainerStyle: null,
  style: null,
  children: null,
  actions: [
    {
      isMain: true,
      title: 'Main test title',
      onPress: () => { },
    },
    {
      isMain: false,
      title: 'First test title',
      onPress: () => { },
    },
    {
      isMain: false,
      title: 'Second test title',
      onPress: () => { },
    },
  ],
  title: 'Test Title',
}

StoryWalletAlert.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      isMain: PropTypes.bool,
      title: PropTypes.string,
      onPress: PropTypes.func,
    })
  ),
  title: PropTypes.string,
}
