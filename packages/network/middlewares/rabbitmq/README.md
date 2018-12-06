# Redux middleware for RabbitMq server rabbitmq-webstomp.chronobank.io

## Description

This middleware listening global action NETWORK_SELECT, which may be dispatched only from Ethereum's Web3 middleware in case of success connect to selected Ethereum node (in case of Web3 error this action would not be displtched).

Internal actions which used in network/redux/thunks only:
* RMQ_CONNECT - connect ot the MQ server
* RMQ_DISCONNECT - unsubscribe all channels (if exists) and disconnect
* RMQ_SUBSCRIBE - subscribe to provided channel and assign handler
* RMQ_UNSUBSCRIBE - unsubscribe to provided channel
* RMQ_RESUBSCRIBED - info reducer to display message with Redux logger

## Documentation for @stomp/stompjs

* API: https://stomp-js.github.io/api-docs/latest/classes/Client.html
* Usage example: https://stomp-js.github.io/guide/stompjs/2018/06/28/using-stompjs-v5.html
* WebSocket CloseEvent codes (see ): https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent

## @stomp/stompjs debug mode

File `packages/network/middlewares/rabbitmq/RmqManager.js` contains the following code (just uncomment it if connected):
```
// eslint-disable-next-line no-undef
if (__DEV__) {
  stompConfig.debug = (str) => {
    // eslint-disable-next-line no-console
    console.log('    STOMP DEBUG:', str)
  }
}
```

