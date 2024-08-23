import React, { Component } from "react";

//podsyłam poniżej stronkę gdzie jest opisane jak stylizować ten switch
//https://markusenglund.github.io/react-switch/
import Switch from "react-switch";

class basicSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label className="switch">
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

export default basicSwitch;