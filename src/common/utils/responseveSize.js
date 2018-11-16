import { Dimensions, Platform, PixelRatio } from 'react-native';

const {width, height} = Dimensions.get('window');

// based on iphone 5s's scale
const heightScale = height / 640;
const widthScale = width / 320;
const scale = heightScale < widthScale ? heightScale : widthScale

export default normalize = (size) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
