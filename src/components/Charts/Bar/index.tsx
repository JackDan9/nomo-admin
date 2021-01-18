/**
 * 
 */
import React, { useState, useEffect, useRef } from 'react';
import echarts from 'echarts';
import Debounce from 'lodash.debounce';

import autoHeight from '../autoHeight';
import { BarProps } from './data.d';


const Bar: React.FC<BarProps> = (props) => {

  const { height, id, chartOptionData } = props;

  const [autoHideXLabels, setAutoHideXLabels] = useState(false);

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

  /**
   * 
   */
  const [option, setOption] = useState<any>({
    title: {
      show: false,
      text: '动态数据',
      subtext: '纯属虚构'
    },
    legend: {
      data: [
        {name: '最新成交'}, {name: '预购队列'}]
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
    toolbox: {
      show: false,
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
        color: 'rgba(24, 144, 255, 0.85)',
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
        name: '最新成交',
        type: 'line',
        color: 'blue',
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
  
  option.title = chartOptionData.title;
  option.legend = chartOptionData.legend;
  option.tooltip = chartOptionData.tooltip;
  option.toolbox = chartOptionData.toolbox;
  option.dataZoom = chartOptionData.dataZoom;
  option.xAxis = chartOptionData.xAxis;
  option.yAxis = chartOptionData.yAxis;
  option.series = chartOptionData.series;

  useEffect(() => {
    let chartDom: any = document.getElementById(id);
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
    <div id={id} style={{ height }} ref={() => handleRoot}>
      <div ref={() => handleRef}>
      </div>
    </div>
  )
}

export default autoHeight()(Bar);