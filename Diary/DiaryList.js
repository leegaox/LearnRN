import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, ListView } from 'react-native';

import MCV from './mcv';
let angryMood = require('./image/mood2.png');

export default class DiaryList extends Component {
    constructor(props) {
        super(props);
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.state = {
            diaryListDataSource: new ListView.DataSource({ rowHasChanged: (oldRow, newRow) => oldRow !== newRow })
        };
    }

    componentWillMount() {
        if (this.props._diaryList === null) return;
        this.setState({
            diaryListDataSource: this.state.diaryListDataSource.cloneWithRows(this.props._diaryList)
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            diaryListDataSource: this.state.diaryListDataSource.cloneWithRows(nextProps._diaryList)
        });
    }

    updateSearchKeyword(newWord) {
        this.props.searchKeyword(newWord);
        //TODO...将用户输入的搜索关键字交给上层组件，由上层组件对日记列表进行处理，只显示日记标题中包含关键字的日记
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
                {/* <View style={MCV.diaryAbstractList}>
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
                </View> */}
                {/* 这里使用ListView组件代替假列表 */}
                {
                    (
                        (this.props._diaryList.length !== 0) ? (
                            <ListView dataSource={this.state.diaryListDataSource}
                                renderRow={this.renderListItem}>
                            </ListView>
                        ) :
                         (
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>
                                        您还没有写日记哦。
                                </Text>

                                </View>
                            )
                    )
                }

            </View>
        );
    }

    //renderListItem函数定义了如何渲染列表中的每一行，它的三个参数有RN框架提供
    //item是一个对象，代表当前列的相应数据，由开发者通过dataSource提供
    //sectionID代表当前列表的分段号
    //rowID代表当前行在整个列表中的行号
    renderListItem(item, sectionID, rowID) {
        return (
            // 使用TouchableOpacity将列表每一行设置为可按控件，并且指定按下事件的处理函数，按下事件上报时回带上本行再列表中的行号
            <TouchableOpacity onPress={() => this.props._selectListItem(rowID)}>
                <View style={MCV.secondRow}>
                    <Image style={MCV.moodStyle} source={item.mood} />
                    <View style={MCV.subViewInReader}>
                        <Text style={MCV.textInReader}>
                            {item.title}
                        </Text>
                        <Text style={MCV.textInReader}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
