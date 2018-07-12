/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

class RouterClass {
  navigator: any

  setNavigator(navigator: any) {
    this.navigator = navigator
  }

  push = (link: string) => {
    console.log('LINK: ', link, this.navigator)

    const screenLinks = {
      '/login/create-account': 'CreateAccount'
    }

    this.navigator && this.navigator.push({
      screen: screenLinks[link]
    })

    return {
      type: 'router/PUSH',
      payload: {
        link
      }
    }
  }
  goBack = (params) => this.navigator && this.navigator.pop(params)
  reset = (params) => this.navigator && this.navigator.resetTo(params)
  toggleDrawer = (params) => this.navigator && this.navigator.toggleDrawer(params)
}

export const Router = new RouterClass()

export const push = Router.push

export const goBack = Router.goBack

export const reset = Router.reset

