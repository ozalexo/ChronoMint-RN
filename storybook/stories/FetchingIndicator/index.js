import React from 'react'
import PropTypes from 'prop-types'
import FetchingIndicator from '../../../src/components/FetchingIndicator'

export default function StoryFetchingIndicator({ status }) {
  return <FetchingIndicator status={status} />;
}

StoryFetchingIndicator.defaultProps = {
    status: 'FETCHING'
};

StoryFetchingIndicator.propTypes ={
    status: PropTypes.oneOf(['FETCHING', 'SYNCING', 'SYNCED']),
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
      ]),
}
