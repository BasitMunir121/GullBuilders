
export class StatusModel {
    public IsSuccess?: boolean;
    public ErrorDetails?: string;
    public Id?:number;
}

export class PaginationModel {
    public PageSize?: number;
    public CurrentPage?: number;
    public Search?:string;
}

export class HitsLogRequestModel extends PaginationModel
{
    public urlForwarderId: number;
}

export class AddStatusModel extends StatusModel {
    public RecordId: number;
}

export class GoogleAuthModel{
   // ClientId: string;
    OneTapEnabled: false;
}

export class HCResposeDto implements HCResponse{
    ResParam: ResParams;
    ResultSets: any[];
}
export interface HCResponse {
    ResParam: ResParams;
    ResultSets: any[];
}

export interface ResParams {
    QueryNames: string[]; 
    payload: any;
}



export class MicorsoftAuthModel{
    ClientId: string;
    TenantId: string ='';
   // ClientSecret: string;
}


