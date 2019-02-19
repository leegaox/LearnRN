/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import DiaryList from './DiaryList';
import DiaryWriter from './DiaryWriter';
import DiaryReader from './DiaryReader';
import DataHandler from './DataHandler';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uiCode: 1,
      diaryMood: null,
      diaryTime: '读取中...',
      diaryTitle: '读取中...',
      diaryBody: '读取中...',
    };
    this.bindAllMyFunction();//执行回调函数绑定操作
    DataHandler.getAllTheDiary().then(
      (result) => {
        this.setState(result);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );

  }

  bindAllMyFunction() {
    this.searchKeyword =this.searchKeyword.bind(this);
    this._selectListItem = this._selectListItem.bind(this);
    this.writeDiary = this.writeDiary.bind(this);
    this.returnPressed = this.returnPressed.bind(this);
    this.saveDiaryAndReturn = this.saveDiaryAndReturn.bind(this);
    this.readingPreviousPressed = this.readingPreviousPressed.bind(this);
    this.readingNextPressed = this.readingNextPressed.bind(this);
  }

  //阅读日记界面请求读上一篇日记的处理函数
  readingPreviousPressed() {
    let previousDiary = DataHandler.getPreviousDiary();
    if (previousDiary === null) return;//已经显示的是第一篇日记
    this.setState(previousDiary);//显示上一篇日记
  }
  //阅读日记界面请求读下一篇日记的处理函数
  readingNextPressed() {
    let nextDiary = DataHandler.getNextDiary();
    if (nextDiary === null) return;
    this.setState(nextDiary);
  }

  //阅读日记界面、写日记界面返回日记列表界面的处理函数
  returnPressed() {
    this.setState({ uiCode: 1 });
  }

  //写日记界面保存日记并返回日记列表界面的处理函数
  saveDiaryAndReturn(newDiaryMood,newDiaryBody,newDiaryTitle) {
    DataHandler.saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle).then(
      (result) => {
        this.setState(result);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  //写日记按钮被按下时的处理函数
  writeDiary() {
    this.setState(() => {
      return {
        uiCode: 3
      }
    });
  }

  searchKeyword(keyword) {
    console.log('search keyword is: ' + keyword);
  }

  //日记列表中某条记录被选中时的处理函数
  _selectListItem() {
    this.setState({ uiCode: 2 });
  }

  showDiaryList() {
    return (
      <DiaryList fakeListTitle={this.state.diaryTitle}
        fakeListMood={this.state.diaryMood}
        _selectListItem={this._selectListItem}
        searchKeyword={this.searchKeyword}
        writeDiary={this.writeDiary} />
    );
  }

  showDiaryWriter() {
    return (
      <DiaryWriter returnPressed={this.returnPressed}
        saveDiary={this.saveDiaryAndReturn} />
    );
  }

  showDiaryReader() {
    return (
      <DiaryReader diaryTitle={this.state.diaryTitle}
        diaryMood={this.state.diaryMood}
        diaryTime={this.state.diaryTime}
        diaryBody={this.state.diaryBody}
        readingPreviousPressed={this.readingPreviousPressed}
        readingNextPressed={this.readingNextPressed}
        returnPressed={this.returnPressed} />
    );
  }

  render() {
    if (this.state.uiCode === 1) return this.showDiaryList();
    if (this.state.uiCode === 2) return this.showDiaryReader();
    if (this.state.uiCode === 3) return this.showDiaryWriter();
  }
}


