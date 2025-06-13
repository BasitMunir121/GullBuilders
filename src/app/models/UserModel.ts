import { StatusModel } from "./shared/PaginationModel";

export class UserModel extends StatusModel {

    constructor() {
        super();
    }

    public UserId: number;
    public UserName: string;
    public EntityName: string;
    public EmailAddress: string;
    public PhoneNo: string;
    public Description: string;
    public EntityId?: number;
    public UserRoleId: number;
    public RoleName?: string;
    public DateAdded?: Date;
}


export class  User extends StatusModel{
    id!: number;
    email!: string;
    role_id!: number;
    created_at?: Date;
    IsFarmer: boolean=false;
    IsVendor: boolean=false;
    IsGovtAgency: boolean=false;
    public isExpired?:boolean = true;
}



export class AuthResponseDto extends StatusModel
{
    public Token?: string;
}