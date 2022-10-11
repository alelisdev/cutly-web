import { ICrud } from "../../../PSolutions.Contracts/Common";

/**
 * Location type
 */
export interface ILocation {
  name: string;
  city: string;
  zipCode: string;
  street: string;
  country: string;
  companyId: number;
  currency: string;
  address: string;
  providerId: number;
  addressNote: string;
  coverImage?: string;
  neighborhood: string;
  streetNumber: string;
}

/**
 * New location request
 */
export interface ILocationRequest {
  name: string;
  city: string;
  street: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  streetNumber: string;
}

export interface ILocationProps extends ICrud<ILocation> {
  locationRequest: ILocationRequest
}