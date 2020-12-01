import logoSvg from '@/assets/images/logo.svg';
import loginBg from '@/assets/images/login_bg.jpg';

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
  logo: logoSvg,
  chineseName: '拉姆达',
  englishName: 'Lamuda',
  title: 'Admin Lamuda',
  userLayoutBg: loginBg
} as DefaultSettings;