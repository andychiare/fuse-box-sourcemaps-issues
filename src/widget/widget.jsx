import React, { Component } from 'react'
import { fn1, fn3, fn4 } from "mylib"

class Widget extends Component {
  render() {
    console.log("Rendering the widget")
    const c = 1 * 10 * fn3()
    return (
      <div>
        <p>{`I'm a Widget: ${fn1()} ${c}` }</p>
        {fn4("widget")}
      </div>
    )
  }
}

module.exports = {
  mainComponent: Widget
};