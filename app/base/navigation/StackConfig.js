/**
 * Created by coderxuan on 2017/5/6.
 */
import {StackNavigator} from 'react-navigation';
//tab界面
import TabConfig from './TabConfig'
//登录
import LoginScene from '../../components/pages/login'
import Bridge from '../../components/pages/bridge'
import VertifyScene from '../../components/pages/login/vertify/VertifyScene'
import ModifyScene from '../../components/pages/login/modify/ModifyScene'
//审核
import AuditManageScene from '../../components/pages/auditmanage'
import AuditSearchScene from '../../components/pages/auditmanage/AuditSearchScene'
import ProjectChangeScene from '../../components/pages/auditmanage/projectchange'
import ProjectSchedule from '../../components/pages/auditmanage/projectschedule'
import ProjectDelayScene from '../../components/pages/auditmanage/auditdelay'
import AuditProcessScene from '../../components/pages/auditmanage/auditprocess'
import AuditSubScene from '../../components/pages/auditmanage/projectschedule/sub/AuditSubScene'
import ApprovalReasonScene from '../../components/pages/auditmanage/approvalreason'
//备货
import StockManageScene from '../../components/pages/stockmanage'
import StockDetailScene from '../../components/pages/stockmanage/stockdetail'
import StockReceiptScene from '../../components/pages/stockmanage/stockdetail/StockReceiptScene'
import StockConfirmScene from '../../components/pages/stockmanage/stockconfirm/StockConfirmScene'
import SearchStockScene from '../../components/pages/stockmanage/search'
//文档
import DocumentScene from '../../components/pages/document'
//消息
import MessageDetailScene from '../../components/pages/message/MessageDetail'
import SearchMessageScene from '../../components/pages/message/search'
//个人
import ModifyPersonInfoScene from '../../components/pages/personal/ModifyPersonInfoScene'
//
import SubDepartMailScene from '../../components/pages/maillist/sub'
import SearchMailScene from '../../components/pages/maillist/search'
import MailPersonScene from '../../components/pages/maillist/personDetail'
//项目管理
import QuestionFeedBackScene from '../../components/pages/projectmanage/questionfeedback'
import NewFeedBackScene from '../../components/pages/projectmanage/questionfeedback/NewFeedBackScene'
import NewSafeScene from '../../components/pages/projectmanage/projectsafe/NewSafeScene'
import QuestionScene from '../../components/pages/projectmanage/questionfeedback/QuestionScene'
import QuestionDetailScene from '../../components/pages/projectmanage/questionfeedback/fragment/QuestionDetailScene'
import SolveProblemScene from '../../components/pages/projectmanage/questionfeedback/fragment/SolveProblemScene'
import NoticePersonsScene from '../../components/pages/projectmanage/questionback/NoticePersonsScene'
import NoticeSubPersonsScene from '../../components/pages/projectmanage/questionback/NoticeSubPersonsScene'
import ProjectSubScene from '../../components/pages/projectmanage/projectdetail/fragment/projectTree/SubScene'
import SearchNoticePersonScene from '../../components/pages/projectmanage/questionback/SearchNoticePersons'
import SelectedNoticePersonsScene from '../../components/pages/projectmanage/questionback/SelectedNoticePersons'
import SubProjectTreeScene from '../../components/pages/projectmanage/projectdetail/fragment/projectTree/SubProjectTree'
import SearchProjectScene from '../../components/pages/projectmanage/search'
import ProjectManageScene from '../../components/pages/projectmanage'
import ProjectDetailScene from '../../components/pages/projectmanage/projectdetail'
import ProjectProfileList from '../../components/pages/work/projectProfile/ProjectProfileList'
//财务（回款）
import PaymentDetailScene from '../../components/pages/paymentmanage/PaymentDetail'
import ProjectUserList from '../../components/pages/paymentmanage/ProjectUserList'
import PaymentManageScene from '../../components/pages/paymentmanage'
import PaymentRemindScene from '../../components/pages/paymentmanage/PaymentRemind'
import SearchPaymentScene from '../../components/pages/paymentmanage/SearchPayment'
//debug
import DebugScene from '../../components/pages/debug'

const CommonScene = {
    Bridge: {
        screen: Bridge,
        navigationOptions: {
            header: null
        }
    },
    Document: {
        screen: DocumentScene,
        navigationOptions: {
            header: null
        }
    },
    Debug: {
        screen: DebugScene,
        navigationOptions: {
            header: null
        }
    },
}
const Tab = {
    TabHome: {screen: TabConfig},
}

const Login = {
    Login: {
        screen: LoginScene,
        navigationOptions: {
            header: null
        }
    },
    LoginVertify: {
        screen: VertifyScene,
        navigationOptions: {
            header: null
        }
    },
    LoginModify: {
        screen: ModifyScene,
        navigationOptions: {
            header: null
        }
    },
}

