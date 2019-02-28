import React, {Component} from 'react'
import { render } from 'react-dom'
import { fn2, fn4 } from "mylib"

class Root extends Component {
  constructor() {
    this.state = {}
  }
  
  componentDidMount() {
    this.loadWidget()
  }

  async loadWidget() {
    await import("widget.js")
    if (WidgetModule && (WidgetModule.mainComponent || WidgetModule.default)) {
      const Component = WidgetModule.mainComponent
      this.setState({
        widget: <Component/>
      })
    }
  }

  render() {
    return (
      <div>
        <p>{"I'm the app: " + fn2()}</p>
        {fn4("app")}
        {this.state.widget ? this.state.widget : <p>{"Waiting for widget"}</p>}
      </div>
    )
  }
}

render(
    <Root />,
    document.getElementById('appContainer')
)