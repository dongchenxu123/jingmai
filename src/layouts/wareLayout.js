import React from 'react'
// import {
//   HashRouter as Router,
//   Route
//  } from 'react-router-dom'
// import {routes} from '../routes/index'
import ProExtensionView from '../components/proExtensionView';
class WareLayout extends React.Component {
	render() {
    // let browsername = ''
    // if(process.env.NODE_ENV === 'production'){
    //   browsername = '/'
    // } else{
    //   browsername = '_dev/dsp/site'
    // }
		return (
	     <div className='home'>
			 {/*<Router basename={browsername}>
    				<div>
    	            {routes.map((route, index) => (
    	            	<Route key={index} exact={route.exact} path={route.path} component={route.component}/>
    	            ))}
            </div>
         </Router>*/}
         <ProExtensionView />
       </div>
		)
	}
}


export default WareLayout
