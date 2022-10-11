import React from "react";
import cn from "classnames";
import { Modal } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import { ArbitraryProps } from 'react-advanced-cropper';
import { Cropper, CropperRef } from "react-advanced-cropper";
import { Slider } from "./Slider";
import { CropperNavigation } from "./Nav";
import { GetCropperCenter } from "./Utilities";
import cropperStyles from './Styles/cropper.module.css';
import { AdjustableImage } from "./Images/AdjustableImage";

interface Props {
  show: boolean;
  image: string
  placeholder: string;

  toggleModal(): void;

  handleImageUpload(base64: string): void;
}

interface State {
  image: string;
  mode: string;
  adjustments: {
    hue: number,
    contrast: number,
    saturation: number,
    brightness: number,
  },
  increment: number;
}

export class CutlyCropper extends React.Component<Props, State> {
  private readonly cropperRef: React.RefObject<CropperRef>;
  private defaultAdjustments = {brightness: 0, hue: 0, saturation: 0, contrast: 0}

  constructor(props: Props) {
    super(props);
    this.cropperRef = React.createRef<CropperRef>();
    this.setMode = this.setMode.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCenter = this.handleCenter.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
    this.getStencilProps = this.getStencilProps.bind(this);
    this.getOverlayStyles = this.getOverlayStyles.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.getBackgroundProps = this.getBackgroundProps.bind(this);
    this.handleImageSaveAsync = this.handleImageSaveAsync.bind(this);
    this.state = {image: props.placeholder, mode: 'crop', adjustments: this.defaultAdjustments, increment: 1};
  }

  setMode(mode: string) {
    this.setState({mode: mode})
  }

  handleOnShow() {
    this.setState({image: this.props?.image || this.props.placeholder});
  }

  resetState() {
    this.setState({mode: "crop", adjustments: this.defaultAdjustments})
  }

  handleMaximize() {
    if (!this.cropperRef.current) return;
    this.cropperRef.current.setCoordinates(({imageSize}) => imageSize);
  }

  handleCenter() {
    if (!this.cropperRef.current) return;
    this.cropperRef.current.setCoordinates(GetCropperCenter);
  }

  handleImageUpload(image: string) {
    this.setState({image: image});
  }

  async handleImageSaveAsync() {
    if (!this.cropperRef.current) return;
    const base64 = this.cropperRef.current.getCanvas()?.toDataURL() || "";

    const options = {maxSizeMB: 1, maxWidthOrHeight: 350, useWebWorker: false, initialQuality: 0.75};
    const image = await imageCompression.getFilefromDataUrl(base64, "avatar", new Date().getTime());
    const compressedFile: File = await imageCompression(image, options);

    const result = await imageCompression.getDataUrlFromFile(compressedFile);
    await this.props.handleImageUpload(result.replace(/^data:(.*,)?/, ""));
  }

  getStencilProps(): ArbitraryProps {
    const enabled = this.state.mode === 'crop';
    const appliedStyles = this.getOverlayStyles();
    return {lines: enabled, movable: enabled, resizable: enabled, handlers: enabled, overlayClassName: appliedStyles};
  }

  getBackgroundProps(): ArbitraryProps {
    const enabled = this.state.mode === 'crop';
    return {scaleImage: enabled, moveImage: enabled}
  }

  getOverlayStyles() {
    const cropperEnabled = this.state.mode === "crop";
    return cn(cropperStyles.imageEditorCropperOverlay, {[cropperStyles.imageEditorCropperOverlayFaded]: cropperEnabled});
  }

  handleChange(value: number) {
    const {adjustments, mode} = this.state;
    if (mode in adjustments) this.setState({adjustments: {...this.state.adjustments, [mode]: value}})
  }

  getCurrentValue() {
    const {adjustments, mode} = this.state;
    if (mode === "hue") return adjustments.hue;
    if (mode === "contrast") return adjustments.contrast;
    if (mode === "saturation") return adjustments.saturation;
    if (mode === "brightness") return adjustments.brightness;
  }

  render() {
    const {show} = this.props;
    const {image, mode, adjustments} = this.state;
    return (
      <Modal show={show} onShow={this.handleOnShow}>
        <Modal.Body className={cropperStyles.cutlyCropper}>
          <div className={cropperStyles.imageEditor}>
            <div className={cropperStyles.imageEditorCropper}>
              <Cropper
                src={image}
                ref={this.cropperRef}
                backgroundProps={adjustments}
                stencilProps={this.getStencilProps()}
                aspectRatio={{minimum: 1, maximum: 1}}
                backgroundComponent={AdjustableImage}
                backgroundWrapperProps={this.getBackgroundProps()}
              />
              {mode !== 'crop' && <Slider value={this.getCurrentValue()} onChange={this.handleChange} className={cropperStyles.imageEditorSlider}/>}
            </div>
            <CropperNavigation handleUpload={this.handleImageUpload} handleImageSave={this.handleImageSaveAsync} mode={mode} setMode={this.setMode}/>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}