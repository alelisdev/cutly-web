import { CropperState } from "react-advanced-cropper";

export function GetCropperCenter(state: CropperState): any {
  if (!state.coordinates) return;
  const left = state.imageSize.width / 2 - state.coordinates.width / 2;
  const top = state.imageSize.height / 2 - state.coordinates.height / 2;

  return {left: left, top: top}
}