import React, { Component } from 'react';
import { Provider } from 'react-redux'
import ReportLayout from '../layouts/reportLayout';
import DevTools from '../containers/DevTools'

// Render the main component into the dom
export default class Root extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
			    <div>
			      <ReportLayout />
				  	<DevTools />
          </div>
		  	</Provider>
	  	)
	  }
}
