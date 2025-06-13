import { HBadgeTypes, HButtonSizes, HButtonTypes, HColorCodes, HColors } from "./common-constants";
import { AuthService } from "../services/authservice";

export class BaseClass {

    public date = ColumnType.DataTime;

    public save = HButtonTypes.Save;
    public cancel = HButtonTypes.Cancel;
    public continue = HButtonTypes.Continue;
    public edit = HButtonTypes.Edit;
    public delete = HButtonTypes.Delete;
    public custom = HButtonTypes.Custom;
    public dropdown = HButtonTypes.DropDown;
    public popover = HButtonTypes.Popover;
    public dashboard = HButtonTypes.Dashboard;
    public anchor = HButtonTypes.Anchor;
    public cross = HButtonTypes.Cross;
    public connectivity = HButtonTypes.Connectivity;
    public icon = HButtonTypes.Icon;

    public light = HColors.Light;
    public primary = HColors.Primary;
    public success = HColors.Success;
    public danger = HColors.Danger;
    public warning = HColors.Warning;
    public primaryLight = HColors.LightPrimary;
    public successLight = HColors.LightSuccess;
    public dangerLight = HColors.LightDanger;
    public warningLight = HColors.LightWarning;
    public outlineSecondary = HColors.OutlineSecondary;

    public primaryColorCode = HColorCodes.Primary;
    public successColorCode = HColorCodes.Success;
    public dangerColorCode = HColorCodes.Danger;
    public lighterColorCode = HColorCodes.Lighter;
    public lightColorCode = HColorCodes.Light;
    public darkColorCode = HColorCodes.Dark;
    public darkerColorCode = HColorCodes.Darker;
    public mutedColorCode = HColorCodes.Muted;

    public small = HButtonSizes.Small;
    public extraSmall = HButtonSizes.ExtraSmall;

    public text = HBadgeTypes.Text;
    public block = HBadgeTypes.Block;

    constructor(auth: AuthService) { }
}

export enum ColumnType {
    Text, DataTime
  }