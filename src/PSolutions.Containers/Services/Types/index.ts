import { ICrud } from "../../../PSolutions.Contracts/Common";

/**
 * Service contract
 */
export interface IService {
  id: number;
  price: number;
  color: number;
  index: number;
  priceTo?: number;
  currency: string;
  categoryId?: number;
  description: string;
  serviceName: string;
  servicePhoto: string;
  priceTypeEnum: number;
  branchOfficeId: number;
  employees: Array<number>;
  estimatedDuration: number;
  englishTranslation?: string;
  englishDescriptionTranslation: string;
}

export interface IServiceProps extends ICrud<IService> {
  isDeleting: boolean;
}

/**
 * IOrder category request
 */
export interface IOrderCategoryRequest {
  sourceIndex: number;
  destinationIndex: number;
  allServices: Array<IService>;
  sourceServices: Array<IService>;
}

/**
 * IOrder category request
 */
export interface IOrderServicesRequest extends IOrderCategoryRequest {
  destinationCategory?: number;
  destinationServices: Array<IService>;
}