/**
 * 
 */
import React, { useState, useEffect, useRef } from 'react';
import echarts from 'echarts';
import Debounce from 'lodash.debounce';

import autoHeight from '../autoHeight';
import { BarProps } from './data.d';


const Bar: React.FC<BarProps> = (props) => {

  const { height } = props;

  const [autoHideXLabels, setAutoHideXLabels] = useState(false);
  
  // const [root, setRoot] = useState<HTMLDivElement | undefined>(undefined);
  // const [node, setNode] = useState<HTMLDivElement | undefined>(undefined);
  let root:any = undefined;
  let node:any = undefined;

  const resize = Debounce(() => {
    if (!root || !node) {
      return;
    }
    const canvasWidth = (node.parentNode as HTMLDivElement).clientHeight;
    const { data = [], autoLabel = true } = props;
    if (!autoLabel) {
      return;
    }

    const minWidth = data.length * 30;
    if (canvasWidth < minWidth) {
      if (!autoHideXLabels) {
        setAutoHideXLabels(true);
      }
    } else if (autoHideXLabels) {
      setAutoHideXLabels(true);
    }
  }, 500);

  const handleRoot = useRef((n: HTMLDivElement) => {
    root = n;
  });

  const handleRef = useRef((n: HTMLDivElement) => {
    node = n;
  });

  const [option, setOption] = useState({
    title: {
      text: '动态数据',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {
      data: ['最新成交价', '预购队列']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function () {
          let now: any = new Date();
          let res: any = [];
          let len = 10;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function () {
          let res: any = [];
          let len: any = 10;
          while (len--) {
            res.push(10 - len - 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '价格',
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '预购量',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name: '预购队列',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: (function () {
          let res: any = [];
          let len: any = 10;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })()
      },
      {
        name: '最新成交价',
        type: 'line',
        data: (function () {
          let res: any = [];
          let len: any = 0;
          while (len < 10) {
            res.push((Math.random() * 10 + 5).toFixed(1));
            len++;
          }
          return res;
        })()
      }
    ]
  });

  let app: any = {};
  app.count = 11;
  useEffect(() => {
    let chartDom: any = document.getElementById('chart');
    let myChart: any = echarts.init(chartDom);
    setInterval(function () {
      let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

      let data0:any = option.series[0].data;
      let data1:any = option.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1));

      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);
      option.xAxis[1].data.shift();
      option.xAxis[1].data.push(app.count++);

      myChart.setOption(option);
    }, 2100);

    window.addEventListener('resize', resize, {passive: true});
    return (() => {
      window.removeEventListener('resize', resize);
    })
  }, [])


  return (
    // <div id="chart" style={{ width: '100%', height: '600px' }} ref={() => handleRoot}>
    //   <div ref={() => handleRef}>
    //   </div>
    // </div>
    <div id="chart" style={{ height }}></div>
  )
}

export default Bar;