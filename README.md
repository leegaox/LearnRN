# LearnRN


### Diary

#### Q1 Why?：render函数中对中间的触摸控件的 “在点击时bind方法”做法，会导致该控件的onPress事件变成了“保存”控件onPress事件，而“保存”控件的onPress事件失效。
````javascript              
   render() {
        return (
            <View style={MCV.container}>
                <View style={MCV.firstRow}>
                    <TouchableOpacity onPress={this.returnPressed}>
                        <Text style={MCV.smallButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                        {/* onPress中bind操作不是很好的方式，每次点击屏幕都会bind，最好的做法是将bind操作放到construstor中 */}
                    <TouchableOpacity onPress={this.selectMood.bind(this)}>
                        <Text style={MCV.longButton}>
                            {this.state.moodText}
                        </Text>
                    </TouchableOpacity>
                       {/* 此处的props.saveDiary由于上面控件的onPress失效 */}
                    <TouchableOpacity onPress={this.props.saveDiary}>
                        <Text style={MCV.smallButton}>
                            保存
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
````

正确做法是将bind操作放到组件的构造函数constructor中：
````javascript
  constructor(props) {
        super(props);
        //...
        this.returnPressed= this.returnPressed.bind(this)
        this.selectMood=this.selectMood.bind(this)
        this._save=this._save.bind(this);
    }
    
    render() {
        return (
            <View style={MCV.container}>
                <View style={MCV.firstRow}>
                    <TouchableOpacity onPress={this.returnPressed}>
                        <Text style={MCV.smallButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMood}>
                        <Text style={MCV.longButton}>
                            {this.state.moodText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._save}>
                        <Text style={MCV.smallButton}>
                            保存
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
````
