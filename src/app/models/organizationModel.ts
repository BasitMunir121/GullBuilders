import { StatusModel } from "./shared/PaginationModel";


export class OrganizationModel extends StatusModel {
  constructor() {
    super();
    this.ShortName = this.OrganizationPrefix ?? '';
  }
  OrganizationID: number;
  DisplayName: string;
  OrganizationPrefix: string;
  OrganizationSubDomain: string;
  ShortName: string;
  SoldplanID: number;
  CreatedAt: Date;
  PlanID: number;
  PaidTill?: Date;
  WaitingForIPN: boolean = false;
}

export class ListOrganizationModel extends StatusModel {
  constructor() {
    super();
    this.Organizations = [];
  }
  Organizations: OrganizationModel[];
  TotalRecords: number;
}

export class AddOrganizationUrlModel {
  URLPath: string;
  // TargetURL: string;
  //URLHash: string;
  OrganizationID: number;
}
export class AddOrganizationModel {
  PlanID: number;
  //OwnerID:number;
  SubscriptionID: string | null = null
  //SubscriptionID?: string;
  OrganizationPrefix: string;
  FriendlyName: string;
  PromoCode: string | null = null;
}
export class AddBrandedOrganizationModel {
  PlanID: number;
  SubscriptionID: string | null = null
  OrganizationSubDomain: string;
  FriendlyName: string;
  PromoCode: string | null = null;
}
export class AddPrefixOrganizationModel {
  PlanID: number;
  SubscriptionID: string | null = null;
  OrganizationPrefix: string;
  FriendlyName: string;
  PromoCode: string | null = null;
}
export class OrganizationPlanUpdateModel
{
  OrganizationID: number;
  PlanID: number;
  SubscriptionID:number;
}
export class OrganizationStatsModel extends StatusModel
{
  OrganizationID: number;
  TotalURLs:number;
  UsedURLs:number;
  PlanID:number;
}
export class PromoConfigModel extends StatusModel
{
    IsAllowed: boolean;
}