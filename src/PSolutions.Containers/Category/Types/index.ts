import { ICrud } from "../../../PSolutions.Contracts/Common";

/**
 * Employee interface
 */
export interface ICategory {
  id: number;
  name: string;
  description: string;
  branchOfficeId: number;
}

export interface ICategoryProps extends ICrud<ICategory> {
}