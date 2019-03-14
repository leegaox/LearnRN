/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import { AppRegistry,StyleSheet,ScrollView} from 'react-native';
import { name as appName } from './app.json';
import LoginLeaf from './LoginLeaf';        // 导入登陆页面组件
import WaitingLeaf from './WaitingLeaf';     // 导入等待页面组件
import NaviModule from './NaviModule.js';
import { createStackNavigator ,createAppContainer,createMaterialTopTabNavigator ,createDrawerNavigator,SafeAreaView,DrawerItems} from 'react-navigation';



//栈式导航
const AppStackNavs = createStackNavigator({//RouteConfigs
    Home: { screen: LoginLeaf },
    Wait: { screen: WaitingLeaf },
}, {//StackNavigatorConfig 可无
    initialRouteName: 'Home',             //设置默认路由名称，必须是RouteConfigs中定义的
    mode: 'card',                       //定义渲染与切换的风格,card代表界面切换使用标准的IOS与Android风格，Modal只在IOS中生效，它让界面从屏幕底部向上升起 
    headerMode: 'float',                //定义导航栏如何渲染，float:代表导航栏始终在屏幕顶部分（IOS风格），screen代表导航栏可以随着屏幕的上下滑动而消失、重现(Android风格)，none标识导航栏将不会呈现。              
});

//标签导航
const AppTabNavs = createMaterialTopTabNavigator({
    Home: { screen: AppStackNavs },
    Wait: { screen: WaitingLeaf },
});


//抽屉式导航
const CustomDrawerContentComponent = props => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );



const AppDrawerNavs =createDrawerNavigator({
    Home: { screen: AppTabNavs },
    Wait: { screen: WaitingLeaf }
},{
    order: ['Home', 'Wait'],//routeNames数组，用于定义抽屉项目的顺序。
    initialRouteName: 'Home',//初始路由的routeName。
    drawerLockMode: 'unlocked',//设置是否响应手势
    //'unlocked'   可以通过手势和代码 打开关闭抽屉
    //'locked-closed' 抽屉关闭状态  不能通过手势打开  只能通过代码实现
    //'locked-open'  抽屉打开状态  不能通过手势关闭  只能通过代码实现


    drawerWidth: 200, //抽屉的宽度或返回的功能。
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: false, //启用原生动画。默认是true。
    drawerBackgroundColor: 'pink', //使用抽屉背景获取某种颜色。默认是white。

    //用于呈现抽屉内容的组件，例如导航项。收到navigation抽屉的道具。默认为DrawerItems
    //用于自定义
    contentComponent: CustomDrawerContentComponent,
});

// const AppContainer = createAppContainer(AppStackNavs);
// const AppContainer = createAppContainer(AppTabNavs);

const AppContainer = createAppContainer(AppDrawerNavs);

AppRegistry.registerComponent(appName, () => AppContainer);
// AppRegistry.registerComponent(appName, () => NaviModule);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });