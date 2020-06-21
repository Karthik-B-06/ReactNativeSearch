import React, { useMemo, useState, useEffect } from 'react';
import { Animated, ScrollView, StatusBar, StyleSheet, TextInput, View, Text, TouchableHighlight, Platform } from 'react-native';
import mockList from './helpers/mockList';
import { deviceWidth } from './LoaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchComponent = (props) => {
  const {
    clampedScroll
  } = props;
  const [textInputFocussed, setTextInputFocussed] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState(props.searchedTerm);
  const temporarySearchResults = useMemo(() => {
    const list = mockList.filter((name) => {
      return name.includes(searchTerm)
    })
    return list;
  }, [searchTerm])

  const handleBlur = () => {
    setTextInputFocussed(false);
    props.setSearchedTerm(searchTerm)
  }
  const renderSearchList = () => {
    return (
      <View style={styles.searchList}>
        {
          temporarySearchResults.length === 0 && (
            <View style={styles.searchListItem}><Text style={styles.searchListItemText}>No match found</Text></View>
          )
        }
        {
          temporarySearchResults.slice(0, 3).map((name, index) => {
            return (
              <View key={index} style={styles.searchListItem}>
                <Text style={styles.searchListItemText}>{name}</Text>
              </View>
            )
          })
        }
        {
          temporarySearchResults.length !== 0 && <TouchableOpacity onPress={() => props.setSearchedTerm(searchTerm)}>
            <View style={styles.searchListItem}>
              <Text style={[
                styles.searchListItemText,
                {
                  color: '#ff5d51'
                }
              ]}>See all ({temporarySearchResults.length}) names</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }

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
        defaultValue={props.searchedTerm}
        placeholder='Search'
        style={styles.formField}
        placeholderTextColor={'#888888'}
        onFocus={() => setTextInputFocussed(true)}
        onBlur={handleBlur}
        onChange={(event) => setSearchTerm(event.nativeEvent.text)}
        returnKeyType='send'
        onSubmitEditing={() => props.setSearchedTerm(searchTerm)}
      />
      {
        (textInputFocussed) && (
          <ScrollView contentContainerStyle={{
            backgroundColor: '#FFFFFF',
          }} style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            // top: StatusBar.currentHeight + 60,
            left: 0,
            zIndex: 9999,
            width: deviceWidth,
            height: 800,
          }}>
            {searchTerm.length > 0 && renderSearchList()}
          </ScrollView>
        )
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: deviceWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
  },
  formField: {
    backgroundColor: '#F4F4F4',
    width: deviceWidth - 40,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50
  },
  searchList: {
    paddingLeft: 30
  },
  searchListItem: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    paddingRight: 16,
    borderColor: '#DBDBDB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchListItemText: {
    fontSize: 20,
    maxWidth: '85%',
  }
})

export default SearchComponent;