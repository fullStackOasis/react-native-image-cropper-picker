/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import React, { useState, useEffect } from 'react';

/* Error handling has not been tested. */
/* Error handling has not been tested. */
/* Error handling has not been tested. */
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
/* Error handling has not been tested. */
/* Error handling has not been tested. */
/* Error handling has not been tested. */

import type {PropsWithChildren} from 'react';
type YourImageProps = PropsWithChildren<{
  title: string;
  file: string;
}>;

// This image can use a file location or data.
// The app demos both use cases.
const YourImage = ({file, title} : YourImageProps) => {
  console.log('file ' + file);
  console.log('title ' + title);
  return (<Image style={styles.image}
    source={{ uri: file }}
  />)};


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

/* Error handling has not been tested. */
/* Error handling has not been tested. */
/* Error handling has not been tested. */
const handleError = (error: Error, isFatal: boolean) => {
  // fetch
  console.log(error, isFatal);
  console.log(error.name);
};

setJSExceptionHandler((error, isFatal) => {
  console.log('caught global error');
  handleError(error, isFatal);
}, true);

setNativeExceptionHandler((errorString) => {
  // do the things
  console.log('errorString');
  console.error(errorString);
});
/* Error handling has not been tested. */
/* Error handling has not been tested. */
/* Error handling has not been tested. */

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  console.log("App called");
  const isDarkMode = useColorScheme() === 'dark';

  // Default display image is the React atom
  const [displayImage, setDisplayImage] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==');

  const [message, setMessage] = useState('Hello World!');

  useEffect(() => {
    async function getFilePath() {
      const filePath = await AsyncStorage.getItem('@ReactNativeImageCropPicker:filePath');
      if (!!filePath) {
        setDisplayImage(filePath);
      }
    };
    getFilePath();
  }, [displayImage]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const openCropper = () => {
    setMessage('ImagePicker.openPicker works!');
    console.log("openCropper called");
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      // The message never changes, which was not expected.
      // The App reopens after the camera or library are done,
      // so data must be stored.
      setMessage('ImagePicker.openPicker works!');
      AsyncStorage.setItem('@ReactNativeImageCropPicker:filePath',
        image.path);
    }).catch(e => console.error(e));
  };

  const openCamera = () => {
    console.log("openCamera called");
    setMessage('ImagePicker.openCamera works!');
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      // The message never changes, which was not expected.
      // The App reopens after the camera or library are done,
      // so data must be stored.
      setMessage('ImagePicker.openCamera works!');
      // Example result:
      // {"cropRect": {"height": 478, "width": 478, "x": 416, "y": 885},
      // "height": 300, "mime": "image/jpeg", "modificationDate": "1685492027000",
      // "path": "file:///storage/emulated/0/Android/data/com.reactnativeimagecroppicker/files/Pictures/d1003d4e-f2df-4ce4-962e-c399361ab9fc.jpg",
      // "size": 71473, "width": 300}
      AsyncStorage.setItem('@ReactNativeImageCropPicker:filePath',
        image.path);
    }).catch(e => console.error(e));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title={message}>
          </Section>
          <Button title="Click for Photo Crop Test" onPress={openCropper}></Button>
          <View><Text> </Text></View>
          <Button title="Click for Camera Crop Test" onPress={openCamera}></Button>
          <View><Text> </Text></View>
          <YourImage file={displayImage} title='See Your Changes'/>
          <Section title="Instructions">
            Click the buttons above to test ImagePicker functionality
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default App;
