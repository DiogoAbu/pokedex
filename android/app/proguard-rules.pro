# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

## https://github.com/DylanVann/react-native-fast-image
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

## https://github.com/luggit/react-native-config
-keep class com.imperialrecords.BuildConfig { *; }
#-keepresources string/build_config_package

## https://github.com/react-native-linear-gradient/react-native-linear-gradient
-keep class com.BV.LinearGradient.* {*;}

## https://github.com/software-mansion/react-native-reanimated
-keep class com.facebook.react.turbomodule.** { *; }

## https://github.com/ammarahm-ed/react-native-mmkv-storage
-keepclasseswithmembers,includedescriptorclasses class com.tencent.mmkv.** {
    native <methods>;
    long nativeHandle;
    private static *** onMMKVCRCCheckFail(***);
    private static *** onMMKVFileLengthError(***);
    private static *** mmkvLogImp(...);
    private static *** onContentChangedByOuterProcess(***);
}
