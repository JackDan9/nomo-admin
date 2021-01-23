import React from 'react';
import Icon from '@ant-design/icons';

import { tupleStr } from '@/utils/tuple';
import Dashboard from '@/assets/icons/dashboard.svg';
import Account from '@/assets/icons/account.svg';
import Fly from '@/assets/icons/fly.svg';
import Chart from '@/assets/icons/chart.svg';

const ICON_NAME_MAP = {
  dashboard: Dashboard,
  account: Account,
  fly: Fly,
  chart: Chart
}

const iconNames = tupleStr(
  'dashboard',
  'account',
  'fly',
  'chart'
)

export type IconName = typeof iconNames[number];

interface IconProps {
  className?: string
  style?: React.CSSProperties
  name: IconName
  size?: string | number
  color?: string
}

const SvgIcon: React.FC<IconProps> = (props) => {
  const { className, style, name, size = 16, color } = props;
  const iconStyle = {
    ...style,
    ...{
      fontSize: size,
      color
    }
  }
  return <Icon className={className} style={iconStyle} component={ICON_NAME_MAP[name]} />
}

export default SvgIcon;