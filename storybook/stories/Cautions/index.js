import React from 'react'
import PropTypes from 'prop-types'
import Cautions from '../../../src/components/Cautions'

export default function StoryCautions ({ text }) {
  return <Cautions text={text} />
}

StoryCautions.defaultProps = {
  text: 'Caution Example',
}

StoryCautions.propTypes = {
  text: PropTypes.string,
}
