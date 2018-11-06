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
      title: 'ECgludvYJsDsyCMvZC3Vx0YEtu1mtS3RXKgBVHXNyUA9vwxaT5SKvJuICG1x2DpSM7HxHVa8CGTLHXWGIVMPRuVJsN0mTPXJP0qowaLdKkLSCnKTMbRhPv7KgeW8jOM5n8fOIrzCTJ9UNWx3RM4uJt35WYMe2IW2Qw5DKnwCTenbt5Byc1LbLYOX9ubb9azS8R79NwX5ZUu3EIEIjqoXmlwIKRZqb0Ug0KtHfqPeUA6xeAwK1quPGjGtqqjuwtH',
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
