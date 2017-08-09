import React from 'react';
import {theme} from '../help/theme'
const Echarts = window.echarts
let todayCloudOption = {
  title: {
    textStyle: {
      color: '#333',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: 40,
    right: 40,
    top: 40
  },
  legend: {
    data: ['点击量', '花费'],
    left: 0
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '点击量',
      type: 'line',
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'macarons'}}},
      data: []
    },
    {
      name: '花费',
      type: 'line',
      smooth:true,
      itemStyle: {normal: {areaStyle: {type: 'macarons'}}},
      data: []
    }
  ]
}
let todaychart = null
export class TodayLineChart extends React.Component {
  static propTypes = {
    //dataSource: PropTypes.object.isRequired
  };
  updateChart (clicks = [], cost = [], recordOn = []) {
    todayCloudOption.series[0].data = clicks
    todayCloudOption.series[1].data = cost
    todayCloudOption.xAxis[0].data = recordOn.map((v) => { return v + '时' })
    todaychart.setOption(todayCloudOption)
  }
  componentDidMount () {
    todaychart = Echarts.init(document.getElementById('todaylinechart'), theme)
    todaychart.setOption(todayCloudOption)
    // let clicks = []
    // let cost = []
    // let recordOn = []
    // const todaydata = this.props.todaydataSource
    // if( todaydata && todaydata.length > 0) {
    //   var data = [].concat(todaydata)
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i].clicks === '') {
    //       continue
    //     }
    //     clicks.push(data[i].clicks)
    //     cost.push(data[i].cost)
    //     recordOn.push(i)
    //   }
    //   this.updateChart(clicks, cost, recordOn)
    // } else {
    //   this.updateChart(clicks, cost, recordOn)
    // }
  }

  componentWillReceiveProps (nextProps) {
    let clicks = []
    let cost = []
    let recordOn = []
    if (nextProps.todaydataSource && nextProps.todaydataSource.length > 0) {
      const todaydata = nextProps.todaydataSource
      var data = [].concat(todaydata)
      for (var i = 0; i < data.length; i++) {
        if (data[i].clicks === '') {
          continue
        }
        clicks.push(data[i].clicks)
        cost.push(data[i].cost)
        recordOn.push(i)
      }
      this.updateChart(clicks, cost, recordOn)
    } else {
      this.updateChart(clicks, cost, recordOn)
    }
  }
  render () {
    return (
      <div style={{height: '280px', width: '100%'}} className='linechart' id='todaylinechart'></div>
    )
  }
}

export default TodayLineChart
