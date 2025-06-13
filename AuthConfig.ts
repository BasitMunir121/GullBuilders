import { AppConfigDto } from "src/app/common/config.service";
import { GoogleAuthModel, MicorsoftAuthModel } from "./src/app/models/shared/PaginationModel";

export const GoogleAuthSettings : GoogleAuthModel = {
    OneTapEnabled: false
};


export const GlobalSettings: AppConfigDto ={
    GoogleClientID: "",
    ApiUrl:"http://192.168.0.87:9500",
    loginUrl:"http://192.168.0.87:9500",
    PlansList :{
        Annual: "P-2EX20456V3801093PMW35QVY",
        Perpetual:"P-1UN021826K141473NMXFUJIA",
        Basic: "P-8VT743375Y806060AMXFT2QI",
        Pro :"P-1F853046E85004307MXFT3GQ",
        Basic_discount: "P-38A07028AW771613BM5NGVDQ",
        Pro_discount: "P-6FP99553NM393440CM5NGWIA"
    },
    PaypalAuth :{
        ClientId: ""
    }
}

// export const MicrosoftAuthSettings: MicorsoftAuthModel=
// {
//     ClientId:'51098eca-8524-4680-b804-dcaeb19e66db',
//     TenantId: 'common'
// }

export const MicrosoftAuthSettings: MicorsoftAuthModel=
{
    ClientId:'e1fbca8e-d05f-470d-b1bc-0b9482eee8c6',
    TenantId: '0754ce02-1889-4ba2-94ac-1b673e24a19e'
}

