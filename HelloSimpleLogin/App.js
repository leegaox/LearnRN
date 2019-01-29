/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio, TextInput } from 'react-native';

const { height, width } = Dimensions.get("window");
const pixelRatio = PixelRatio.get();
let widthOfMargin = width * 0.03;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputedNum: "",
      inputedPwd: ""
    };
    this.updatePwd = this.updatePwd.bind(this);//需要綁定后下方48行才能直接調用this.updatePwd
  }
  updateNum(nextText) {
   this.setState((oldState) => {
     //遍历还没有改变的当前说有的状态机变量
     for(var aName in oldState){
       console.log(aName);
       console.log(oldState[aName]);
     }
     //以下定义了如何改变状态机变量
      return {
        inputedNum: nextText,
        //要求加入一个新的状态机变量aBrandnewStateVariable，setState函数将传入的返回值与当前状态机变量做合并操作。
        aBrandnewStateVariable: 'I am a new variable.'
      };
    },this.changeNumDone);//可设置可选参数：回调函数，它将在“setState完成并且重新渲染完成”后被调用
  }

  /**
   * 当RN确定重新渲染组件时，会调用该函数，return false：放弃渲染组件
   */
  shouldComponentUpdate(){
    if(this.state.inputedNum<3) return false;
    return true;
  }

  /**
   * setState的回调函数
   */
  changeNumDone(){
    console.log('React Native has changed inputed Num');
  }

  updatePwd(nextText) {
    this.setState(() => {
      return {
        inputedPwd: nextText,
      };
    });
  }
  render() {
    //js
    console.log('逻辑像素密度：一逻辑像素等于' + pixelRatio + '实际像素单位');
    console.log('Screen height is:' + height + ' ,Screen width is:' + width);
    console.log('The type of aVaule is:' + typeof (aValue));
    return (
      <View style={styles.container}>
        {/*注释*/}
        <TextInput style={styles.textInputStyle} placeholder={'请输入手机号'} onChangeText={(newText)=>this.updateNum(newText)} />
        <Text style={styles.textPromptStyle}>您输入的手机号：{this.state.inputedNum}</Text>
        <TextInput style={styles.textInputStyle} placeholder={'请输入密码'} secureTextEntry={true} onChangeText={this.updatePwd} />
        <Text style={styles.tbigTextPromt}>确定</Text>
      </View>
    );//这个反大括号标识render函数的唯一一条语句即 return 语句的结束
  }//这个反大括号标识render函数定义的结束
}//这个反大括号标识了LearnRN类定义的结束

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textInputStyle: {
    // height:56,//ios平台 TextInput需要指定高度才能显示出来 *
    margin: widthOfMargin,
    fontSize: 20,
    backgroundColor: 'gray'
  },
  textPromptStyle: {
    fontSize: 20,
    margin: widthOfMargin
  },
  tbigTextPromt: {
    height: 48,
    margin: widthOfMargin,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 28
  }
});
