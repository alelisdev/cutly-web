import cn from 'classnames';
import * as React from 'react';
import styles from './slider.module.css';

interface Props {
  value: number;
  className: string;

  onChange(value: number): void;
}

interface State {
  width: number;
  focus: boolean;
}

export class Slider extends React.PureComponent<Props, State> {
  static defaultProps = {value: 0}
  private readonly lineRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {width: 0, focus: false};
    this.handleDrag = this.handleDrag.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.lineRef = React.createRef<HTMLDivElement>();
    this.recalculateWidth = this.recalculateWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.recalculateWidth);
    window.addEventListener("orientationchange", this.recalculateWidth);

    window.addEventListener("mouseup", this.handleStop, {passive: false});
    window.addEventListener("mousemove", this.handleDrag, {passive: false});
    window.addEventListener("touchmove", this.handleDrag, {passive: false});
    window.addEventListener("touchend", this.handleStop, {passive: false});

    if (!this.lineRef?.current) return;
    this.lineRef.current.addEventListener("mousedown", this.handleStart);
    this.lineRef.current.addEventListener("touchstart", this.handleStart);

    this.recalculateWidth();
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleStop);
    window.removeEventListener("mousemove", this.handleDrag);
    window.removeEventListener("touchmove", this.handleDrag);
    window.removeEventListener("touchend", this.handleStop);

    window.removeEventListener("resize", this.recalculateWidth);
    window.removeEventListener("orientationchange", this.recalculateWidth);

    if (!this.lineRef?.current) return;
    this.lineRef.current.removeEventListener("mousedown", this.handleStart);
    this.lineRef.current.removeEventListener("touchstart", this.handleStart);
  }

  handleStop() {
    this.setState({focus: false});
  }

  handleStart(e: any) {
    this.setState({focus: true});
    this.handleDrag(e)
  }

  recalculateWidth() {
    if (!this.lineRef.current) return;
    this.setState({width: this.lineRef.current.clientWidth});
  }

  handleDrag(event: any) {
    if (!this.state.focus) return;
    if (!this.lineRef.current) return;

    const line = this.lineRef.current;
    const position = "touches" in event ? event.touches[0].clientX : event.clientX;

    const {left, width} = line.getBoundingClientRect();
    if (this.props.onChange) this.props.onChange(Math.max(-1, Math.min(1, (2 * (position - left - width / 2)) / width)));

    if (!!event.preventDefault) event.preventDefault();
  }

  render() {
    const {focus, width} = this.state;
    const {value} = this.props;

    const fillWidth = `${Math.abs(value) * 50}%`;
    const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;
    const handleInsideDot = width ? Math.abs(value) <= 16 / width : true;
    const formattedValue = `${value > 0 ? "+" : ""}${Math.round(100 * value)}`;

    const appliedStyles = cn(styles.cropperSlider, this.props.className);
    const appliedStyles2 = cn(styles.cropperSliderValue, {[styles.cropperSliderHandlerHidden]: handleInsideDot});
    const appliedStyles3 = cn(styles.cropperSliderHandler, {[styles.cropperSliderHandlerFocus]: focus}, {[styles.cropperSliderHandlerHidden]: handleInsideDot});

    return (
      <div ref={this.lineRef} className={appliedStyles}>
        <div className={styles.cropperSliderLine}>
          <div className={styles.cropperSliderFill} style={{width: fillWidth, left: fillLeft}}/>
          <div className={styles.cropperSliderDot}/>
          <div className={appliedStyles2} style={{left: `${Math.abs(value * 50 + 50)}%`}}>{formattedValue}</div>
          <div className={appliedStyles3} style={{left: `${value * 50 + 50}%`}}/>
        </div>
      </div>
    );
  }
}