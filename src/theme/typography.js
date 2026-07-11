import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

const fontFamilyMedium = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
});

const fontFamilyBold = Platform.select({
  ios: 'System',
  android: 'sans-serif',
});

export const Typography = {
  h1: {
    fontFamily: fontFamilyBold,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  h2: {
    fontFamily: fontFamilyBold,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  h3: {
    fontFamily: fontFamilyBold,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  h4: {
    fontFamily: fontFamilyMedium,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.1,
    lineHeight: 24,
  },
  body: {
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: fontFamilyMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  bodySm: {
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmMedium: {
    fontFamily: fontFamilyMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  captionMedium: {
    fontFamily: fontFamilyMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  tiny: {
    fontFamily: fontFamily,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
  },
  button: {
    fontFamily: fontFamilyMedium,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  buttonSm: {
    fontFamily: fontFamilyMedium,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  price: {
    fontFamily: fontFamilyBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  priceSm: {
    fontFamily: fontFamilyBold,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  tag: {
    fontFamily: fontFamilyMedium,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    lineHeight: 14,
  },
};

export default Typography;
