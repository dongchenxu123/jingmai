import React from 'react';
import {Button, Row, Col, Icon} from 'antd'
import {number_format} from './util';
//import { Link } from 'react-router-dom'

class UserStatusView extends React.Component {
	render () {
		var shopHistoryData = this.props.shopData
		var shopData = []
		for(var i in shopHistoryData) {
			shopData.push(shopHistoryData[i])
		}
		var len = shopData.length-1
		var yesterdayData = shopData[len]
		var todayData = this.props.todayData
    return (
			<div style={{marginBottom: '10px'}}>
							 <div style={styles.statusStyle}><Icon type='user' style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}}/>&nbsp;今日账户状态</div>
                 <div style={styles.codeBox} className='code-box-demo'>
									<Row type='flex'>
										<Col span='8'>
											<span style={{fontSize: '14px'}}>花费</span>
											<br/>
											<span style={{fontSize: '16px'}}>
												￥{todayData ? number_format(todayData.cost) : 0}
											</span>
										</Col>
										<Col span='8'>
											<span style={{fontSize: '14px', marginBottom: '8px'}}>点击量</span>
											<br/>
											<span style={{fontSize: '16px'}}>
												{todayData ? number_format(todayData.clicks) : 0}
											</span>
										</Col>
										<Col span='8'>
											<span style={{fontSize: '14px', marginBottom: '8px'}}>展现量</span>
											<br/>
											<span style={{fontSize: '16px'}}>
												{todayData ? number_format(todayData.pv) : 0}
											</span>
										</Col>
									</Row>
								</div>
	            <div style={styles.statusStyle}><Icon type='user' style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}}/>&nbsp;昨日账户状态</div>
	            <div style={styles.codeBox} className='code-box-demo'>
               		<Row type='flex'>
			            <Col span='6'>
			              <span style={{fontSize: '14px', marginBottom: '8px'}}>成交金额</span>
										<br/>
			              <span style={{fontSize: '16px'}}>
											￥{yesterdayData ? number_format(yesterdayData.total_ord_amt) : 0}
										</span>
			            </Col>
			            <Col span='6'>
			              <span style={{fontSize: '14px', marginBottom: '8px'}}>成交笔数</span>
										<br/>
			              <span style={{fontSize: '16px'}}>
											{yesterdayData ? number_format(yesterdayData.total_ord_num) : 0}
										</span>
			            </Col>
									<Col span='6'>
			              <span style={{fontSize: '14px', marginBottom: '8px'}}>展现量</span>
										<br/>
			              <span style={{fontSize: '16px'}}>
											{yesterdayData ? number_format(yesterdayData.total_pv) : 0}
										</span>
			            </Col>
			            <Col span='6'>
			              <span style={{fontSize: '14px', marginBottom: '8px'}}>访客</span>
										<br/>
			              <span style={{fontSize: '16px'}}>
											{yesterdayData ? number_format(yesterdayData.total_uv) : 0}
										</span>
			            </Col>
	          		</Row>
          	</div>
						<div style={{textAlign: 'center', backgroundColor: '#fff', marginBottom: '8px', padding: '16px 0'}}>
								<Row type='flex'>
									<Col span='12'>
										<a href='ware.html'>
											<Icon type="appstore-o" style={{fontSize: '24px', color: '#108ee9', marginBottom: '8px'}}/>
											<br/>
											<span style={{width: '48%', fontSize: '14px', color: '#333'}}>产品推广</span>
										</a>
									</Col>
									<Col span='12'>
										<a href='report.html'><Icon type="file-text"  style={{fontSize: '24px', color: '#108ee9', marginBottom: '8px'}}/><br/><span style={{marginLeft: '10px', width: '48%', fontSize: '14px', color: '#333'}}>推广报表</span></a>
									</Col>
								</Row>
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
	statusStyle: {
		padding: '10px 10px 0 10px',
		fontSize: '16px',
		backgroundColor: '#fff'
	},
	codeBox: {
		padding: '16px 10px',
		marginBottom: '8px',
		backgroundColor: '#fff',
		textAlign: 'center'
	}
}
export default UserStatusView
