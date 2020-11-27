import { MenuTheme } from 'antd/es/menu';

export interface DefaultSettings {
  /**
   * Admin Logo 
   */
  logo: string;
  /**
   * Admin Chinese Name
   */
  chineseName: string,
  /**
   * Admin English Name
   */
  englishName: string,
  /**
   * Admin Title
   */
  title: string,
  /**
   * Admin UserLayout Background Image
   */
  userLayoutBg: string
}

export default {
  logo: '@/assets/images/logo.svg',
  chineseName: '拉姆达',
  englishName: 'Lamuda',
  title: 'Admin Lamuda',
  userLayoutBg: '@/assets/images/login_bg.jpg'
}