/**
 * 
 */
import React, { useState, useEffect, useRef } from 'react';
import echarts from 'echarts';
import Debounce from 'lodash.debounce';

import autoHeight from '../autoHeight';
import { PieProps } from './data.d';


const Pie: React.FC<PieProps> = (props) => {

  const { height } = props;

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
    title: {
      show: false,
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  let app: any = {};
  app.count = 11;
  useEffect(() => {
    let chartDom: any = document.getElementById('chart-pie');
    let myChart: any = echarts.init(chartDom);
    myChart.setOption(option);
    window.addEventListener('resize', resize, { passive: true });
    return (() => {
      window.removeEventListener('resize', resize);
    })
  }, [])


  return (
    <div id="chart-pie" style={{ height }} ref={() => handleRoot}>
      <div ref={() => handleRef}>
      </div>
    </div>
  )
}

export default autoHeight()(Pie);