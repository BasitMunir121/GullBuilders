export class HSessions {
    public static readonly AuthTokenKey: string = "authToken";
    public static readonly ApiUrl: string = "apiUrl"; 
    public static readonly DateFormat: string = "dateFormat";
  }
  
  export class JwtClaimData {
    public static readonly ADUserName: string = "ADUserName";
    public static readonly MobileNo: string = "MobileNo";
    public static readonly EmailAddress: string = "EmailAddress";
  }

  export class HClasses {
    public static readonly EditButton: string = "<i class='fa fa-edit fa-primary fa-icon'></i>";
    public static readonly DeleteButton: string = "<i class='fa fa-trash fa-danger fa-icon'></i>";
    public static readonly ViewButton: string = "<i class='fa fa-info fa-primary fa-icon'></i>";
  }

  export class GConstants
  {
    public static readonly MaxPageSize: number = 1000000;
  }

  
export enum HColors {
  Light = 'light',
  Primary = 'primary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  LightPrimary = 'light-primary',
  LightSuccess = 'light-success',
  LightDanger = 'light-danger',
  LightWarning = 'light-warning',
  OutlineSecondary = 'outline-secondary'
}

export enum HColorCodes {
  Primary = '#3699FF',
  Success = '#14A562',
  Danger = '#BF0144',

  Lighter = '#FAFAFA',
  Light = '#E4E4E4',
  Dark = '#00000099',
  Darker = '#050505',

  Muted = '#A1A5B7',
}

export enum HButtonSizes {
  Small = 'sm',
  ExtraSmall = 'xs'
}

export enum HButtonTypes {
  Edit = 'edit',
  Delete = 'delete',
  DropDown = 'dropdown',
  Save = 'save',
  Cancel = 'cancel',
  Continue = 'continue',
  Custom = 'custom',
  Popover = 'popover',
  Dashboard = 'dashboard',
  Anchor = 'anchor',
  Cross = 'cross',
  Connectivity = 'connectivity',
  Icon = 'icon'
}

export enum HBadgeTypes {
  Text = 'text',
  Block = 'block'
}
