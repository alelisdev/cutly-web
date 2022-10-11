import { IBasic } from "../../../PSolutions.Contracts/Common";

/**
 *  Booking settings request.
 */
export interface IBookingSettingsRequest {
}


export interface IBookingSettings {
  id: number;
  onlyCalls: boolean;
  autoConfirm: boolean;
  branchOfficeId: number;
  onlyMyClients: boolean;
  splitTimeInterval: number;
  ruleForOnlyMyClients: number;
  reschedulingInMinutes: number;
  bookingForFutureInMonths: number;
  hideFirstAvailableOption: boolean;
  bookingInAdvancedInMinutes: number;
  restMinutesBetweenCustomers: number;
  defaultReminderTimeInMinutes: number;
  disableAllOnlineReservations: boolean;
  disableBookingsForClientsWith3NoShow: boolean;
  oneDayBeforeReminderHours: string | undefined;
  threeDaysBeforeReminderHours: string | undefined;
}


export interface IBookingSettingsProps extends IBasic {
  settings: IBookingSettings;
}