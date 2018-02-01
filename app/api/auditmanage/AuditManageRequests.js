/**
 * Created by Lanny on 2017/5/25.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'
class AuditManageRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.manageList
    }
}
class GetProjectFlowRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getProjectFlow
    }
}

/**
 * 获取延期审核详情
 */
class SelectTaskPlanDelayRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.selectTaskPlanDelayRequest
    }
}
/**
 * 审核记录
 */
class GetApprovalRecordListRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getApprovalRecordList
    }
}

class GetBasicSituationRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getBasicSituationRequest
    }
}

class GetOtherMessageRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getOtherMessageRequest
    }
}
class GetFinanceMessageRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getFinanceMessageRequest
    }
}

//提交审核通过、拒绝
class CommitAuditResultRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.commitAuditResultRequest
    }
}

//审核搜索
class AuditSearchRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.manageList
    }
}


class GetFlowApprovalDetailRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getFlowApprovalDetailRequest
    }
}

class GetFlowApprovalBascRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getFlowApprovalBascRequest
    }
}

/**
 * 流程审核-基本信息
 */
class GetOperationFlowApprovalRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getOperationFlowApprovalRequest
    }
}


class GetApprovalMaterialRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getApprovalMaterialRequest
    }
}

class GetApprovalInformationListRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getApprovalInformationListRequest
    }
}
/**
 * 计划任务审核--甘拓图
 */
class GetAuditProjectGanttRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.getAuditProjectGantt
    }
}

class SelectDelayApprHeader extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.selectDelayApprHeader
    }
}
/**
 * 检查是否可以审批
 */
class CheckCanApproveRequest extends BaseRequest {
    requestUrl() {
        return Urls.auditRequest.checkCanApprove
    }
}

export {
    AuditManageRequest,
    GetProjectFlowRequest,
    GetApprovalRecordListRequest,
    GetBasicSituationRequest,
    GetOtherMessageRequest,
    CommitAuditResultRequest,
    AuditSearchRequest,
    GetFinanceMessageRequest,
    GetFlowApprovalDetailRequest,
    GetApprovalMaterialRequest,
    GetOperationFlowApprovalRequest,
    GetFlowApprovalBascRequest,
    GetApprovalInformationListRequest,
    SelectTaskPlanDelayRequest,
    GetAuditProjectGanttRequest,
    SelectDelayApprHeader,
    CheckCanApproveRequest
}
