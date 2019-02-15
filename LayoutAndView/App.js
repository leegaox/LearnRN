/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {PixelRatio,AppRegistry,StatusBar, StyleSheet, Text, View,Image,TextInput,TouchableNativeFeedback,TouchableOpacity,TouchableHighlight} from 'react-native';
import AutoExpandingTextInput from './AutoExpandingTextInput';  
let pixelRatio = require('PixelRatio').get();

var imageAddress='http://www.zt5.com/uploadfile/2019/0127/20190127010113674.jpg';

//加载Android项目资源图片（drawable目录）
let nativeImageSource=require('nativeImageSource');


export default class App extends Component{

  _onChange(event) {
    var text =event.nativeEvent.text;
    console.log('input text:'+text);
  }

  _onContentSizeChange =(event)=>{
    var height=event.nativeEvent.contentSize.height;
    console.log('TextInput height:'+height);
  }

  constructor(props){
    super(props);
    this.state ={bigButtonPointerEvents:null};
    this.onBigButtonPressed =this.onBigButtonPressed.bind(this);
    this.onSmallButtonPressed =this.onSmallButtonPressed.bind(this);
    this.tempfunc =this.tempfunc.bind(this);
  }

  componentDidMount(){
    var aref =this.tempfunc.bind(this);
    //在componentDidMount执行完后可以获取组件位置信息，因此指定一个1毫秒超时定时器。
    window.setTimeout(this.tempfunc,3);
  }

    /**
   * 通过引用修复TextInput的属性值,获取组件位置信息
   */
  tempfunc(){
    this.refs.mRef.setNativeProps({placeholder:'12345',multiline:true, numberOfLines:3,style:{backgroundColor:'red'}});
    this.refs.mRef.measure(this.getTextInputPosition);
  }

  /**
   * 获取位置信息
   */
  getTextInputPosition(fx,fy,width,height,px,py){
    console.log('getTextInputPosition');
    console.log('Component width is: '+width);
    console.log('Component height is: '+height);
    console.log('X offset to frame:'+fx);
    console.log('Y offset to frame:'+fy);
    console.log('X offset to page:'+px);
    console.log('Y offset to page:'+py);
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
        {/* 状态栏 */}
        <StatusBar animated={true} hidden ={false} backgroundColor={'black'} translucent={true} barStyle={'default'} showHideTransition={'fade'} networkActivityIndicatorVisible={true}/>
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
        <View>
          <View>{/*添加不带任何属性的View组件 兼容IOS 剧中 显示效果 */}
            <TextInput style={styles.textInputStyle} defaultValue='Ajfg你好' ref='mRef'/>   
          </View>
          <AutoExpandingTextInput 
                    defaultValue='Press to Copy something to Clipboard.'
                    _onChange={this._onChange}
                    _onContentSizeChange={this._onContentSizeChange}
                    style={styles.textInputStyle}/>
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
  },
  textInputStyle: {
    fontSize: 20,
    width: 300,
    height: 30,
    backgroundColor: 'grey',
    paddingTop: 0,
    paddingBottom: 0,
  }
});
