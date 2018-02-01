# This is a configuration file for ProGuard.
# http://proguard.sourceforge.net/index.html#manual/usage.html
# 指定代码的压缩级别0~7
-optimizationpasses 5
# 是否使用大小写混合
-dontusemixedcaseclassnames
# 是否混淆第三方jar
-dontskipnonpubliclibraryclasses
# 混淆时是否做预校验
-dontpreverify
#重命名
-renamesourcefileattribute SourceFile
#保护给定的可选属性，例如LineNumberTable, LocalVariableTable, SourceFile, Deprecated, Synthetic, Signature, and InnerClasses.
-keepattributes SourceFile,LineNumberTable
# 混淆时是否记录日志
-verbose
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
##压缩
 #不压缩输入的类文件
-dontshrink
##优化
#不优化输入的类文件
-dontoptimize
#优化时允许访问并修改有修饰符的类和类的成员
-allowaccessmodification

-keepattributes *Annotation*
-keep class android.** {*; }
-keep public class * extends android.view
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.pm
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.backup.BackupAgentHelper
-keep public class * extends android.preference.Preference
-keep public class * extends android.app.Fragment
-keep public class com.android.vending.licensing.ILicensingService
-keep class android.support.v4.app.** { *; }
-keep class android.support.v7.** { *; }

# 保持自定义控件类不被混淆
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet, int);
}
#点击事件不被混淆
-keepclasseswithmembers class * {
    void onClick*(...);
}
#回调
-keepclasseswithmembers class * {
    *** *Callback(...);
}
#get 和set
-keepclassmembers public class * extends android.view.View {
   void set*(***);
   *** get*();
}

#本地方法
-keepclasseswithmembernames class * {
    native <methods>;
}
# activity
-keepclassmembers class * extends android.app.Activity {
   public void *(android.view.View);
}
#实现Parcelable 接口的不被混淆
-keep class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}
#R文件属性不被混淆
-keepclassmembers class **.R$* {
    public static <fields>;
}

#缺省proguard 会检查每一个引用是否正确，但是第三方库里面往往有些不会用到的类，没有正确引用。如果不配置的话，系统就会报错。
-dontwarn android.support.**
# 实现Serializable 接口的不被混淆
-keepnames class * implements java.io.Serializable
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
    public <fields>;
}

##---------------End: proguard configuration for Gson  ----------
-ignorewarnings
-dontwarn org.xmlpull.v1.XmlSerializer
-keepattributes Signature