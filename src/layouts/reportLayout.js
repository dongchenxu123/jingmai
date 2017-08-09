import React from 'react'
// import {
//   HashRouter as Router,
//   Route
//  } from 'react-router-dom'
// import {routes} from '../routes/index'
import ShopReportView from '../components/shopReport';
class ReportLayout extends React.Component {
	render() {
    return (
	     <div className='home'>
    			<ShopReportView />
      </div>
		)
	}
}


export default ReportLayout
