import React from 'react';
import { Dimensions, View } from 'react-native';
export const deviceWidth = Dimensions.get('window').width;

const PlaceholderComponent = props => (
  <View
    style={{
      height: 200,
      width: (deviceWidth - 70) / 2,
    }}
  >
    <View
      style={{
        borderRadius: 20,
        backgroundColor: '#f3f3f3',
        height: 180,
        width: (deviceWidth - 70) / 2
      }}
    ></View>

  </View>
)


export default PlaceholderComponent;