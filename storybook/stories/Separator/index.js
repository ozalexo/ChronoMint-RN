import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../src/components/Separator';

export default function SeparatorStory({ separator }) {
    return <Separator style={separator} />;
}

Separator.defaultProps = {
    separator: {
        backgroundColor: 'lightgray',
    }
};

Separator.propTypes = {
    styles: PropTypes.object,
};
