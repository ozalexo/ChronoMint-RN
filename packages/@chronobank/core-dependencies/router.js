/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 *
 * @flow
 */

class RouterClass {
  navigator: any

  setNavigator(navigator: any) {
    if (this.navigator) return

    this.navigator = navigator
  }

  push = (screen: string) => {
    this.navigator && this.navigator.push({ screen })

    return {
      type: 'router/PUSH',
      payload: {
        screen
      }
    }
  }
  
  goBack = (params) => this.navigator && this.navigator.pop(params)
  reset = (params) => this.navigator && this.navigator.resetTo(params)
  toggleDrawer = (params) => this.navigator && this.navigator.toggleDrawer(params)
}

export const router = new RouterClass()

export const push = router.push

export const goBack = router.goBack

export const reset = router.reset

