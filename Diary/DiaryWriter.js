import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';

import MCV from './mcv';

let angryMood = require('./image/mood2.png');

export default class DiaryWriter extends Component {

    constructor(props) {
        super(props);
        this.diaryTitle = null;
        this.diaryBody = null;
        this.moodCode = 0;
        this.state = {
            moodText: '请选择心情'
        };
        this.changeText =this.changeText.bind(this);
        this.returnPressed= this.returnPressed.bind(this)
        this.selectMood=this.selectMood.bind(this)
        this._save=this._save.bind(this);
    }

    returnPressed() {
        Alert.alert(
            '请确认',
            '你确定要退回日记列表吗？',
            [
                { text: '取消' },
                { text: '确定', onPress: this.props.returnPressed }
            ]
        );
    }

    selectMood() {
        let tempString;
        if (this.modeCode === 5) this.moodCode = 1;
        else this.moodCode = this.moodCode + 1;
        switch (this.moodCode) {
            case 1:
                tempString = '现在的心情：平静';
                break;
            case 2:
                tempString = '现在的心情：愤怒';
                break;
            case 3:
                tempString = '现在的心情：悲伤';
                break;
            case 4:
                tempString = '现在的心情：高兴';
                break;
            case 5:
                tempString = '现在的心情：痛苦';
                break;
        }
        this.setState(() => {
            return {
                moodText: tempString
            }
        });
    }

    _save(){
        console.log('_save');
        this.props.saveDiary(this.moodCode, this.diaryBody, this.diaryTitle)
    }

    changeText(newText){
        console.log('title:'+newText);
        this.diaryTitle = newText ;
    }

    render() {
        return (
            <View style={MCV.container}>
                <StatusBar hidden={true} />
                <View style={MCV.firstRow}>
                    <TouchableOpacity onPress={this.returnPressed}>
                        <Text style={MCV.smallButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    {/* onPress时bind方法”做法，会导致onPress设置的方法错乱：该控件的onPress事件变成了“保存”控件onPress事件，而“保存”控件的onPress事件失效/}
                    {/* onPress中bind操作不是很好的方式，每次点击屏幕都会bind，最好的做法是将bind操作放到construstor中 */}
                    <TouchableOpacity onPress={this.selectMood}>
                        <Text style={MCV.longButton}>
                            {this.state.moodText}
                        </Text>
                    </TouchableOpacity>
                    {/* 此处的props.saveDiary由于上面控件的onPress中bind操作会失效 */}
                    <TouchableOpacity onPress={this._save}>
                        <Text style={MCV.smallButton}>
                            保存
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput style={MCV.titleInputStyle} placeholder='写个日记标题吧' onChangeText={this.changeText} />
                <TextInput style={MCV.diaryBodyStyle} multiline={true} placeholder='日记正文请在此输入' onChangeText={(text) => { console.log('content:'+text); this.diaryBody = text }} />

            </View>
        );
    }
}