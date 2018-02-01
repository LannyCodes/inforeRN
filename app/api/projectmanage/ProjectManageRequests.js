/**
 * Created by InforeXuan on 2017/5/22.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'
/**
 * 获取项目管理列表
 */
class GetProjectManageListRequset extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectManageList
    }
}

/**
 * 项目详情
 */
class GetProjectDetailRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectDetail
    }
}


/**
 * 项目计划
 */
class GetProjectPlanRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectPlanList
    }
}
/**
 * 项目文件
 */
class GetProjectFileListRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectFileList
    }
}
/**
 * 项目成员
 */
class GetProjectMemberListRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectMemberList
    }
}
/**
 * 项目动态
 */
class GetProjectDynamicListReuqest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectDynamicList
    }
}
/**
 * 新建项目安全日志
 */
class SaveSecurityLog extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.saveSecurityLog
    }
}
/**
 * 获取项目安全列表
 */
class GetSecurityLogList extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getSecurityLogList
    }
}

/**
 * 问题详情
 */
class GetQuestionDetailRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getQuestionDetailRequest
    }
}
/**
 * 问题反馈列表
 */
class GetQuestionBackRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getQuestionBackRequest
    }
}
/**
 * 立即解决问题
 */
class SolveProblemRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.solveProblemRequest
    }
}
/**
 * 新建问题
 */
class CreateProblemRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.saveProblemRequest
    }
}

/**
 * 获取问题详情
 */
class GetProblemInfoRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProblemInfoRequest
    }
}

class FindTypeDictionaryRequest extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.findTypeDictionary
    }
}

/**
 * 项目详情头部
 */
class SelectByPrimaryKeyHead extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.selectByPrimaryKeyHead
    }
}

class GetProjectOverView extends BaseRequest {
    requestUrl() {
        return Urls.projectManage.getProjectOverView;
    }
}

export {
    GetProjectManageListRequset,
    GetProjectPlanRequest,
    GetProjectDetailRequest,
    GetProjectFileListRequest,
    GetProjectMemberListRequest,
    GetProjectDynamicListReuqest,
    GetQuestionDetailRequest,
    GetQuestionBackRequest,
    SolveProblemRequest,
    CreateProblemRequest,
    GetProblemInfoRequest,
    FindTypeDictionaryRequest,
    SelectByPrimaryKeyHead,
    SaveSecurityLog,
    GetSecurityLogList,
    GetProjectOverView
} ;