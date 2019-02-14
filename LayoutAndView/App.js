/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {PixelRatio,AppRegistry, StyleSheet, Text, View,Image,TextInput,TouchableNativeFeedback,TouchableOpacity,TouchableHighlight} from 'react-native';

let pixelRatio = require('PixelRatio').get();

var imageAddress='http://www.zt5.com/uploadfile/2019/0127/20190127010113674.jpg';

//加载Android项目资源图片（drawable目录）
let nativeImageSource=require('nativeImageSource');

export default class App extends Component{

  constructor(props){
    super(props);
    this.state ={bigButtonPointerEvents:null};
    this.onBigButtonPressed =this.onBigButtonPressed.bind(this);
    this.onSmallButtonPressed =this.onSmallButtonPressed.bind(this);
  }

  onBigButtonPressed(){
    console.log('Big button pressed');
  }

  onSmallButtonPressed(){
    if(this.state.bigButtonPointerEvents==null){
      console.log('big button will not responed.');
      this.setState({bigButtonPointerEvents:'none'});//改变状态机变量
      return;
    }
    console.log('big button will responed.');
    this.setState({bigButtonPointerEvents:null});//改变状态机变量
  }
  onPressButton(){
      
  }
  
  render() {
    // Android项目图片资源
    let ades ={
      android:'ic_launcher',
      width:60,height:60
    };

 
    return (
      <View style={styles.container}>
        <Text style={styles.sButtonStyle} onPress={this.onSmallButtonPressed}>Small Button</Text>
        <Text style={styles.bButtonStyle} onPress={this.onBigButtonPressed} pointerEvents={this.state.bigButtonPointerEvents}>Big Button</Text>
        <View style={{flexDirection:'row'}}>
        <Image style={styles.imageStyle} resizeMode={'cover'}   source={{uri:imageAddress}} />
        <Image style={styles.imageStyle} resizeMode={'contain'}   source={{uri:imageAddress}} />
        <Image style={styles.imageStyle} resizeMode={'stretch'}   source={{uri:imageAddress}} />
        <Image style={styles.imageStyle} resizeMode={'center'}  source={{uri:imageAddress}} />
        </View>
        <Image style={styles.imageStyle2}  source={nativeImageSource(ades)} />
        <View>
          <Text >可触摸组件</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableNativeFeedback backgroud={TouchableNativeFeedback.Ripple('red',true)}>
              <View style={styles.button}/>
            </TouchableNativeFeedback>

            <TouchableOpacity onPress={this._onPressButton} activeOpacity={0.2}>
              <Text style={styles.button} >TouchableOpacity</Text>
            </TouchableOpacity>

            <TouchableHighlight onPress={this.onPressButton} activeOpacity={0.85} underlayColor={'red'}>
              <View style={styles.button}/>
            </TouchableHighlight>
          </View>
        </View>
        <View>{/*添加不带任何属性的View组件 兼容IOS剧中显示效果 */}
          <TextInput style={styles.textInputStyle} defaultValue='Ajfg你好'/>   
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
  },
  button:{
    margin:2,
    width:120,
    height:70,
    backgroundColor:'grey'
  },
  sButtonStyle: {
    fontSize: 20,
    top:10,
    width:150,
    height:35,
    backgroundColor:'grey'
  },
  bButtonStyle: {
    fontSize: 20,
    width:150,
    height:70,
    backgroundColor:'grey'
  },
  imageStyle:{
    margin:4,
    backgroundColor:'grey',
    width:70,
    height:50,
  },
  imageStyle2:{
    margin:2,
    backgroundColor:'white',
    borderRadius:40,
    width:192/pixelRatio,
    height:192/pixelRatio,
    alignSelf:'center',
    resizeMode:'cover',
  },
  textInputStyle:{
    margin:16,
    width:200,
    height:58,
    fontSize:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'grey'
  }
});
