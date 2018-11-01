import React from 'react';
import PropTypes from 'prop-types';
import Cautions from '../../../src/components/Cautions';
import translate from '../../../src/locales/en';

export default function StoryCautions({ text }) {
  return <Cautions text={text} />;
}

StoryCautions.defaultProps = {
  text: 'Caution Example',
};

StoryCautions.propTypes = {
  onChangeText: PropTypes.string,
};
