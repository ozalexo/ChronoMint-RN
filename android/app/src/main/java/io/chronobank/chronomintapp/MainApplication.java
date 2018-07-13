package io.chronobank.chronomintapp;

import android.app.Application;
import android.support.annotation.Nullable;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.peel.react.rnos.RNOSModule;
import com.peel.react.TcpSocketsModule;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.tradle.react.UdpSocketsModule;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
          new RNI18nPackage(),
          new RandomBytesPackage(),
          new ReactNativeDocumentPicker(),
          new ReactNativeFingerprintScannerPackage(),
          new RNDeviceInfo(),
          new RNOSModule(),
          new RNSensitiveInfoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
  }

}
