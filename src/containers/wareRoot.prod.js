import React, { Component } from 'react';
import { Provider } from 'react-redux';
import WareLayout from '../layouts/wareLayout';


export default class WareRoot extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
			    <div>
			      <WareLayout />
			    </div>
	  		</Provider>
  		)
	}
}
