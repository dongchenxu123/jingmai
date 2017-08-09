import React from 'react';
import { Spin, Row, Col, Button, Icon } from 'antd';
import OrdamtChart from './ordamtChart';
import OrdnumChart from './ordnumChart';
import TotalpvChart from './totalpvChart';
export default class ShopHistoryReport extends React.Component {
  constructor(props) {
		super()
		this.state={
			costnum: false,
			ordnum: false,
			ordamt: false
		}
  }
  createcostData () {
    this.setState({
      costnum: true,
      ordnum: false,
      ordamt: false
    })
  }
  createOrdnumData () {
    this.setState({
      ordnum: true,
      costnum: false,
      ordamt: false
    })
  }
  createOrdamtData () {
    this.setState({
      ordamt: true,
      costnum: false,
      ordnum: false
    })
  }

  renderDataList () {
    var alldata = this.props.shopData
    if(alldata && alldata != null) {
      if(this.state.ordnum == true) {
        return (<OrdnumChart dataSource={alldata} />)
      } else if (this.state.costnum == true) {
        return (<OrdamtChart dataSource={alldata} />)

      } else if (this.state.ordamt == true) {
        return (<TotalpvChart dataSource={alldata} />)

      } else {
        return (<TotalpvChart dataSource={alldata} />)
      }
    }else{
      return (
        <div style={styles.loading}><Spin/></div>
      )
    }
  }
  render () {
    var alldata = this.props.shopData
    return (
      <div style={{background: '#fff'}}>
        <div style={{fontSize: '16px', padding: '10px'}}><Icon type="shop" style={{color: '#d73435', fontSize: '18px', fontWeight: 'bold'}}/>&nbsp;店铺历史数据</div>
        {alldata ? <div>
              {
                this.renderDataList()
              }
              <div style={{textAlign: 'center', marginTop: '-15px', paddingBottom: '20px'}}>
                <Button style={{width: '30%'}} onClick={this.createOrdamtData.bind(this)}>浏览量</Button>
                <Button style={{width: '30%', marginLeft: '10px'}} onClick={this.createcostData.bind(this)}>成交金额</Button>
                <Button style={{width: '30%', marginLeft: '10px'}} onClick={this.createOrdnumData.bind(this)}>成交笔数</Button>
              </div>
            </div>
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
