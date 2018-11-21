import { multiClientMiddleware } from 'redux-axios-middleware'
import clients from '../../clients'

export default multiClientMiddleware(
  clients,
  {
    // We need it to process all HTTP errors in our source code
    returnRejectedPromiseOnError: true,
  }
)
