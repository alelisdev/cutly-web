import { uniqBy } from "lodash";
import { DropResult } from "react-beautiful-dnd";
import { IOrderCategoryRequest, IOrderServicesRequest, IService } from "../Types";

/**
 * Reorders list
 * @param list
 * @param startIndex
 * @param endIndex
 */

export function reorderList<T>(list: Array<T>, startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Detect if has changes
 * @param result
 */
export function hasChanges(result: DropResult): boolean {
  const {destination, source} = result;
  return destination?.index !== source.index || destination.droppableId !== source.droppableId;
}


/**
 * Reorders same category
 */
export function reorderSameCategory(request: IOrderCategoryRequest) {
  const {sourceServices, sourceIndex, destinationIndex} = request;
  const orderedServices = reorderList(sourceServices, sourceIndex, destinationIndex);

  const dataToUpdate = [...orderedServices, ...request.allServices];
  return uniqBy(dataToUpdate, (service: IService) => service.id);
}

/**
 * Handle different category update
 * @param request
 */
export function reorderDifferentCategory(request: IOrderServicesRequest) {
  const {sourceServices, sourceIndex, destinationCategory, allServices} = request;
  const {destinationServices, destinationIndex} = request;

  const [draggedService] = sourceServices.splice(sourceIndex, 1);
  draggedService.categoryId = destinationCategory as any;
  destinationServices.splice(destinationIndex, 0, draggedService);

  const dataToUpdate = [...destinationServices, ...sourceServices, ...allServices];
  return uniqBy(dataToUpdate, (service: IService) => service.id);
}