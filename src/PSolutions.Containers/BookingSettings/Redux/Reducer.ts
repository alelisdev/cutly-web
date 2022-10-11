import { Reducer } from "redux";
import { BookingSettingsActions } from "./Actions";
import { BookingSettingsActionsEnum } from "./ReduxActions";
import { IBookingSettings, IBookingSettingsProps } from "../Types";

const initialState: IBookingSettingsProps = {
  isBusy: false,
  showError: false,
  errorMessage: "",
  settings: {
    id: 0,
    onlyCalls: false,
    autoConfirm: false,
    branchOfficeId: 0,
    onlyMyClients: false,
    splitTimeInterval: 30,
    reschedulingInMinutes: 180,
    bookingForFutureInMonths: 2,
    ruleForOnlyMyClients: 0,
    restMinutesBetweenCustomers: 0,
    hideFirstAvailableOption: false,
    bookingInAdvancedInMinutes: 180,
    defaultReminderTimeInMinutes: 120,
    disableAllOnlineReservations: false,
    oneDayBeforeReminderHours: undefined,
    threeDaysBeforeReminderHours: undefined,
    disableBookingsForClientsWith3NoShow: true,
  } as IBookingSettings,
};

const BookingSettingsReducer: Reducer<IBookingSettingsProps, BookingSettingsActions> = (state: IBookingSettingsProps = initialState, action: BookingSettingsActions) => {
  switch (action.type) {
    // Gets locations
    case BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_REQUESTED:
      return {...state, isBusy: true};
    case BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_SUCCESS:
      return {...state, isBusy: false, settings: action.payload};
    case BookingSettingsActionsEnum.GET_BOOKING_SETTINGS_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Adds new location
    case BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_REQUESTED:
      return {...state, isBusy: true};
    case BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_SUCCESS:
      return {...state, isBusy: false};
    case BookingSettingsActionsEnum.UPDATE_BOOKING_SETTINGS_FAILURE:
      return {...state, isBusy: false, showError: true, errorMessage: action.payload.displayMessage};

    // Utility
    case BookingSettingsActionsEnum.BOOKING_SETTINGS_CLEAR_ERROR:
      return {...state, showError: false, errorMessage: ""}
    case BookingSettingsActionsEnum.BOOKING_SETTINGS_CLEAR_STATE:
      return {...state, ...initialState}
    default:
      return state;
  }
}

export { BookingSettingsReducer };