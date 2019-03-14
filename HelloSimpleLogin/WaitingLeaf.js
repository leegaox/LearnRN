/**
 * 等待页面组件
 * @format
 * @flow
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {  StyleSheet, Text, View} from 'react-native';

export default class WaitingLeaf extends Component {
  static navigationOptions={
    title:'登录中',
  };

  constructor(props) {
    super(props);
    this.onGoBackPressed =this.onGoBackPressed.bind(this);
  }

  render() {
    const {params} =this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.textPromptStyle}>登陆使用手机号：{this.props.phoneNumber}</Text>
        <Text style={styles.textPromptStyle} >登陆使用密码：{this.props.userPwd}</Text>
        <Text style={styles.bigTextPromt} onPress={() => this.onGoBackPressed()} >返回</Text>
      </View>
    );
  }

  onGoBackPressed(){
    // this.props.onGoBackPressed();
    this.props.navigation.goBack();
  }

}

// WaitingLeaf.PropTypes={
//   phoneNumber:PropTypes.string,
//   userPW:PropTypes.string 
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F5FCFF'
  },

  textPromptStyle: {
    fontSize: 20
  },
  bigTextPromt: {
    width: 300,
    backgroundColor: 'gray',
    color:'white',
    textAlign:'center',
    fontSize:60

  }
});
