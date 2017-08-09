import React from 'react';
import '../styles/App.css';
import ProductView from './productView';
import { connect } from 'react-redux';
import { actions } from '../redux/index/indexAction';
import { Button, Modal } from 'antd';
import axios from 'axios';
const mapStateToProps = (state) => ({
	wareData: state.wareSearchItem.wareSearchData,
	totalItem: state.wareSearchItem.totalItem,
	pageNum: state.wareSearchItem.pageNum,
	is_online: state.wareSearchItem.is_online,
	page: state.wareSearchItem.page
})

class ProExtensionView extends React.Component {
	constructor(props) {
		super()
		this.state={
			page: 1,
			pageSize: 10,
			is_online: 0
		}

	}
	componentDidMount(){
		var page = this.state.page;
		var pageSize = this.state.pageSize;
    var totalItem = this.props.totalItem;
		if(!this.props.wareData.length) {
			  this.props.loadWareSearchItem({page: page, page_size: pageSize,is_online: this.state.is_online})
		 }
	}
	//点击加载更多
	handelLoadMore () {
		var pages = this.state.page + 1;
		var page = this.state.page;
		var pageSize = this.state.pageSize;
		var datas = this.props.wareData.length;
		var totalItem = this.props.totalItem
		console.log(datas, totalItem)
		if(datas > totalItem) {
			return
		}
		this.setState({
			page: pages
		})
		 this.props.loadWareSearchItem({page: page, page_size: pageSize,is_online: this.state.is_online})
	}
	//过滤产品
	filterChange (v) {
		var page = this.props.page;
		var pageSize = this.state.pageSize;
		var datas = this.props.wareData.length;
		this.setState({
			is_online: v
		})
		this.props.loadWareSearchItem({page: page, page_size: pageSize, is_online: v})
 }
 //推广中
 changeStatusItems (wareId) {
	var newselect = [];
	var newstr = ''
	this.props.wareData.map((item) =>{
		if(item.wareId == wareId) {
			newselect.push(item.wareId)
		}
	})
	newstr = newselect.join(',')
 this.props.loadsetItemsOnlineItem({items: newstr})
 }
 //取消推广
 changeOfflineItems (wareId) {
	var newselect = [];
 	var newstr = ''
 	this.props.wareData.map((item) =>{
 		if(item.wareId == wareId) {
 			newselect.push(item.wareId)
 		}
 	})
 	newstr = newselect.join(',')
  this.props.loadsetItemsOfflineItem({items: newstr})
 }
 //批量推广
 setBatchChange (select) {
	if(select.length == 0){
		Modal.error({
			title: '温馨提示',
			content: '请先选择商品再进行推广',
		});
		 return
	 }
	 var newstr = ''
	 newstr = select.join(',')
	 this.props.loadsetBatchOnlineItem({items: newstr})

 }
 //批量暂停
 setOfflineChange (select) {
	 if(select.length == 0){
 		Modal.error({
 			title: '温馨提示',
 			content: '请先选择商品再暂停推广',
 		});
 		 return
 	 }
	 var newstr = ''
	 newstr = select.join(',')
	 this.props.loadsetBatchOfflineItem({items: newstr})
 }
 render () {
		var datas = this.props.wareData;
			return (
				   <ProductView data={datas}
					 							totalItem={this.props.totalItem}
												pageSize={this.state.pageSize}
												onLoadMore={this.handelLoadMore.bind(this)}
												pageNum={this.props.pageNum}
												is_online={this.props.is_online}
												filterChange={this.filterChange.bind(this)}
												changeStatusItems={this.changeStatusItems.bind(this)}
												changeOfflineItems={this.changeOfflineItems.bind(this)}
												setBatchChange={this.setBatchChange.bind(this)}
												setOfflineChange={this.setOfflineChange.bind(this)}
												/>
				)


	}
}


export default connect(mapStateToProps, actions)(ProExtensionView);
