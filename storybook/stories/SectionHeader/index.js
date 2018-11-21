import React from 'react'
import PropTypes from 'prop-types'
import SectionHeader from '../../../src/components/SectionHeader'

const StorySectionHeader = ({ title }) => {
  return <SectionHeader title={title} />
}

StorySectionHeader.propTypes = {
  title: PropTypes.string,
}

export default StorySectionHeader
