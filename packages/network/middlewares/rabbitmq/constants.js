/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

export const DUCK_RMQ_MIDDLEWARE = 'rmq_middleware'

export const BASE_URL = 'https://rabbitmq-webstomp.chronobank.io/stomp/websocket'
export const USER = 'rabbitmq_user'
export const PASSWORD = '38309100024'

/* INFO
 *
 * MW_* actions handled by middleware and do not redispatch (no changes in store)
 * RMQ_* actions are changing store
 * 
 */
export const MW_RMQ_CONNECT = 'MW_RMQ/CONNECT'
export const RMQ_CONNECT_SUCCESS = 'MW_RMQ/CONNECT_SUCCESS'
export const RMQ_CONNECT_FAILURE = 'MW_RMQ/CONNECT_FAILURE'

export const MW_RMQ_DISCONNECT = 'MW_RMQ/DISCONNECT'
export const RMQ_DISCONNECT_SUCCESS = 'MW_RMQ/DISCONNECT_SUCCESS'
export const RMQ_DISCONNECT_FAILURE = 'MW_RMQ/DISCONNECT_FAILURE'

export const MW_RMQ_SUBSCRIBE = 'MW_RMQ/SUBSCRIBE'
export const RMQ_SUBSCRIBE_SUCCESS = 'MW_RMQ/SUBSCRIBE_SUCCESS'
export const RMQ_SUBSCRIBE_FAILURE = 'MW_RMQ/SUBSCRIBE_FAILURE'

export const MW_RMQ_UNSUBSCRIBE = 'MW_RMQ/UNSUBSCRIBE'
export const RMQ_UNSUBSCRIBE_SUCCESS = 'MW_RMQ/UNSUBSCRIBE_SUCCESS'
export const RMQ_UNSUBSCRIBE_FAILURE = 'MW_RMQ/UNSUBSCRIBE_FAILURE'
