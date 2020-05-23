import React from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { deviceWidth } from './LoaderComponent';

const SearchComponent = (props) => {
  const {
    clampedScroll
  } = props;
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -(250)],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          {
            translateY: searchBarTranslate
          }
        ],
        opacity: searchBarOpacity,
      }
    ]}>
      <TextInput
        placeholder='Search'
        style={styles.formField}
        placeholderTextColor={'#888888'}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    width: deviceWidth - 40,
    left: 20,
    zIndex: 99,
    backgroundColor: 'white'
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50
  }
})

export default SearchComponent;