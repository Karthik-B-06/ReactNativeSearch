/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useMemo } from 'react';
import { Animated, SafeAreaView, StatusBar, View, Platform } from 'react-native';
import NameListItem, { deviceWidth } from './src/NameListItem';
import SearchComponent from './src/SearchComponent';
import { deviceHeight } from './src/LoaderComponent';
import mockList from './src/helpers/mockList';
import 'react-native-gesture-handler';

console.disableYellowBox = true;

const App = () => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [searchedTerm, setSearchedTerm] = useState('');
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )
  const usersList = useMemo(() => {
    if (searchedTerm.length === 0) {
      return mockList;
    }
    const list = mockList.filter((name) => {
      return name.includes(searchedTerm)
    });
    return list;
  }, [searchedTerm])
  return (
    <Animated.View style={{
      backgroundColor: 'white',
      flex: 1,
    }}>
      <StatusBar barStyle="dark-content" backgroundColor='white' translucent={true} />
      <View style={{ height: Platform.OS === 'ios' ? StatusBar.currentHeight + 50 : 20 }}></View>
      <View style={{ position: 'relative' }}>
        {Platform.OS === 'ios' && (
          <SearchComponent searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} />
        )}
        <Animated.ScrollView
          stickyHeaderIndices={Platform.OS === 'android' ? [0] : []}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'white',
            paddingTop: Platform.OS === 'ios' ? 70 : 0
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: 'white',
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}>
          {Platform.OS === 'android' && (
            <SearchComponent searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} />
          )}
          {usersList.map((name, index) => <NameListItem key={index} name={name} />)}
        </Animated.ScrollView>
      </View>
    </Animated.View>
  );
};

export default App;
