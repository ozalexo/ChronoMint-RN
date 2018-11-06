import React from 'react'
import PropTypes from 'prop-types'
import Cautions from '../../../src/components/Cautions'

export default function StoryCautions ({ caution }) {
  return <Cautions caution={caution} />
}

StoryCautions.defaultProps = {
  caution: 'keepItSafe',
}

StoryCautions.propTypes = {
  caution: PropTypes.oneOf(['keepItSafe', 'makeBackup', 'dontShare', 'dontLose']),
}
