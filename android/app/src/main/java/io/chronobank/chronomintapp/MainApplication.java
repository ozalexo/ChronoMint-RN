package io.chronobank.chronomintapp;

import android.support.annotation.Nullable;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.peel.react.rnos.RNOSModule;
import com.peel.react.TcpSocketsModule;
import com.reactnativenavigation.NavigationApplication;
import com.tradle.react.UdpSocketsModule;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
      // Make sure you are using BuildConfig from your own application
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
          new RNI18nPackage(),
          new RandomBytesPackage(),
          new ReactNativeDocumentPicker(),
          new ReactNativeFingerprintScannerPackage(),
          new RNDeviceInfo(),
          new RNFSPackage(),
          new RNOSModule(),
          new RNSensitiveInfoPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
