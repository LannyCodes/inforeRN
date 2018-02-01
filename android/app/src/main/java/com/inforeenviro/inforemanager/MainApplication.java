package com.inforeenviro.inforemanager;

import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecomponent.amaplocation.RCTAMapLocationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.inforeenviro.inforemanager.utils.InforeCrashHandler;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.netease.nis.bugrpt.CrashHandler;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;
import io.rnkit.actionsheetpicker.ASPickerViewPackage;

public class MainApplication extends Application implements ReactApplication {

    private boolean SHUTDOWN_TOAST = true;
    private boolean SHUTDOWN_LOG = false;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RCTAMapLocationPackage(),
            new PickerPackage(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                    new RNDeviceInfo(),
                    new ASPickerViewPackage(),
                    new RNFetchBlobPackage(),
                    new SplashScreenReactPackage(),
                    new ImagePickerPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        InforeCrashHandler crashHandler = InforeCrashHandler.getInstance(); // 本地CrashHandler
        CrashHandler.init(getApplicationContext()); // 云Crash
        crashHandler.init(this);
    }
}
