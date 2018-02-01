#!/bin/sh

echo "~~~~~~~~~~~~~~~~开始执行脚本~~~~~~~~~~~~~~~~$1"

# 开始时间
beginTime=`date +%s`
DATE=`date '+%Y-%m-%d-%T'`
#需要编译的 targetName
TARGET_NAME="inforeRN"
#编译模式 工程默认有 Debug Release 
CONFIGURATION_TARGET=Debug

#第一个参数描述是否是debug，除了2以外的数字都是debug
if [ $1 -eq "1" ]
then
CONFIGURATION_TARGET=Debug
elif [ $1 -eq "2" ]
then
CONFIGURATION_TARGET=Release
else
echo "参数传入错误"
exit 1
fi

#编译路径
BUILDPATH=~/Desktop/${TARGET_NAME}_${DATE}
#archivePath
ARCHIVEPATH=${BUILDPATH}/${TARGET_NAME}.xcarchive
#输出的ipa目录
IPAPATH=${BUILDPATH}
# #工作相对路径
cd ./ios

#证书名
CODE_SIGN_IDENTITY="iPhone Developer"
#描述文件
PROVISIONING_PROFILE_NAME="com.infore.promanager_dev"

#导出ipa 所需plist
ADHOCExportOptionsPlist=./ADHOCExportOptionsPlist.plist
AppStoreExportOptionsPlist=./AppStoreExportOptionsPlist.plist
DevelopExportOptionsPlist=./DevelopExportOptionsPlist.plist

ExportOptionsPlist=${DevelopExportOptionsPlist}

#第二个参数 1 默认是developer包 2
if [ $2 -eq "1" ]
then
echo "~~~~~~~~~~developer~~~~~~~~~~~~~"
elif [ $2 -eq "2" ]
then
#证书名
CODE_SIGN_IDENTITY="iPhone Distribution: Shenzhen Infore Environment Networking Technology Co.,Ltd (KPHH4PR749)"
#描述文件
PROVISIONING_PROFILE_NAME="XC iOS Ad Hoc: com.infore.promanager"
ExportOptionsPlist=${ADHOCExportOptionsPlist}
else
echo "参数错误"
exit 1
fi

# 是否上传蒲公英
UPLOADPGYER=false

echo "~~~~~~~~~~~~修改Automatically manage signing~~~~~~~~~"

sed -i "" s/'ProvisioningStyle = Automatic;'/'DevelopmentTeam = None;ProvisioningStyle = Manual;'/g ./inforeRN.xcodeproj/project.pbxproj

echo "~~~~~~~~~~~~~~~~npm install~~~~~~~~~~~~~~"
npm install
echo "~~~~~~~~~~~~~~~~pod install~~~~~~~~~~~~~~"
pod install
echo "~~~~~~~~~~~~~~~~开始编译~~~~~~~~~~~~~~~~~~~"
echo "~~~~~~~~~~~~~~~~开始清理~~~~~~~~~~~~~~~~~~~"
# 清理 避免出现一些莫名的错误
xcodebuild clean -workspace ${TARGET_NAME}.xcworkspace \
-scheme ${TARGET_NAME} \
-configuration \
${CONFIGURATION} -alltargets

echo "~~~~~~~~~~~~~~~~开始构建~~~~~~~~~~~~~~~~~~~"
#开始构建
xcodebuild archive -workspace ${TARGET_NAME}.xcworkspace \
-scheme ${TARGET_NAME} \
-archivePath ${ARCHIVEPATH} \
-configuration ${CONFIGURATION_TARGET} \
CODE_SIGN_IDENTITY="${CODE_SIGN_IDENTITY}" \
PROVISIONING_PROFILE="${PROVISIONING_PROFILE_NAME}"

echo "~~~~~~~~~~~~~~~~检查是否构建成功~~~~~~~~~~~~~~~~~~~"
# xcarchive 实际是一个文件夹不是一个文件所以使用 -d 判断
if [ -d "$ARCHIVEPATH" ]
then
echo "构建成功......"
else
echo "构建失败......"
rm -rf $BUILDPATH
exit 1
fi
endTime=`date +%s`
ArchiveTime="构建时间$[ endTime - beginTime ]秒"


echo "~~~~~~~~~~~~~~~~导出ipa~~~~~~~~~~~~~~~~~~~"

beginTime=`date +%s`

xcodebuild -exportArchive \
-archivePath ${ARCHIVEPATH} \
-exportOptionsPlist ${ExportOptionsPlist} \
-exportPath ${IPAPATH}

echo "~~~~~~~~~~~~~~~~检查是否成功导出ipa~~~~~~~~~~~~~~~~~~~"
IPAPATH=${IPAPATH}/${TARGET_NAME}.ipa
if [ -f "$IPAPATH" ]
then
echo "导出ipa成功......"
else
echo "导出ipa失败......"
# 结束时间
endTime=`date +%s`
echo "$ArchiveTime"
echo "导出ipa时间$[ endTime - beginTime ]秒"
exit 1
fi

endTime=`date +%s`
ExportTime="导出ipa时间$[ endTime - beginTime ]秒"

echo "~~~~~~~~~~~~~~~~配置信息~~~~~~~~~~~~~~~~~~~"
echo "开始执行脚本时间: ${DATE}"
echo "编译模式: ${CONFIGURATION_TARGET}"
echo "导出ipa配置: ${ExportOptionsPlist}"
echo "打包文件路径: ${ARCHIVEPATH}"
echo "导出ipa路径: ${IPAPATH}"

echo "$ArchiveTime"
echo "$ExportTime"
