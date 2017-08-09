import React from 'react';
import '../styles/App.css';
import UserStatusView from './userStatus';
import TodayReportView from './todayReport';
import ShopHistoryReport from './shopHistoryReport';
import { connect } from 'react-redux';
import { actions } from '../redux/index/indexAction';
import { startDate, endDate } from './date';
const mapStateToProps = (state) => ({
	saleData: state.wareSearchItem.getSaleData,
  hourlyCostData: state.wareSearchItem.getHourlycost
})

class JdHomeView extends React.Component {
	componentWillMount() {
		this.props.loadgetHourlycost()
		this.props.loadGetSaleData({start_date: startDate, end_date: endDate})
	}
  render () {
		const data = this.props.saleData
		const hourcostData = this.props.hourlyCostData
		const total = this.props.hourlyCostData.total
		return (
        <div>
            <UserStatusView shopData={data} todayData={total}/>
          	<TodayReportView todayData={hourcostData}/>
          	<ShopHistoryReport shopData={data}/>
        </div>
      )
  }
}

export default connect(mapStateToProps, actions)(JdHomeView);
