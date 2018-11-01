import React from 'react';
import Separator from '../../../src/components/Separator';

export default function SeparatorStory({ separator }) {
    return <Separator style={separator} />;
}

Separator.defaultProps = {
    separator: {
        backgroundColor: 'lightgray',
    }
};
