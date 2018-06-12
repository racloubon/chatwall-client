import React from 'react';
import { Slider } from 'antd';

import './GridSliders.css';

class GridSliders extends React.Component {

  render () {
    return (
      <div className="sliderControls">
        <div style={{ flex: 1, marginRight: 16 }}>
          <span>Rows</span>
          <Slider
            min={0}
            max={Object.keys(this.props.rowCounts).length - 1}
            value={this.props.rowCountKey}
            onChange={this.props.onRowCountChange}
            marks={this.props.rowCounts}
            step={null}
          />
        </div>
        <div style={{ flex: 1, marginLeft: 16 }}>
          <span>Columns</span>
          <Slider
            min={0}
            max={Object.keys(this.props.colCounts).length - 1}
            value={this.props.colCountKey}
            onChange={this.props.onColumnCountChange}
            marks={this.props.colCounts}
            step={null}
          />
        </div>
      </div>
    );
  }
}

export default GridSliders;
