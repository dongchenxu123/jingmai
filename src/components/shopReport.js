import React from 'react';
import '../styles/App.css';
import ShopReportClickChart from './shopReportClickChart';
import ShopReportCostChart from './shopReportCostChart';
import ShopReportPvChart from './shopReportPvChart';
import { Button, Spin, Icon, Row, Col} from 'antd';
import TableView from './tableView';
import { connect } from 'react-redux';
import { actions as loadgetShopCampaignReport } from '../redux/index/indexAction';
import { startDate, endDate } from './date';
const mapStateToProps = (state) => ({
	getShopReport: state.wareSearchItem.getshopCampainReport
})

class ShopReportView extends React.Component {
	constructor(props) {
		super()
		this.state={
			isClick: false,
			isCost: false,
			isimpressions: false
		}
  }
	componentDidMount () {
		this.props.loadgetShopCampaignReport({start_date: startDate, end_date: endDate})
	}
	clickData () {
		this.setState({
			isClick: true,
			isCost: false,
			isimpressions: false
		})
	}
	costData () {
		this.setState({
			isCost: true,
			isClick: false,
			isimpressions: false
		})

	}
	impressionsData () {
		this.setState({
			isimpressions: true,
			isCost: false,
			isClick: false
		})
	}
	renderChart () {
		const alldata = this.props.getShopReport
		if(alldata && alldata.length > 0) {
			if(this.state.isClick == true) {
				return (<ShopReportClickChart dataSource={alldata}/>)
			} else if(this.state.isCost == true) {
				return (<ShopReportCostChart dataSource={alldata}/>)
			} else if (this.state.isimpressions == true) {
        return (<ShopReportPvChart dataSource={alldata}/>)
			} else {
        return (<ShopReportClickChart dataSource={alldata}/>)
      }
		} else {
			return (<div style={styles.loading}><Spin/></div>)
		}
	}
	render () {
		const alldata = this.props.getShopReport
		return (
        <div>
					<div style={{backgroundColor: '#fff'}}>
						<Row type='flex' style={{padding: '10px'}}>
							<Col span='12'>
								<div style={{fontSize: '16px'}}><Icon type='area-chart' style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}} />&nbsp;历史流量数据</div>
							</Col>
						</Row>
						{
							alldata && alldata.length > 0
								? <div>
									{
										this.renderChart ()
									}
									<div style={{textAlign: 'center', marginTop:'-15px'}}>
										<Button size='large' style={{width: '30%'}} onClick={this.clickData.bind(this)}>点击量</Button>
										<Button size='large' style={{marginLeft: '10px', width: '30%'}} onClick={this.costData.bind(this)}>花费</Button>
										<Button size='large' style={{marginLeft: '10px', width: '30%'}} onClick={this.impressionsData.bind(this)}>展现量</Button>
									</div>
								</div>
								: <div style={{textAlign: 'center',padding: '50px 0px'}}><Icon type='frown-o' />&nbsp;&nbsp;暂无数据</div>
						}

					</div>
					<div style={{backgroundColor: '#fff',paddingTop: '16px'}}>
						<Row type='flex' style={{padding: '10px'}}>
							<Col span='12'>
								<div style={{fontSize: '16px'}}><Icon type='file-text' style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}} />&nbsp;历史流量数据报表</div>
							</Col>
						</Row>
						{
							alldata && alldata.length > 0
							? <TableView data={alldata}/>
							: <div style={{textAlign: 'center',padding: '50px 0'}}><Icon type='frown-o' />&nbsp;&nbsp;暂无数据</div>
						}
					</div>
        </div>
      )
  }
}
const styles = {
	titleTop: {
		height: '55px',
		backgroundColor: '#108ee9',
		color: '#fff',
		textAlign: 'center',
		lineHeight: '55px',
		fontSize: '18px',
		position: 'relative'
	},
  loading: {
  textAlign: 'center',
  borderRadius: '4px',
  marginBottom: '20px',
  padding: '30px 50px',
  margin: '20px 0',
	width: '100%'
}
}

export default connect(mapStateToProps, loadgetShopCampaignReport)(ShopReportView);
