import EndorseTokenContract from '../../../../build/contracts/EndorseToken.json'

import React, { Component } from 'react'
import store from '../../../store'

const contract = require('truffle-contract')
const EndorseTokenAddress = "0x4afab8a639366ebc39eda3613867848f9d89c787"

class TokenOverview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balance: '-',
      name: this.props.name,
      account: this.props.account
    }
  }

  componentDidMount() {
    let component = this

    let web3 = store.getState().web3.web3Instance

    // Using truffle-contract we create the authentication object.
    const EndorseToken = contract(EndorseTokenContract)
    EndorseToken.setProvider(web3.currentProvider)

    // Declaring this for later so we can chain functions on Authentication.
    var endorseTokenInstance

    // Get current ethereum wallet.
    web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }

      EndorseToken.at(EndorseTokenAddress).then(function(instance) {
        endorseTokenInstance = instance
        endorseTokenInstance.balanceOf(coinbase, { from: coinbase} )
          .then(function(result) {
            console.log(coinbase + ': ' + result.valueOf())
            component.setState({ balance: result.valueOf() })
          })

        // accs.forEach(function(acc) {
        //
        //
        //   endorseTokenInstance.created(acc, 0).then(function(result) {
        //     console.log(acc + ': ' + result.valueOf())
        //   })
        // })
      })
    })
  }

  render() {
    return(
      <p>Endorse balance: {this.state.balance}</p>
    )
  }
}

export default TokenOverview
