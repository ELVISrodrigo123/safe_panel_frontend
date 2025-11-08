import { CustomThemeOptions, ThemeMode } from '../types/IProps';
import { lightColors, darkColors } from '../base/themeColors';
import { THEME_CONSTANTS } from '../constants/themeConstants';
import createColors from '../base/colors';

export const getThemeConfig = (mode: ThemeMode): CustomThemeOptions => {
  const baseColors = mode === 'light' ? lightColors : darkColors;
  const colors = createColors(mode);

  return {
    colors,
    general: {
      reactFrameworkColor: '#00D8FF',
      borderRadiusSm: THEME_CONSTANTS.BORDER_RADIUS.SM,
      borderRadius: THEME_CONSTANTS.BORDER_RADIUS.DEFAULT,
      borderRadiusLg: THEME_CONSTANTS.BORDER_RADIUS.LG,
      borderRadiusXl: THEME_CONSTANTS.BORDER_RADIUS.XL,
    },
    sidebar: {
      background: baseColors.primaryAlt,
      boxShadow: mode === 'light' ? '1px 0 0 #E5E7EB' : '1px 0 0 #272C48',
      width: THEME_CONSTANTS.SIDEBAR.WIDTH,
      textColor: baseColors.secondary,
      dividerBg: mode === 'light' ? '#E5E7EB' : '#272C48',
      menuItemColor: mode === 'light' ? '#6A7199' : '#9EA4C1',
      menuItemColorActive: '#ffffff',
      menuItemBg: baseColors.primaryAlt,
      menuItemBgActive: mode === 'light' ? 'rgba(234, 125, 41, 0.1)' : 'rgba(43, 48, 77, .6)',
      menuItemIconColor: mode === 'light' ? '#9CA3AF' : '#444A6B',
      menuItemIconColorActive: '#ffffff',
      menuItemHeadingColor: baseColors.secondary,
    },
    header: {
      height: THEME_CONSTANTS.SIDEBAR.HEADER_HEIGHT,
      background: baseColors.defaultBg,
      boxShadow: mode === 'light' ? '0px 1px 0px #E5E7EB' : '0px 1px 0px #272C48',
      textColor: baseColors.textPrimary,
    },
  };
};
