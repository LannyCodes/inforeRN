/**
 * Created by coderxuan on 2017/5/6.
 */
const Urls = {
    login: {
        userLogin: '/infore-pro-manager/app/Login/checkLogin', //登陆 Y
        getValidateCode: '/infore-pro-manager/app/loginValidate/getValidateCode',//手机验证 Y
        verifyOtp: '/infore-pro-manager/app/loginValidate/verifyOtp',//验证码校验 Y
        modifyPwd: '/infore-pro-manager/app/loginValidate/changePassword', //修改密码 Y
    },
    msg: {
        getInforeMessageList: '/infore-pro-manager/app/message/findMyMessage', //获取消息 Y
        updateMessageStatus: '/infore-pro-manager/app/message/updateMessageStatus2Read',//更新消息数量
        updateMessageStatus2Done: '/infore-pro-manager/app/message/updateMessageStatus2Done',//代办 任务7、8调用这个接口
        deleteMessageByStatus: '/infore-pro-manager/app/message/deleteMessage',//更新消息数量
        findNewMessageCnt: '/infore-pro-manager/app/message/findNewMessageCnt',//查询未读消息总数
    },
    work: {
        queryOrgList: '/infore-pro-manager/app/dataAnalysis/queryOrgList', //查询当前用户所能看到的事业部列表
        queryProjetStaticsByOrg: '/infore-pro-manager/app/dataAnalysis/queryProjectStatisticsByOrg', //根据事业部查询项目信息
        getAppProbudgetData: '/infore-pro-manager/app/dataAnalysis/getAppProbudgetData', //根据用户ID查询本事业部项目预算统计数据
        getInforeTaskList: '/infore-pro-manager/app/message/findMyTask' //获取任务列表
    },
    projectManage: {
        getProjectManageList: '/infore-pro-manager/app/project/selectAll',//获取项目管理列表 Y
        getProjectPlanList: '/infore-pro-manager/app/project/getProjectGantt',//获取项目计划 Y
        getProjectDetail: '/infore-pro-manager/app/project/selectByPrimaryKey',//获取项目详情 Y
        getProjectMemberList: '/infore-pro-manager/app/project/getProjectUsers', //获取项目成员 Y
        getProjectFileList: '/infore-pro-manager/app/project/getProjectFiles', //获取项目文件 Y
        getProjectDynamicList: '/infore-pro-manager/app/getProjectDynamicList', //获取项目动态 N
        saveSecurityLog: '/infore-pro-manager/app/securityLog/saveSecurityLog', //新建项目安全日志
        getSecurityLogList: '/infore-pro-manager/app/securityLog/getSecurityLogList', //获取项目安全日志列表
        getQuestionDetailRequest: '/infore-pro-manager/app/problem/selectProjectProblemAllList',//获取问题详情
        getQuestionBackRequest: '/infore-pro-manager/app/problem/selectByAll',//获取问题反馈
        solveProblemRequest: '/infore-pro-manager/app/problem/updateStatus',//立即处理问题
        saveProblemRequest: '/infore-pro-manager/app/problem/saveProblem',//新建问题
        getProblemInfoRequest: '/infore-pro-manager/app/problem/getProblemInfo',//获取问题信息
        findTypeDictionary: '/infore-pro-manager/app/project/FindTypeDictionary',//获取项目筛选类型
        selectByPrimaryKeyHead: '/infore-pro-manager/app/project/selectByPrimaryKeyHead',//项目详情头部
        getProjectOverView: '/infore-pro-manager/app/project/getProjectOverView',//项目概况
    },
    resManage: {
        getInforeResInfo: '/infore-pro-manager/app/getInforeResInfo' //获取文件信息
    },
    stockManage: {
        getStockInfo: '/infore-pro-manager/app/procurement/findContractList', //获取采购管理信息 Y
        getStockDetail: '/infore-pro-manager/app/procurement/getProcurementDtoMapList', //获取采购管理详细信息 Y
        batchConfirm: '/infore-pro-manager/app/procurement/batchConfirm',//确认到货
    },
    auditRequest: {
        manageList: '/infore-pro-manager/app/processApproval/appAllList', //获取审核列表
        getProjectFlow: '/infore-pro-manager/app/getProjectFlow', //获取审核详情项目流程
        getApprovalRecordList: '/infore-pro-manager/app/processApproval/queryDetailsByIdFour', //获取审核记录(所有记录)
        selectTaskPlanDelayRequest: '/infore-pro-manager/app/processApproval/selectTaskPlanDelay', //获取延期审核详情
        getApprovalInformationListRequest: '/infore-pro-manager/app/project/getProjectFiles', // 获取项目文件 Y
        getBasicSituationRequest: '/infore-pro-manager/app/processApproval/queryDetailsByIdOne',//变更审核--基本情况
        getOtherMessageRequest: '/infore-pro-manager/app/processApproval/queryDetailsByIdTwo',
        getFinanceMessageRequest: '/infore-pro-manager/app/processApproval/queryDetailsByIdTree',
        commitAuditResultRequest: '/infore-pro-manager/app/processApproval/approve',//提交审核通过、拒绝
        auditSearchRequest: '/infore-pro-manager/app/processApproval/appAllList',
        getFlowApprovalDetailRequest: '/infore-pro-manager/app/processApproval/selectTaskGanttId',
        getFlowApprovalBascRequest: '/infore-pro-manager/app/project/selectByPrimaryKey', //流程审核基本信息
        getOperationFlowApprovalRequest: '/infore-pro-manager/app/processApproval/selectProjectFlow',
        getApprovalMaterialRequest: '/infore-pro-manager/app/processApproval/selectTaskGanttIdByFile',
        getAuditProjectGantt: '/infore-pro-manager/app/processApproval/getProjectGantt',//计划任务审核-执行计划
        selectDelayApprHeader: '/infore-pro-manager/app/project/selectDelayApprHeader',//计划任务审核-执行计划
        checkCanApprove: '/infore-pro-manager/app/processApproval/checkCanApprove',//检查是否可以审批
    },
    mailList: {
        getInforeMailList: '/infore-pro-manager/app/getUserList', //获取通讯录列表
        getUserModelByNickName: '/infore-pro-manager/app/getUserByNickName', //获取通讯录搜索列表
        getUserInforById: '/infore-pro-manager/app/getUserById', //根据userId查询用户信息
        getProblemUserList: '/infore-pro-manager/app/getProblemUserList', //获取问题确认人列表
        getProblemUserByNickName: '/infore-pro-manager/app/getProblemUserByNickName', //搜索问题确认人列表
    },
    personal: {
        updateUserInfo: '/infore-pro-manager/app/updateUserInfo',//修改个人信息
        updateUserHeadImg: '/infore-pro-manager/app/updateUserHeadImg',//修改头像
    },
    payment: {
        getPaymentListRequest: '/infore-pro-manager/app/payment/list', //获取回款列表
        sendRemindMessage: '/infore-pro-manager/app/payment/sendRemindMessage', //回款提醒
        paymentDetail: '/infore-pro-manager/app/payment/getDetailData', //回款详情
    },
    doc: {
        docUrl: '/infore-pro-manager/file/fileView'
    }
};
export default Urls