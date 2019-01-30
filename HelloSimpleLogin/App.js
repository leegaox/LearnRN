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
  /**
   * 组件构造函数，当该组件被初始化时被调用，通常在构造函数中初始化状态机变量，第一句是固定的
   * @param {*属性} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      inputedNum: "",
      inputedPwd: ""
    };

    this.updatePwd = this.updatePwd.bind(this);//需要綁定后下方122行才能直接調用this.updatePwd
  }

  /**
   *  完全格式写法
   * @param {*用户更改后的号码形式参数} nextText 
   */
  updateNum(nextText) {
    console.log('this is unpdate.');
    // console.log(typeof(this));//报错，updateNum被调用时，this指向调用updateNum的对象，不是App实例，没用setState方法
    /**
     * setState函数将传入函数的返回值与当前状态机做合并操作
     */
    this.setState((oldState) => {//改变前状态机变量集
      for (var aName in oldState) {
        //遍历还没有改变的当前说有的状态机变量
        console.log(aName);
        console.log(oldState[aName]);
      }
      //以下定义了如何改变状态机变量
      return {
        inputedNum: nextText,
        //要求加入一个新的状态机变量aBrandnewStateVariable，setState函数将传入的返回值与当前状态机变量做合并操作。
        aBrandnewStateVariable: 'I am a new variable.'
      };
    }, this.changeNumDone);//可设置可选参数：回调函数，它将在“setState完成并且重新渲染完成”后被调用
  }
  /**
   * updateNum的"合并状态机变量的简化语法"
   * @param {*原理：将形式参数名称改成与状态机变量一致，使得RN在调用setState函数渲染时合并状态机变量时，名称相同的状态机变量用新值覆盖旧值} inputedNum 
   */
  updateNum2(inputedNum) {
    this.setState(() => {
      return { inputedNum };
    });
  }
  /**
   * updateNum的最终极简写法
   * @param {*} inputedNum 
   */
  updateNum3(inputedNum) {
    this.setState({ inputedNum });
  }
  /**
  * 错误写法，setState第一个参数应该是一个参数集，如{inputedNum: "",inputedPwd: ""}，只是参数名和状态机名称一致省略了，
  * 不加{}的inputedNum只是一个形式参数，不符合setState的第一个参数格式，稍微完整写法如@method updateNum44 或者@method updateNum
  */
  updateNum4(inputedNum) {
    this.setState(inputedNum);
  }
  /**
   * @method updateNum4 的完整写法
   */
  updateNum44(inputedNum, inputedPwd) {
    this.setState({ inputedNum, inputedPwd }, changeNumDone);
  }


  /**
   * setState的回调函数
   */
  changeNumDone() {
    console.log('React Native has changed inputed Num');
  }

  updatePwd(nextText) {
    this.setState(() => {
      return {
        inputedPwd: nextText,
      };
    });
  }

  /**
   * 当RN确定重新渲染组件时，会调用该函数，return false：放弃渲染组件
   */
  shouldComponentUpdate() {
    if (this.state.inputedNum < 3) return false;
    return true;
  }

  /**
   * 组件渲染函数
   */
  render() {
    //js   
    // console.log('逻辑像素密度：一逻辑像素等于' + pixelRatio + '实际像素单位');
    // console.log('Screen height is:' + height + ' ,Screen width is:' + width);
    // console.log('The type of aVaule is:' + typeof (aValue));
    console.log('this in render.');
    console.log('this');
    return (
      <View style={styles.container}>
        {/*我是注释*/}
        {/* <TextInput style={styles.textInputStyle} placeholder={'请输入手机号'} onChangeText={this.updateNum} /> */}
        <TextInput style={styles.textInputStyle} placeholder={'请输入手机号'} onChangeText={(newText) => this.updateNum3(newText)} />
        <Text style={styles.textPromptStyle}>您输入的手机号：{this.state.inputedNum}</Text>
        <TextInput style={styles.textInputStyle} placeholder={'请输入密码'} secureTextEntry={true} onChangeText={this.updatePwd} />
        <Text style={styles.tbigTextPromt}>确定</Text>
      </View>
    );//这个反大括号标识render函数的唯一一条语句即 return 语句的结束
  }//这个反大括号标识render函数定义的结束
}//这个反大括号标识了LearnRN类定义的结束

/**
 * 样式表
 */
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
