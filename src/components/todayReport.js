import React from 'react';
import TodayLineChart from './todayLineChart';
import {Spin, Icon}  from 'antd';
export default class TodayReportView extends React.Component {
  render () {
    var newData = this.props.todayData.data
    return (
      <div style={{background: '#fff', marginBottom: '8px'}}>
        <div style={{fontSize: '16px',  padding:'10px'}}><Icon type='area-chart' style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}} />&nbsp;今日推广报表</div>
        {newData && newData.length > 0
          ? <TodayLineChart todaydataSource={ newData }/>
          : <div style={{textAlign: 'center',padding: '50px 0'}}><Icon type='frown-o' />&nbsp;&nbsp;暂无数据</div>
        }
      </div>
    )
  }
}
const styles = {
  loading: {
  textAlign: 'center',
  borderRadius: '4px',
  marginBottom: '20px',
  padding: '30px 50px',
  margin: '20px 0',
	width: '100%'
}
}
