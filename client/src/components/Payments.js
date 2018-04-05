import React ,{ Component } from 'react';
import StripCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'
class Payments extends Component{
  render(){
    return(
      <StripCheckout
        name  = "Baax"
        description = "$5 for 5 credits"
        amount = {500}
        token = {token => this.props.handleToken(token)} // callback function after recieving token
        stripeKey = {process.env.REACT_APP_STRIPE_KEY}
      >
        <button className = "btn">
          Add Credits
        </button>
      </StripCheckout>
    );
  }
}

export default connect(null,actions)(Payments);
