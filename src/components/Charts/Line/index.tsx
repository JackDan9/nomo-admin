/**
 * 
 */
import React, { useState, useEffect, useRef } from 'react';
import echarts from 'echarts';
import Debounce from 'lodash.debounce';

import autoHeight from '../autoHeight';
import { LineProps } from './data.d';


const Line: React.FC<LineProps> = (props) => {

  const { height, id } = props;

  const [autoHideXLabels, setAutoHideXLabels] = useState(false);

  let root: any = undefined;
  let node: any = undefined;

  const resize = Debounce(() => {
    if (!root || !node) {
      return;
    }
    const canvasWidth = (node.parentNode as HTMLDivElement).clientHeight;
    const { data = [] } = props;

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
    backgroundColor: "#fff",
    tooltip: {
      trigger: 'axis',
      show: true,
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '6%',
      containLabel: true
    },
    xAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
      },
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false
      },
    },

    //下面可以根据自己个性化一些 STYLE
    dataZoom: [{
      show: true,
      height: 30,
      xAxisIndex: [0],
      bottom: 30,
      "start": 10,
      "end": 80,
      handleStyle: {
        color: "#5B3AAE",
      },

    }, {
      type: "inside",
      show: true,
      height: 15,
      start: 1,
      end: 35
    }],
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 13,
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(155, 18, 184, .4)',
          shadowBlur: 5,
          shadowOffsetY: 20,
          shadowOffsetX: 0,
          color: '#fb7636',
        }
      },
      itemStyle: {
        color: '#fb7636',
        borderColor: "#fff",
        borderWidth: 2,
      },

      data: [5, 10, 41, 35, 51, 49, 62, 10, 41, 35, 51, 49, 62]
    },
    {
      name: 'B',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 13,
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(155, 18, 184, .4)',
          shadowBlur: 5,
          shadowOffsetY: 20,
          shadowOffsetX: 0,
          color: '#24b314',
        }
      },
      itemStyle: {
        color: '#24b314',
        borderColor: "#fff",
        borderWidth: 2,
      },

      data: [50, 20, 35, 20, 75, 30, 60, 20, 35, 20, 75, 30, 60]
    },
    {
      name: 'C',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 13,
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(155, 18, 184, .4)',
          shadowBlur: 5,
          shadowOffsetY: 20,
          shadowOffsetX: 0,
          color: '#027ad7',
        }
      },
      itemStyle: {
        color: '#027ad7',
        borderColor: "#fff",
        borderWidth: 2,
      },

      data: [15, 30, 15, 40, 55, 20, 40, 30, 15, 40, 55, 20, 40]
    },
    {
      name: 'D',
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 13,
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(155, 18, 184, .4)',
          shadowBlur: 5,
          shadowOffsetY: 20,
          shadowOffsetX: 0,
          color: '#8452e7',
        }
      },
      itemStyle: {
        color: '#8452e7',
        borderColor: "#fff",
        borderWidth: 2,
      },

      data: [5, 60, 20, 45, 15, 55, 25, 60, 20, 45, 15, 55, 25]
    },
    ]
  });

  let app: any = {};
  app.count = 11;
  useEffect(() => {
    let chartDom: any = document.getElementById(id);
    let myChart: any = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener('resize', resize, { passive: true });
    return (() => {
      window.removeEventListener('resize', resize);
    })
  }, [])


  return (
    <div id={ id } style={{ height }} ref={() => handleRoot}>
      <div ref={() => handleRef}>
      </div>
    </div>
  )
}

export default autoHeight()(Line);