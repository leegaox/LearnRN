/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler, Platform } from 'react-native';
import LoginLeaf from './LoginLeaf';        // 导入登陆页面组件
import WaitingLeaf from './WaitingLeaf'     // 导入等待页面组件

let SceneLogin = 'Login';
let SceneWaiting = 'Waiting';
export default class NaviModule extends Component {



  constructor(props) {
    super(props);
    this.state = {
      currentScene: SceneLogin,
      phoneNumber: '',
      userPwd: ''
    };
    this.handlerBackSingal = this.handleBackSignal.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
  }

  /**
   * 更新状态机变量，RN框架会在状态机变量值被改变后重新渲染（执行render函数），currentScene变成Waiting，因此会渲染WaitingLeaf组件。
   * @param {*} aNumber 用户输入的号码
   * @param {*} aPwd 用户驶入的密码
   */
  onLoginPressed(aNumber, aPwd) {
    this.setState({
      currentScene: SceneWaiting,
      phoneNumber: aNumber,
      userPwd: aPwd
    });
  }

  render() {
    if (this.state.currentScene === SceneLogin)
      return <LoginLeaf onLoginPressed={this.onLoginPressed} />;
    else return (
      <WaitingLeaf phoneNumber={this.state.phoneNumber} userPwd={this.state.userPwd} onGoBackPressed={this.handlerBackSingal}/>
    )
  }

  /**
   * 处理Android手机返回键被按下事件与等待界面中的返回按钮被按下事件
   */
  handleBackSignal() {
    if (this.state.currentScene === SceneWaiting) {
      this.setState({ currentScene: SceneLogin });
      return true;
    }
    return false;
  }

  /**
   * 组件生命周期方法，组件被挂接到当前页面时调用；
   * 如应用运行与Android操作系统，则将hardwareBackPress与返回键被按下事件挂钩，因为IOS系统没有返回键，并且Home键被按下事件无法在应用层检测，因此不用处理。
   */
  componentDidMount(){
    if(Platform.OS ==='android')
      BackHandler.addEventListener('hardwareBackPress',this.handleBackSignal);
  }

  /**
   * 组件被移除时调用，移除事件监听
   */
  componentWillUnmount(){
    if(Platform.OS ==='android')
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackSignal);
  }

}



