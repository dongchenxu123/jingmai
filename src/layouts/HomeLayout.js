import React from 'react'
// import {
//   HashRouter as Router,
//   Route
//  } from 'react-router-dom'
// import {routes} from '../routes/index'
import JdHomeView from '../components/home';
class HomeLayout extends React.Component {
	render() {
    return (
	     <div className='home'>
    			<JdHomeView />
      </div>
		)
	}
}


export default HomeLayout
