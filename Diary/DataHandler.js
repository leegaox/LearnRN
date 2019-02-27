import { AsyncStorage } from 'react-native';
let angryMood = require('./image/mood1.png');
let peaceMood = require('./image/mood2.png');
let happyMood = require('./image/mood3.png');
let sadMood = require('./image/mood4.png');
let miseryMood = require('./image/mood5.png');

export default class DataHandler {
    static realDiaryList = [];
    static listIndex = 0;
    static getAllTheDiary() {//获取存储中所有的日记数据
        return new Promise(
            function (resolve, reject) {
                AsyncStorage.getAllKeys().then(
                    (keys) => {
                        if (keys.length === 0) {//判断存储中是否没有数据
                            // let returnValue = {
                            //     diaryTime: '没有历史日记',
                            //     diaryTitle: '没有历史日记',
                            //     diaryBody: ''
                            // }
                            // resolve(returnValue);//Promise机制中的成功返回
                            // console.log('注意，resolve后的语句还会被执行，因此resolve后如果有代码，结束处理必须要跟return语句！');
                            resolve(DataHandler.realDiaryList);
                            return;
                        }
                        AsyncStorage.multiGet(keys).then( //通过keys获取所有数据
                            (results) => {
                                let resultsLength = results.length;
                                for (let counter = 0; counter < resultsLength; counter++) {
                                    //取得数据并利用JSON类的parse方法生成对象，插入日记列表
                                    DataHandler.realDiaryList[counter] = JSON.parse(results[counter][1]);
                                    switch (DataHandler.realDiaryList[counter].mood) {
                                        case 2:
                                            DataHandler.realDiaryList[counter] = angryMood;
                                            break;
                                        case 3:
                                            DataHandler.realDiaryList[counter] = sadMood;
                                            break;
                                        case 4:
                                            DataHandler.realDiaryList[counter] = happyMood;
                                            break;
                                        case 5:
                                            DataHandler.realDiaryList[counter] = peaceMood;
                                            break;
                                    }
                                  
                                } 
                                let ctime = new Date(DataHandler.realDiaryList[counter].time);
                                let timeString = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + '日 星期' + (ctime.getDay() + 1) + ' ' + ctime.getHours() + ':' + ctime.getMinutes();
                                DataHandler.realDiaryList[counter].time=timeString;
                                DataHandler.bubleSortDiaryList();//日记列表排序
                                resolve(rVaule); //Promise机制中的成功返回
                            }
                        ).catch(
                            (error) => {
                                console.log('A error happens while read all the diary.');
                                console.log(error);
                                AsyncStorage.clear();
                                resolve(DataHandler.realDiaryList);
                            }
                        );
                    }
                )
            }
        );
    }

    static bubleSortDiaryList() {
        let tempObj;
        //使用冒泡排序对日记列表进行排序
        for (let i = 0; i < DataHandler.realDiaryList.length; i++) {
            for (j = 0; j < DataHandler.realDiaryList.length - i - 1; j++) {
                if (DataHandler.realDiaryList[j].index > DataHandler.realDiaryList[j + 1].index) {
                    tempObj = DataHandler.realDiaryList[j];
                    DataHandler.realDiaryList[j] = DataHandler.realDiaryList[j + 1];
                    DataHandler.realDiaryList[j + 1] = tempObj;
                }
            }
        }
    }

    static getPreviousDiary() {
        if (DataHandler.listIndex === null || DataHandler.realDiaryList.length === 0) return null;
        if (DataHandler.listIndex === 0) {
            console.log('没有更多历史日记了！');
            return;
        }
        DataHandler.listIndex--;
        return {
            uiCode:2,
            diaryMood: DataHandler.realDiaryList[DataHandler.listIndex].mood,
            diaryBody: DataHandler.realDiaryList[DataHandler.listIndex].body,
            diaryTime: DataHandler.realDiaryList[DataHandler.listIndex].time,
            diaryTitle: DataHandler.realDiaryList[DataHandler.listIndex].title
        };
    }

    static getDiaryAtIndex(aIndex){
        DataHandler.listIndex =aIndex;
        return{
            uiCode:2,
            diaryMood: DataHandler.realDiaryList[DataHandler.listIndex].mood,
            diaryBody: DataHandler.realDiaryList[DataHandler.listIndex].body,
            diaryTime: DataHandler.realDiaryList[DataHandler.listIndex].time,
            diaryTitle: DataHandler.realDiaryList[DataHandler.listIndex].title  
        }
    }

    static getNextDiary() {
        if (DataHandler.realDiaryList.length === 0) return null;
        if (DataHandler.listIndex === (DataHandler.realDiaryList.length - 1)) {
            console.log('没有更多历史日记了！');
            return;
        }
        DataHandler.listIndex++;  
        return {
            uiCode:2,
            diaryMood: DataHandler.realDiaryList[DataHandler.listIndex].mood,
            diaryBody: DataHandler.realDiaryList[DataHandler.listIndex].body,
            diaryTime: DataHandler.realDiaryList[DataHandler.listIndex].time,
            diaryTitle: DataHandler.realDiaryList[DataHandler.listIndex].title  
        };
    }

    static saveDiary(newDiaryMood, newDiaryBody, newDiaryTitle) {
        return new Promise(
            function (resolve, reject) {
                let ctime = new Date();
                let timeString = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月' + ctime.getDate() + '日 星期' + (ctime.getDay() + 1) + ' ' + ctime.getHours() + ':' + ctime.getMinutes();
                let aDiary = Object();
                aDiary.title = newDiaryTitle;
                aDiary.body = newDiaryBody;
                aDiary.mood = newDiaryMood;
                aDiary.time = timeString;
                //sectionID用于对日记列表进行分段显示
                aDiary.sectionID = '' + ctime.getFullYear() + '年' + (ctime.getMonth() + 1) + '月';
                //从当前时间生成唯一值，用来索引日记列表，这个值精确到毫秒
                aDiary.index = Date.parse(ctime);
                AsyncStorage.setItem('' + aDiary.index, JSON.stringify(aDiary)).then(
                    () => {//将新的日记存储在本地
                        let totalLength = DataHandler.realDiaryList.length;
                        DataHandler.realDiaryList[totalLength] = aDiary;
                        DataHandler.listIndex = totalLength;
                        let newMoodIcon;
                        switch (newDiaryMood) {
                            case 2:
                                newMoodIcon = angryMood;
                                break;
                            case 3:
                                newMoodIcon = sadMood;
                                break;
                            case 4:
                                newMoodIcon = happyMood;
                                break;
                            case 5:
                                newMoodIcon = miseryMood;
                                break;
                            default:
                                newMoodIcon = peaceMood;
                        }
                        DataHandler.realDiaryList[totalLength].mood =newMoodIcon;
                        let aValue = {
                            uiCode: 1,
                            _diaryList:DataHandler.realDiaryList
                        };
                        resolve(aValue);
                    }
                ).catch(
                    (error) => {
                        console.log('Saving failed,error: ' + error.message);
                    }
                );
            }
        );
    }
}