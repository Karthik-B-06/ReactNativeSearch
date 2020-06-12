/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useMemo } from 'react';
import { Animated, SafeAreaView, StatusBar, View } from 'react-native';
import NameListItem from './src/NameListItem';
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
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'white',
            paddingTop: StatusBar.currentHeight + 50
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic">
          {usersList.map((name, index) => <NameListItem key={index} name={name} />)}
          <View style={{ height: deviceHeight * 0.4 }}></View>
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default App;
