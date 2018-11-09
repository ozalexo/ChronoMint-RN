import React from 'react'
import PropTypes from 'prop-types'
import WalletAlert from '../../../src/components/WalletAlert'

export default function StoryWalletAlert({actions, title, children, style, contentContainerStyle}) {
  return (
    <WalletAlert
      actions={actions}
      title={title}
      style={style}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </WalletAlert>
  )
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
