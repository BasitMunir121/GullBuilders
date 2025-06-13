import { StringUtils } from "@azure/msal-browser";
import { StatusModel } from "./shared/PaginationModel";

export class urlForwarder extends StatusModel {
    URLForwarderID: number;
    URLPath: string;
    TargetURL: string;
    URLHash?: string;
    OwnerID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    HostingID?: number;
    PaidTill?: string;
    IsOrganizationUrl: boolean;
    OrganizationId?: number;
    OrganizationName?: string;
    SoldPlanId: number;
    ExpireAt: Date;
    IsExpired?: boolean;
    IsWaitingIPN:boolean;
    SubscriptionID?:string;
    URLSubDomain?:string;
    IsLifeTime?:boolean;
    OrganizationSubDomain?:string;
    isBranded?:boolean;
    constructor() {
        super();
    }
}

export class AddForwardUrl {
    URLPath: string;
    // id?: number
    // HostingUrl: string;
    TargetURL?: string;
    // URLHash: string;
}

export class UpdateForwardURL {
    ForwardUrlId: number;
    TargetURL: string;
}


export class FreeUrlCount extends StatusModel {
    public Count: number;
}

export class AvailableUrl {
    url: string|null;
    subdomain?:string
}

export class urlForwarders extends StatusModel {
    constructor() {
        super();
        this.urls = [];
    }
    urls: urlForwarder[];
    totalRecords: number;
}
export class GetUrlTrackParamModel {
    URLForwarderID: number;
}
export class UrlTrackParamListAddModel {
    isQueryParamAppended: boolean;
    URLForwarderID: number;
    urlTackParams: UrlTrackParamAddModel[];
}

export class UrlTrackParamAddModel {
    TrackParamName: string;
    TrackParamValue: string;
}

export class URLPayModel{
    PlanID: number;
    URLForwarderID:number;
}
export class UpdateForwardURLSubscriptionModel
{
    ForwardUrlId: number;
    SubscriptionID: string;
}

export class urlTrackParamListModel extends StatusModel
{
    constructor()
    {
        super();
        this.TrackParams= [];
    }
    isQueryParamAppended: boolean;
       URLForwarderID:number;
        TrackParams: urlTrackparamModel[];
        TotalRecords: number;
}
export class urlTrackparamModel{
    URLTrackParamID: number;
  URLForwarderID: number;
  TrackParamName: string;
  TrackParamValue: string;
}