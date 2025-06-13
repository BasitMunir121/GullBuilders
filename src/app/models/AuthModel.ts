import { StatusModel } from "./shared/PaginationModel";

export class AzureTokenInputModel {
    public AccessToken?: string;
    public SSOClient?: string;
    public PromoCode?: string;
    public email?: string;
    public password?: string;
}


export class TokenOuputModel extends StatusModel {
    public UserId: number;
   
    public AuthToken: string;
    public OTPVerified: boolean;
    public ShowResend: boolean;
}