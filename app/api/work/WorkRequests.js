/**
 * Created by InforeXuan on 2017/5/22.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'

class GetInforeTaskListRequest extends BaseRequest {
    requestUrl() {
        return Urls.work.getInforeTaskList
    }
}

class QueryOrgList extends BaseRequest {
    requestUrl() {
        return Urls.work.queryOrgList;
    }
}

class QueryProjectStatisticsByOrg extends BaseRequest {
    requestUrl() {
        return Urls.work.queryProjetStaticsByOrg;
    }
}

class GetAppProbudgetData extends BaseRequest {
    requestUrl() {
        return Urls.work.getAppProbudgetData;
    }
}

export {GetInforeTaskListRequest,QueryOrgList,QueryProjectStatisticsByOrg,GetAppProbudgetData} ;