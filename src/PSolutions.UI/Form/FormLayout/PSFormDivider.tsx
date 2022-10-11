import React from "react";

interface Props {
}

export class PSFormDivider extends React.PureComponent<Props> {
  render() {
    return <div className="border-dashed-bottom my-3"/>;
  }
}