const AuditManage = {
    AuditProcess: {
        screen: AuditProcessScene, //流程审批
        navigationOptions: {
            header: null
        }
    },
    AuditManage: {
        screen: AuditManageScene,
        navigationOptions: {
            header: null
        }
    },
    AuditSearchScene: { //审核搜索页面
        screen: AuditSearchScene,
        navigationOptions: {
            header: null
        }
    },
    ProjectChangeScene: {
        screen: ProjectChangeScene,//任务变更审批
        navigationOptions: {
            header: null
        }
    },
    ProjectDelayScene: {
        screen: ProjectDelayScene,//任务延期审批
        navigationOptions: {
            header: null
        }
    },
    ProjectSchedule: {
        screen: ProjectSchedule,
        navigationOptions: {
            header: null
        }
    },
    AuditSubScene: {
        screen: AuditSubScene,
        navigationOptions: {
            header: null
        }
    },
    ApprovalReason: {
        screen: ApprovalReasonScene,
        navigationOptions: {
            header: null
        }
    },
}

const StockManage = {
    StockConfirm: {
        screen: StockConfirmScene,
        navigationOptions: {
            header: null
        }
    },
    StockManage: {
        screen: StockManageScene,
        navigationOptions: {
            header: null
        }
    },
    StockDetail: {
        screen: StockDetailScene,
        navigationOptions: {
            header: null
        }
    },
    StockReceipt: {
        screen: StockReceiptScene,
        navigationOptions: {
            header: null
        }
    },
    SearchStock: {  //采购管理搜索页面
        screen: SearchStockScene,
        navigationOptions: {
            header: null
        }
    },
}

const Message = {
    MessageDetail: {
        screen: MessageDetailScene,
        navigationOptions: {
            header: null
        }
    },
    SearchMessage: {
        screen: SearchMessageScene,
        navigationOptions: {
            header: null
        },
    },
}

const Maillist = {
    MailPersonDetail: {
        screen: MailPersonScene,
        navigationOptions: {
            header: null
        }
    },
    SearchMail: {
        screen: SearchMailScene,
        navigationOptions: {
            header: null
        }
    },
    SubDepartMail: {
        screen: SubDepartMailScene,
        navigationOptions: {
            header: null
        }
    },
}

const Payment = {
    Payment: {
        screen: PaymentManageScene,  //回款管理
        navigationOptions: {
            header: null
        }
    },
    PaymentRemind: { //回款提醒
        screen: PaymentRemindScene,
        navigationOptions: {
            header: null
        }
    },
    PaymentDetail: { //回款详情
        screen: PaymentDetailScene,
        navigationOptions: {
            header: null
        }
    },
    SearchPayment: {
        screen: SearchPaymentScene,
        navigationOptions: {
            header: null
        }
    },
    ProjectUserList: {
        screen: ProjectUserList,
        navigationOptions: {
            header: null
        }
    }
}

const Person = {
    ModifyPersonInfo: {
        screen: ModifyPersonInfoScene,
        navigationOptions: {
            header: null
        }
    },
}

const Project = {
    ProjectManage: {
        screen: ProjectManageScene,
        navigationOptions: {
            header: null
        }
    },
    SearchProject: {
        screen: SearchProjectScene,
        navigationOptions: {
            header: null,
        },
    },
    QuestionFeedBack: {
        screen: QuestionFeedBackScene,
        navigationOptions: {
            header: null
        }
    },
    NewFeedBackScene: {
        screen: NewFeedBackScene,
        navigationOptions: {
            header: null
        }
    },
    NewSafeScene: {
        screen: NewSafeScene,
        navigationOptions: {
            header: null
        }
    },
    QuestionScene: {
        screen: QuestionScene,
        navigationOptions: {
            header: null
        }
    },
    QuestionDetailScene: {
        screen: QuestionDetailScene,
        navigationOptions: {
            header: null
        }
    },
    SolveProblemScene: {
        screen: SolveProblemScene,
        navigationOptions: {
            header: null
        }
    },
    ProjectDetail: {
        screen: ProjectDetailScene,
        navigationOptions: {
            header: null
        }
    },
    SubProjectTree: {
        screen: SubProjectTreeScene,
        navigationOptions: {
            header: null
        }
    },
    NoticePersons: {
        screen: NoticePersonsScene,
        navigationOptions: {
            header: null
        }
    },
    NoticeSubPersons: {
        screen: NoticeSubPersonsScene,
        navigationOptions: {
            header: null
        }
    },
    SearchNoticePerson: {
        screen: SearchNoticePersonScene,
        navigationOptions: {
            header: null
        }
    },
    SelectedNoticePersons: {
        screen: SelectedNoticePersonsScene,
        navigationOptions: {
            header: null
        }
    },
    ProjectSubScene: {
        screen: ProjectSubScene,
        navigationOptions: {
            header: null
        }
    },
    ProjectProfileListScene: {
        screen: ProjectProfileList,
        navigationOptions: {
            header: null
        }
    }
}

const Navigator = StackNavigator(
    {
        ...CommonScene,
        ...Login,
        ...Tab,
        ...Project,
        ...Payment,
        ...Message,
        ...Maillist,
        ...StockManage,
        ...AuditManage,

        ...Person,
    }, {
        navigationOptions: {
            header: null,
        }
    }
);
export default Navigator