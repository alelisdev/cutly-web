import React, { forwardRef, useEffect, useRef } from 'react';
import { getBackgroundStyle, mergeRefs } from 'react-advanced-cropper';
import styles from './adjustable.module.css';

interface Props {
  cropper: any;
  hue: number;
  contrast: number;
  crossOrigin: any;
  className: string;
  brightness: number;
  saturation: number;
}

export const AdjustableImage = forwardRef(({className, cropper, crossOrigin, brightness = 0, saturation = 0, hue = 0, contrast = 0}: Props, ref: any) => {
  const state = cropper.getState();
  const image = cropper.getImage();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const src = image ? image.src : undefined;
  const transitions = cropper.getTransitions();
  const style = image && state ? getBackgroundStyle(image, state, transitions) : {};

  useEffect(() => {
    drawImage();
  }, [brightness, saturation, hue, contrast]);

  function drawImage() {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !image || !image.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = [`brightness(${100 + brightness * 100}%)`, `contrast(${100 + contrast * 100}%)`, `saturate(${100 + saturation * 100}%)`, `hue-rotate(${hue * 360}deg)`].join(' ');
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    }

    return (
      <React.Fragment>
        <canvas ref={mergeRefs([ref, canvasRef])} className={className} style={style}/>
        {!!src && <img key={src} ref={imageRef} className={styles.adjustableImageSource} src={src} onLoad={drawImage} alt='NotFound'/>}
      </React.Fragment>
    );
  },
);

AdjustableImage.displayName = 'AdjustableImage';
