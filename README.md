# Demo of react-native-image-crop-picker

This project uses [react-native-image-crop-picker](https://www.npmjs.com/package/react-native-image-crop-picker) to display an image that you took with your camera or picked from your image library.

The image that you take or pick is stored locally after (optionally) cropping it.

The app restarts after the image cropping takes place. This means you cannot rely on state to save your image file, but you have to save it in some way. This app uses `AsyncStorage` for that purpose. Because it's a demo app, images are not cleaned up, so be aware of that.

The [react-native-exception-handler](https://www.npmjs.com/package/react-native-exception-handler) was also installed to capture exceptions, if any, but none were triggered so that's untested.