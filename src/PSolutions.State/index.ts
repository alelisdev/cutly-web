import { combineReducers } from "redux";
import { AppReducer } from "../PSolutions.App/Redux/Reducer";
import { ServiceReducer } from "../PSolutions.Containers/Services/Redux/Reducer";
import { CategoryReducer } from "../PSolutions.Containers/Category/Redux/Reducer";
import { LocationReducer } from "../PSolutions.Containers/Locations/Redux/Reducer";
import { EmployeeReducer } from "../PSolutions.Containers/Employees/Redux/Reducer";
import { ClientReducer } from "../PSolutions.Containers/Clients/Redux/Reducer";
import { CurrentLocationReducer } from "../PSolutions.Containers/Location/Redux/Reducer";
import { BookingSettingsReducer } from "../PSolutions.Containers/BookingSettings/Redux/Reducer";

const RootReducer = combineReducers({
  app: AppReducer,
  services: ServiceReducer,
  employee: EmployeeReducer,
  client: ClientReducer,
  locations: LocationReducer,
  categories: CategoryReducer,
  bookingSettings: BookingSettingsReducer,
  currentLocation: CurrentLocationReducer,
});

export type IRootState = ReturnType<typeof RootReducer>;

export { RootReducer }