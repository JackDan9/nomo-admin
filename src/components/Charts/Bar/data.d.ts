export interface BarProps {
  id: string,
  title?: React.ReactNode,
  subtext?: string,
  padding?: [number, number, number, number],
  height?: number,
  autoLabel?: boolean,
  data?: {
    x: string;
    y: number;
  }[],
  chartOptionData: {
    title: {
      show: boolean,
      text?: string,
      subtext?: string,
    },
    legend?: {
      show: boolean,
      data: {
        name?: string | '',
        icon?: string | '',
        textStyle?: {
          color?: string | 'blue',
        } 
      }[]
    },
    tooltip?: {
      show: boolean,
      trigger: string,
      axisPointer: {
        type: string,
        label: {
          backgroundColor: string,
        },
      },
    },
    toolbox?: {
      show: boolean,
      feature?: {
        dataView: { readOnly: boolean },
        restore?: object,
        saveAsImage?: object,
      },
    },
    dataZoom?: {
      show?: boolean,
      start?: number,
      end?: number,
    },
    xAxis?: {
      type?: string,
      boundaryGap?: boolean,
      data?: [],
    }[],
    yAxis?: {
      type?: string,
      scale?: boolean,
      name?: string,
      max?: number,
      min?: number,
      boundaryGap?: number[], 
    }[],
    series?: {
      name?: string,
      type?: string,
      xAxisIndex?: number,
      yAxisIndex?: number,
      color?: string,
      data: [],
    }[],
  },
}