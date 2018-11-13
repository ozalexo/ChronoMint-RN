import React from 'react'
import PropTypes from 'prop-types'
import SectionHeader from '../../../src/components/SectionHeader'

export default StorySectionHeader = ({ title }) => {
  return <SectionHeader title={title} />
}

StorySectionHeader.propTypes = {
  title: PropTypes.string,
}
