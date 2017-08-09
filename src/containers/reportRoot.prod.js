import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReportLayout from '../layouts/reportLayout';


export default class WareRoot extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
			    <div>
			      <ReportLayout />
			    </div>
	  		</Provider>
  		)
	}
}
