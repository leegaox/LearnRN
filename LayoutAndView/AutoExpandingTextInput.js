/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';


/**
 * 自定义高度动态调整的TextInput
 */
export default class AutoExpandingTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '', height: 0 };
    this._onChange = this._onChange.bind(this);
    this._onContentSizeChange =this._onContentSizeChange.bind(this);
  }

  _onChange(event){

    this.setState({
      text: event.nativeEvent.text,
    });
    //自定义属性给与外部使用
    this.props._onChange(event);
  };

  _onContentSizeChange(event){
    this.setState({
      height: event.nativeEvent.contentSize.height
  });
    this.props._onContentSizeChange(event);
  }
  

  render() {
    return (
      <TextInput {...this.props} multiline={true}
        onChange={this._onChange} 
        onContentSizeChange={this._onContentSizeChange}
        style={[styles.textInputStyle, { height: Math.max(35, this.state.height) }]}
        value={this.state.text} />
    );
  }
}

var styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 20,
    width: 300,
    height: 30,
    backgroundColor: 'grey',
    paddingTop: 0,
    paddingBottom: 0,
  }
});




