import React from 'react'
import PropTypes from 'prop-types'
import WalletOwner from '../../../src/components/WalletOwner'

export default function StoryWalletOwner ({ address, id, image, name, onSelectOwner }) {
  return (
    <WalletOwner
      address={address}
      id={id}
      image={image}
      name={name}
      onSelectOwner={onSelectOwner}
    />
  )
}

StoryWalletOwner.propTypes = {
  address: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onSelectOwner: PropTypes.func,
}
