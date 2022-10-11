import React from "react";
import cn from "classnames";
import { HueIcon } from "../Icons/HueIcon";
import { CropIcon } from "../Icons/CropIcon";
import styles from './cropper.nav.module.css';
import { UploadIcon } from "../Icons/UploadIcon";
import { ContrastIcon } from "../Icons/ContrastIcon";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { SaturationIcon } from "../Icons/SaturationIcon";
import { BrightnessIcon } from "../Icons/BrightnessIcon";
import { CropperButton } from "../Buttons/CropperButton";

interface Props {
  mode: string;

  handleImageSave(): void;

  setMode(mode: string): void;

  handleUpload(string: string): void;
}

export class CropperNavigation extends React.PureComponent<Props> {
  private readonly inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef<HTMLInputElement>();
    this.handleClick = this.handleClick.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleClick() {
    this.inputRef.current?.click();
  }

  handleImageLoad(event: React.ChangeEvent<HTMLInputElement>) {
    const {files} = event.target;
    if (!files || !files[0]) return;

    this.props.handleUpload(URL.createObjectURL(files[0]));
    event.target.value = "";
  }

  render() {
    const {mode, setMode} = this.props;
    return (
      <div className={cn(styles.imageEditorNavigation)}>
        <CropperButton className={styles.navButton} onClick={this.handleClick}>
          <UploadIcon/>
          <input ref={this.inputRef} type="file" accept="image/*" onChange={this.handleImageLoad} className={styles.uploadButton}/>
        </CropperButton>
        <div className={styles.imageEditorNavigationButtons}>
          <CropperButton className={styles.navButton} active={mode === "crop"} onClick={() => setMode("crop")}><CropIcon/></CropperButton>
          <CropperButton className={styles.navButton} active={mode === "saturation"} onClick={() => setMode("saturation")}><SaturationIcon/></CropperButton>
          <CropperButton className={styles.navButton} active={mode === "brightness"} onClick={() => setMode("brightness")}><BrightnessIcon/></CropperButton>
          <CropperButton className={styles.navButton} active={mode === "contrast"} onClick={() => setMode("contrast")}><ContrastIcon/></CropperButton>
          <CropperButton className={styles.navButton} active={mode === "hue"} onClick={() => setMode("hue")}><HueIcon/></CropperButton>
        </div>
        <CropperButton className={styles.navButton} onClick={this.props.handleImageSave}><DownloadIcon/></CropperButton>
      </div>
    );
  }
}
