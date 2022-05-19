import React from 'react';
import Icon from '@ant-design/icons';

import { tupleStr } from '@/utils/tuple';
import Dashboard from '@/assets/icons/dashboard.svg';
import Account from '@/assets/icons/account.svg';
import Fly from '@/assets/icons/fly.svg';
import Chart from '@/assets/icons/chart.svg';
import Business from '@/assets/icons/business.svg';
import Brand from '@/assets/icons/brand.svg';
import News from '@/assets/icons/news.svg';
import Recurite from '@/assets/icons/recurite.svg';

const ICON_NAME_MAP = {
  dashboard: Dashboard,
  account: Account,
  fly: Fly,
  chart: Chart,
  business: Business,
  brand: Brand,
  news: News,
  recurite: Recurite
}

const iconNames = tupleStr(
  'dashboard',
  'account',
  'fly',
  'chart',
  'business',
  'brand',
  'news',
  'recurite'
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