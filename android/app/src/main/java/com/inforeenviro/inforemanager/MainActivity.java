package com.inforeenviro.inforemanager;

import android.os.Bundle;

import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(MainActivity.this);  // here
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
//        getOverLayPermission(this);
    }

//    private void getOverLayPermission(Context context) {
//        if (Build.VERSION.SDK_INT >= 23) {
//            Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
//            startActivity(serviceIntent);
//        }
//    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "INFORE_ENVIRO";
    }
}
