package com.hellosimplelogin;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.app.Activity.RESULT_OK;

/**
 * @author Lee
 * @Title: {与React Nativve通信接口}
 * @Description:{描述}
 * @date 2019/1/30
 */
public class ExampleInterface extends ReactContextBaseJavaModule {

    ReactApplicationContext aContext;
    Promise interfacePromise;

    private final ActivityEventListener mListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode != 1 || resultCode != RESULT_OK) {
                return;
            }
            Uri contractData = data.getData();
            Cursor cursor = activity.managedQuery(contractData, null, null, null, null);
            cursor.moveToFirst();
            String toRNMessage = getContactInfo(cursor);
            if(toRNMessage!=null){
                interfacePromise.resolve(toRNMessage);
            }
//            sendMessage(toRNMessage);
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };

    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        //保存MainActivity传来的上下文实例
        aContext = reactContext;
        reactContext.addActivityEventListener(mListener);
    }

    /**
     * 返回原生代码模块名称，RN测使用这个名称来调用原生代码模块提供的方法。
     *
     * @return
     */
    @Override
    public String getName() {
        return "ExampleInterface";
    }

    //ReactMethod将其注释为一个React函数，才能在RN测调用
    @ReactMethod
    public void HandleMessage(String aMessage) {
        Log.i("RNMessage", "received message from RN:" + aMessage);
//        Intent intent = new Intent(aContext, Main2Activity.class);
//        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        aContext.startActivity(intent);
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        //这个Bundle没有用，单必须要有
        Bundle b = new Bundle();
        //调用系统提供的选择联系人界面
        aContext.startActivityForResult(intent, 1, b);
    }

    @ReactMethod
    public void HandleMessage(String aMessage,Promise aPromise){
        Log.i("RNMessage", "received message from RN:" + aMessage);
        interfacePromise=aPromise;
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        //这个Bundle没有用，单必须要有
        Bundle b = new Bundle();
        //调用系统提供的选择联系人界面
        aContext.startActivityForResult(intent, 1, b);
    }

    /**
     * 用于想React Native侧发送消息
     *
     * @param aMessage
     */
    public void sendMessage(String aMessage) {
        aContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", aMessage);
    }


    private String getContactInfo(Cursor cursor) {
        try{
            //D打开注释，会制造一个异常，触发reject操作
//        int makeException =2/0;
            String name = "";
            String phoneNumber = "";
            int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
            String contactId = cursor.getString(idColumn);
            String queryString = ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "=" + contactId;
            Uri uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
            Cursor phone = aContext.getContentResolver().query(uri, null, queryString, null, null);
            String dn = ContactsContract.Contacts.DISPLAY_NAME;
            String pn = ContactsContract.CommonDataKinds.Phone.NUMBER;
            if (phone.moveToFirst()) {
                for (; !phone.isAfterLast(); phone.moveToNext()) {
                    dn = name = cursor.getString(cursor.getColumnIndex(dn));
                    phoneNumber = phone.getString(phone.getColumnIndex(pn));
                }
                phone.close();
            }
            String result = "{ \"msgType\":\"pickContactResult\",\"displayName\":\"" + name + "\",\"peerNumber\":\"" + phoneNumber + "\"}";
            return result;
        }catch (Exception e){
            //reject操作
            interfacePromise.reject("error while get contact",e);
        }
        return  null;
    }
}
