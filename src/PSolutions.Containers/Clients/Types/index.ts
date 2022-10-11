import { ICrud } from "../../../PSolutions.Contracts/Common";

/**
 * Employee interface
 */
export interface IEmployee {
  id: number;
  title: string;
  email: string;
  lastName: string;
  firstName: string;
  services: number[];
  profilePhoto: string;
  canOnlineBook: boolean;
  orderingNumber: number;
  branchOfficeId: number;
  employeePauseRules: any[];
  mondayStartTime: string;
  mondayEndTime: string;
  tuesdayStartTime: string;
  tuesdayEndTime: string;
  wednesdayStartTime: string;
  wednesdayEndTime: string;
  thursdayStartTime: string;
  thursdayEndTime: string;
  fridayEndTime: string;
  fridayStartTime: string;
  isSundayWorking: boolean;
  isMondayWorking: boolean;
  isTuesdayWorking: boolean;
  isWednesdayWorking: boolean;
  isThursdayWorking: boolean;
  isFridayWorking: boolean;
  isSaturdayWorking: boolean;
  customServiceOptions: CustomServiceOptions[];
}

export interface CustomServiceOptions {
  serviceId: number;
  employeeId: number;
  servicePrice: number;
  estimatedDuration: number;
  serviceTargetSplitTime: number;
  defaultServicePrice: number;
  defaultEstimatedDuration: number;
}

export interface IEmployeeProps extends ICrud<IEmployee> {
}