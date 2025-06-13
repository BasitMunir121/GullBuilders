import { StatusModel } from "./shared/PaginationModel";

export class PlanModel
{
    PlanID: number;
  PlanName: string;
  URLCount: number;
  IsOrganization:boolean;
  CreatedAt: Date;
}
export class planDto{
    ListPriceCents: number;
    PlanID: number;
    PlanName: string;
    URLsIncluded: number;
}
export class ListPlanModel extends StatusModel{
    constructor()
        {
            super();
            this.Plans= [];
        }
    Plans: PlanModel[];
    TotalRecords: number;
}


export class SoldPlanModel{
    SoldPlanID: number;
    PlanID: number;
    OwnerID: number;
    CreatedAt: Date
    Username: string;
    PlanName: string;
}

export class AddSoldPlanModel{
    PlanID: number;
    //UserId: number;
   // OrganizationName: string;
    ShortName: string;
}

export class ListSoldPlanModel extends StatusModel{
    constructor()
    {
        super();
        this.SoldPlans= [];
    }
    SoldPlans: SoldPlanModel[];
    TotalRecords: number;
}