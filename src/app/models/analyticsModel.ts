import { StatusModel } from "../models/shared/PaginationModel";

export class OwnerHitsModel {
    OwnerID: number;
    TotalHitsToday: number;
    TotalHitsTodayMinus1: number;
    TotalHitsTodayMinus2: number;
    TotalHitsTodayMinus3: number;
    TotalHitsTodayMinus4: number;
    TotalHitsTodayMinus5: number;
    TotalHitsTodayMinus6: number;
    TotalHitsThisWeek: number;
    TotalHitsThisWeekMinus1: number;
    TotalHitsThisWeekMinus2: number;
    TotalHitsThisWeekMinus3: number;
    TotalHitsThisWeekMinus4: number;
    TotalHitsThisMonth: number;
    TotalHitsThisMonthMinus1: number;
    TotalHitsThisMonthMinus2: number;
    TotalHitsThisMonthMinus3: number;
    TotalHitsThisMonthMinus4: number;
    constructor(){
      this.TotalHitsThisMonth=0;
      this.TotalHitsThisWeek=0;
      this.TotalHitsToday=0;
    }
  }

  export class URLForwarderHitsModel {
    URLForwarderID: number;
    URLPath: string;
    OwnerID: number;
    TotalHitsToday: number;
    TotalHitsTodayMinus1: number;
    TotalHitsTodayMinus2: number;
    TotalHitsTodayMinus3: number;
    TotalHitsTodayMinus4: number;
    TotalHitsTodayMinus5: number;
    TotalHitsTodayMinus6: number;
    TotalHitsThisWeek: number;
    TotalHitsThisWeekMinus1: number;
    TotalHitsThisWeekMinus2: number;
    TotalHitsThisWeekMinus3: number;
    TotalHitsThisWeekMinus4: number;
    TotalHitsThisMonth: number;
    TotalHitsThisMonthMinus1: number;
    TotalHitsThisMonthMinus2: number;
    TotalHitsThisMonthMinus3: number;
    TotalHitsThisMonthMinus4: number;

    constructor(){
      this.TotalHitsThisMonth=0;
      this.TotalHitsThisWeek=0;
      this.TotalHitsToday=0;
      this.URLPath='';
    }
  }

  export class HitLogModel {
    HitLogID: number;
    URLForwarderID: number;
    OwnerID: number;
    FromIPAddress: string;
    TargetURL: string | null;
    HitTime: Date;
    CountrySHORT:string;
  }

export class OwnerStatsModel extends StatusModel{
  OwnerLogs: OwnerHitsModel;
  UrlLogs: URLForwarderHitsModel[];
  constructor() {
    super();
    this.OwnerLogs=new OwnerHitsModel();
    this.UrlLogs= [];
}
}

  export class HitLogListing {
    hitLogs: HitLogModel[];
    TotalRecords:number
    constructor()
    {
      this.TotalRecords=0;
    }
  }

  export class EducationalContent {
    id: number;
    title: string;
    content: string;
    advisory_id: number;
    published_at?: Date;
  }
  export class ChatModel {
    auction_id: number;
    user_id:number;
    message: string;
  }
  export class BidModel {
    auction_id: number;
    user_id:number;
    amount: string;
  }
  export class ListEducationalContent{
    constructor(){
      this.items = []
    }
    items:EducationalContent[]
  }

  export class NotificationModel {
    id: number;
    title: string;
    content: string;
    advisory_id: number;
    published_at?: Date;
  }

  export class Products {
    id: number;
    name: string;
    description?: string;
    farmer_id?: number;
    base_price: number;
    quantity: number;
    created_at?: Date;
    updated_at?: Date;
    qr_code?: string;
    status?: 'available' | 'sold' | 'unlisted';
  }
  export class Auctions {
    id: number;
    product_id: number;
    start_time?: Date;
    end_time?: Date;
    starting_price: number;
  }