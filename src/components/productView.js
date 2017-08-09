import React from 'react';
import { Row, Col, Checkbox, Modal, Button, Icon} from 'antd';
import FilterItem from './filter';
//import { Link } from 'react-router-dom';
//import YusuanView from './yusuan';
import EditInline from './editInline';
import {number_format} from './util';
import axios from 'axios';
import { GetUser, GetBudget, SetBudget, GetCpc, SetCpc } from '../help/url';

export default class ProductView extends React.Component {
	constructor(props) {
		super()
		this.state={
			dataList: [],
			checked: false,
			selectList: [],
      editcpc: false,
      editbudget: false,
			account_id: 0,
			nick: '',
			basicShpData: {},
			budget: 0,
			cpc: 0,
			balance: 0,
			allChecked: false
		}
	}
  componentWillMount () {
		var _this = this
		//获取余额
		axios.get(GetUser)
	  .then(function (response) {
			_this.setState({
				balance: response.data.user.balance
			})
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
		//获取日限额
		axios.get(GetBudget)
	  .then(function (response) {
			_this.setState({
				budget: response.data.user.budget
			})
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
		//获取出价
		axios.get(GetCpc)
	  .then(function (response) {
			_this.setState({
				cpc: response.data.user.cpc
			})
	   })
	  .catch(function (error) {
	    console.log(error);
	  });
	}


	//点击全选按钮
	onAllchangeItem (checked) {
		var data = this.props.data;
	  if(checked) {
			let newarr = []
			for(var i=0; i<data.length; i++) {
				newarr.push(data[i].wareId)
			}
			this.setState({
				allChecked: true,
				selectList: newarr
			})
		} else{
			this.setState({
				allChecked: false,
				selectList: []
			})
		}
	}
	//点击list复选框
	onChangeItem (checked, wareId) {
		var select= this.state.selectList
		let newselect
		if (checked) {
			//let idx = select.indexOf(wareId)
			newselect= [...select, wareId]

	 } else {
		 let idx = select.indexOf(wareId) //返回当前值在数组中的索引
		 newselect = [...select.slice(0, idx), ...select.slice(idx + 1)]
	 }
	this.setState({
				selectList: newselect
		})
	}
	//批量推广
	onBatchItems () {
		this.props.setBatchChange(this.state.selectList)
		this.setState({
					selectList: []
			})
	}
	//批量暂停
	onBatchOffline () {
		this.props.setOfflineChange(this.state.selectList)
		this.setState({
					selectList: []
			})
	}
	//推广中
	changeStatus (wareId) {
		this.props.changeStatusItems(wareId)

	}
	//取消推广
	changeOfflineStatus (wareId) {
		this.props.changeOfflineItems(wareId)
	}

	renderitemList () {
		var data = this.props.data;
		const self = this;
    const select = self.state.selectList;
		if(data.length > 0) {
			return( data.map((item) =>{
				var new_onLineStatus = item.is_online ==0 ? '未推广' : '推广中';
				return (
					<Row style={{ padding: 10, background: '#fff',marginBottom: '1px'}} key={item.wareId}>
						<Col span={2}>
						  <Checkbox
									defaultChecked={select.indexOf(item.wareId) > -1}
									onChange={ (e) => { this.onChangeItem(e.target.checked, item.wareId) } }
									checked={select.indexOf(item.wareId) > -1}/>
						</Col>
						<Col span={6}>
						 {
							 item.images && item.images.length > 0
							 ? <img src={item.images[0].imgUrl} style={{width: '80px', height: '80px'}}/>
							 : <span>暂无图片</span>
						 }
						 </Col>
						<Col span={16}>
							<div>
								<div style={styles.titledetail}>{item.title}</div>
								<Row style={{margin: '10px 0 0 0'}}>
									<Col style={{color: '#f36b73'}} span={12}>
										<span>￥</span>
										<span style={{fontSize: '20px'}}>{item.marketPrice}</span>
									</Col>
									<Col span={12}>
										{
											item.is_online == 0
											? <Button onClick={() => this.changeStatus(item.wareId)}>{new_onLineStatus}</Button>
											: <Button onClick={() => this.changeOfflineStatus(item.wareId)}>{new_onLineStatus}</Button>
										}
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				)
			})
		 )
		} else {
			return (<div style={{textAlign: 'center',marginTop: '100px'}}><Icon type='frown-o'/> &nbsp;<span>暂时没有数据</span></div>)
		}
	}
	closeEditCpc () {
    var self = this
    setTimeout(function () {
      self.setState({editcpc: false})
    }, 200)
  }
	sendcpcValue (num) {
		var _this = this;
		if(num < 0.6) {
			Modal.error({
		    title: '温馨提示',
		    content: '单次点击出价不能低于 0.6元',
		  });
			return
		} else if(num > 50) {
			Modal.error({
		    title: '温馨提示',
		    content: '单次点击出价不能高于 50元',
		  });
			return
		}
		axios.post(SetCpc, {
	    campaign_type:0,
			cpc: num
	  })
	  .then(function (response) {
			_this.setState({
				cpc: response.data.user.cpc
			})
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  }
	editcpc () {
    this.setState({editcpc: true})
  }
	renderCpc () {
    var editMode = this.state.editcpc
    var self = this
    var showdata = this.state.cpc
    return (
        editMode
        ? <EditInline blur={this.closeEditCpc.bind(this)} defaultValue={showdata} sendvalue={ this.sendcpcValue.bind(this) }/>
        : <div className='text-center'>
            <Button onClick={self.editcpc.bind(self)}>修改出价</Button>
          </div>
    )
  }
	editBudget () {
	 this.setState({editbudget: true})
 }
	sendBudgetValue (num) {
		var _this = this;
		if(num < 50) {
			Modal.error({
		    title: '温馨提示',
		    content: '每日消耗预算不能低于 50元',
		  });
			return
		} else if(num > 5000) {
			Modal.error({
		    title: '温馨提示',
		    content: '每日消耗预算不能高于 5000元',
		  });
			return
		}
		axios.post(SetBudget, {
	    campaign_type:0,
			budget: num
  })
  .then(function (response) {
		_this.setState({
			budget: response.data.user.budget
		})
  })
  .catch(function (error) {
    console.log(error);
  });
}
	closeEditBudget () {
    var self = this
    setTimeout(function () {
      self.setState({editbudget: false})
    }, 200)
  }
	renderBudget () {
    var editMode = this.state.editbudget
    var self = this
    const showdata = this.state.budget
    return (
      editMode
        ? <EditInline blur={self.closeEditBudget.bind(self)} defaultValue={showdata} sendvalue={this.sendBudgetValue.bind(this)}/>
        : <div className='text-center'>
            <Button onClick={self.editBudget.bind(self)}>修改预算</Button>
          </div>
    )
  }
	renderloadBtn () {
		var pageSize = this.props.pageSize;
		var datas = this.props.data.length;
		var totalItem = this.props.totalItem;
		if(datas > totalItem) {
			return (<div style={{marginTop: '8px', marginBottom: '15px'}}>加载完成</div>)
		} else{
			if(datas === 0 || datas < pageSize) {
				return null
			} else if (datas < totalItem){
				return (<Button onClick={this.props.onLoadMore} style={{marginTop: '8px', width: '100%', height: '40px', marginBottom: '15px'}}>点击加载更多</Button>)
			}
			else {
				return null
			}
		}
	}
	savefee () {
		var url ='https://jmplus.jd.com/adapter/pluginDetail.action?pluginCode=f3c8e9f377254d99ba459c4132de8234 ';
    JmJsBridge.call('openPage', {'url': url});
  }
	render () {
		var showdata = this.state.budget;
		var cpc = this.state.cpc;

		return (
			<div className='ProductView'>
							<div style={{marginBottom: '8px', background: '#fff'}} id='top'>
	            	<Row style={{padding: '10px 10px 10px 10px'}}>
	            		<Col span={16}><span style={{fontSize: '14px'}}>推广余额:</span> &nbsp;
									<span style={{fontSize: '16px'}}><strong>{ number_format(this.state.balance) || 0} </strong>元</span>
									</Col>
	            		<Col span={8}><Button onClick={this.savefee.bind(this)}>我要续费</Button></Col>
	            	</Row>
								<Row style={{padding: '0 10px 10px 10px'}}>
	            		<Col span={16}>
										<span style={{fontSize: '14px'}}>每日消耗预算:</span>&nbsp;
										<span style={{fontSize: '16px'}}><strong> { number_format(showdata) || 0 } </strong>元</span>
									</Col>
									<Col span={8}>
										{ this.renderBudget() }
									</Col>
	            	</Row>
	            	<Row style={{padding: '0 10px 10px 10px'}}>
	            		<Col span={16}>
										<span style={{fontSize: '14px'}}>单次点击出价:</span>&nbsp;
										<span style={{fontSize: '16px'}}><strong> { number_format(cpc) || 0 } </strong>元</span>
									</Col>
									<Col span={8}>
										{ this.renderCpc() }
									</Col>
	            	</Row>
	            </div>
	            <div style={{padding: '10px 10px 20px 10px',background: '#fff'}}>
	            	<Row>
	            		<Col span={12}>
	            			<FilterItem onChange={this.props.filterChange}/>
	            		</Col>
	            		<Col span={12}>
										<a href='report.html'  style={{marginLeft: '15px', display: 'inline-block'}}><Button>推广报表</Button></a>
									</Col>
	            	</Row>
	            </div>
							<div>
									<Row style={{padding: '10px 10px 20px 10px', background: '#fff'}}>
										<Col span={12}>
											<Checkbox defaultChecked={this.state.allChecked}
																onChange={ (e) => { this.onAllchangeItem(e.target.checked) }}
																checked={this.state.allChecked}
																style={{fontSize: '14px'}}>
																全选
											</Checkbox>
										</Col>
										<Col span={12}>
											<Row>
												<Col span={10}>
													<Button onClick={this.onBatchItems.bind(this)}>批量推广</Button>
												</Col>
												<Col span={10}>
													<Button onClick={this.onBatchOffline.bind(this)} style={{marginLeft: '15px'}}>批量暂停</Button>
												</Col>
											</Row>
										</Col>
									</Row>
									{
										this.renderitemList()
									}
									{
										<div style={{textAlign: 'center'}}>{this.renderloadBtn()}</div>

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
	titledetail : {
		width: '95%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	}
}
