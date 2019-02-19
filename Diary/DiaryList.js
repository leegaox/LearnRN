import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';

import MCV from './mcv';
let angryMood = require('./image/mood2.png');

export default class DiaryList extends Component {
    constructor(props) {
        super(props);
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    }

    updateSearchKeyword(newWord) {
        this.props.searchKeyword(newWord);
        //将用户输入的搜索关键字交给上层组件，由上层组件对日记列表进行处理，只显示日记标题中包含关键字的日记
    }

    render() {
        return (
            <View style={MCV.container}>
                <StatusBar hidden={true} />
                <View style={MCV.firstRow}>
                    <View style={{ borderWidth: 1 }}>
                        <TextInput autoCapitalize="none"
                            placeholder="输入搜索关键字"
                            clearButtonMode="while-editing"
                            onChangeText={this.updateSearchKeyword}
                            style={MCV.searchBarTextInput} />
                    </View>
                    {/* 调用回调函数 */}
                    <TouchableOpacity onPress={this.props.writeDiary}>
                        <Text style={MCV.middleButton}>
                            写日记
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={MCV.diaryAbstractList}>
                    <View style={MCV.secondRow}>
                        <Image style={MCV.moodStyle} source={angryMood} />
                        <View style={MCV.subViewInReader}>
                            <TouchableOpacity onPress={this.props._selectListItem}>
                                <Text style={MCV.textInReader}>
                                    某变量记录假日记列表标题
                                </Text>
                            </TouchableOpacity>
                            <Text style={MCV.textInReader}>
                                某变量记录假日记列表时间
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}   