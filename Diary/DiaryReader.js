import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,StatusBar} from 'react-native';

import MCV from './mcv';
let angryMood=require('./image/mood2.png');

export default class DiaryReader extends Component{
    render(){
        return(
            <View style={MCV.container}>
                <StatusBar hidden={true}/>
                <View style={MCV.firstRow}>
                    <TouchableOpacity onPress ={this.props.returnPressed}>
                        <Text style={MCV.middleButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={this.props.readingPreviousPressed}>
                        <Text style={MCV.middleButton}>
                            上一篇
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={this.props.readingNextPressed}>
                        <Text style={MCV.middleButton}>
                            下一篇
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={MCV.secondRow}>
                    {/* 上层传入的属性被渲染 */}
                    <Image style={MCV.moodStyle} source={props.diaryMood}/>
                    <View style={MCV.subViewInReader}>
                        <Text style={MCV.textInReader}>
                            {/* 上层传入的属性被渲染 */}
                            {this.props.diaryTitle}
                        </Text>
                        <Text style={MCV.textInReader}>
                         {/* 上层传入的属性被渲染 */}
                         {this.props.diaryTime}
                        </Text>
                    </View>
                </View>
                <TextInput style={[MCV.diaryBodyStyle,{color:'black'}]}
                           multiline={true}
                           editable={false}
                           value={this.props.diaryBody}/>
                           {/* 上层传入的属性被渲染 */}
            </View>
        );
    };
}