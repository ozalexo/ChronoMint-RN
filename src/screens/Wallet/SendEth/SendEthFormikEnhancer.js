/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

import { withFormik } from 'formik'
import * as Yup from 'yup'
import { balanceToAmount } from '@chronobank/ethereum/utils/amount'

export default withFormik({
  mapPropsToValues: () => ({
    to: '',
    value: '',
    feeMultiplier: 1,
  }),
  validate: (values, props) => {
    const bnValue = balanceToAmount(values.value)

    if (values.to && values.value && bnValue && bnValue > 0) {
      try {
        const txDraft = props.currentEthWallet.txDraft
        const estimationGasArguments = {
          from: txDraft.from,
          to: values.to,
          value: bnValue,
          gasPrice: txDraft.gasPrice,
          nonce: txDraft.nonce,
        }

        props.estimateGas(estimationGasArguments)
          .then((results) => console.log('estimate results', results))
          .catch((error) => console.log('estimation gas error', error))
      } catch (error) {
        console.log('WTF?', error)
      }
    }
  },
  handleSubmit: (values, { props }) => {
    console.log('values', values)
    // TODO: update txDraft
  },
  validationSchema: Yup.object().shape({
    value: Yup.string()
      .required('Amount is required!'),
    to: Yup.string()
      .required('Recepient address is required!'),
    feeMultiplier: Yup.number().positive(),
  }),
})