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
  
}