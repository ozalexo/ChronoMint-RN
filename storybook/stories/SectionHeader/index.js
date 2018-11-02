import React from 'react'
import PropTypes from 'prop-types'
import SectionHeader from '../../../src/components/SectionHeader'

export default function StorySectionHeader ({ title }) {
  return <SectionHeader title={title} />
}

StorySectionHeader.defaultProps = {
  title: 'Test Title',
}

StorySectionHeader.propTypes = {
  title: PropTypes.string,
}
