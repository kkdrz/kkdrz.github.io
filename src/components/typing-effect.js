import React from "react"

class TypingEffect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lines: ["", ""],
      cursors: [{ enabled: false }, { enabled: false }],
      cursorsHidden: true,
      cursorToggleTime: 500,
      typingDelay: 60,
    }

    this.init = this.init.bind(this)
    this.enableCursor = this.enableCursor.bind(this)
    this.disableCursor = this.disableCursor.bind(this)
    this.type = this.type.bind(this)
    this.undo = this.undo.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.enableCursor(0)

    // typing scenario
    this.type(0, "Hi, I'm Konrad.").then(() => {
      this.type(0, "<br> I break", 500).then(() => {
        this.undo(0, 12, 1000).then(() => {
          this.disableCursor(0)
          this.enableCursor(1)
          this.type(1, "I program things.", 1500)
        })
      })
    })

    // cursors blinking
    setInterval(() => {
      this.setState(prevState => {
        return { ...prevState, cursorsHidden: !prevState.cursorsHidden }
      })
    }, this.state.cursorToggleTime)
  }
  type(lineNumber, text, wait) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (text.length === 0) {
          resolve()
        } else {
          let lines = this.state.lines
          lines[lineNumber] += text.charAt(0)
          this.setState({ lines })

          setTimeout(
            () =>
              this.type(lineNumber, text.substring(1), 0).then(() => {
                resolve()
              }),
            this.state.typingDelay
          )
        }
      }, wait)
    })
  }
  undo(lineNumber, charsNumbers, wait) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (charsNumbers < 1) {
          resolve()
        } else {
          let lines = this.state.lines
          lines[lineNumber] = lines[lineNumber].substr(
            0,
            this.state.lines[lineNumber].length - 1
          )
          this.setState({ lines })
          setTimeout(
            () =>
              this.undo(lineNumber, charsNumbers - 1, 0).then(() => {
                resolve()
              }),
            this.state.typingDelay
          )
        }
      }, wait)
    })
  }

  enableCursor(lineNumber) {
    let cursors = this.state.cursors
    let cursor = { ...cursors[lineNumber], enabled: true }
    cursors[lineNumber] = cursor
    this.setState({ cursors })
  }

  disableCursor(lineNumber) {
    let cursors = [...this.state.cursors]
    let cursor = { ...cursors[lineNumber], enabled: false }
    cursors[lineNumber] = cursor
    this.setState({ cursors })
  }

  render() {
    return (
      <div className="flex flex-col" style={{
        fontFamily: "Consolas, Monaco, 'Andale Mono', monospace"
      }}>
        {this.state.lines.map((line, i) => {
          return (
            <div key={i} className="h-7 md:h-10 lg:h-14 flex">
              <div className="text-xl md:text-4xl lg:text-5xl whitespace-nowrap">
                {line}
              </div>
              <span
                className={`w-0.5 md:w-1 ${
                  this.state.cursorsHidden || !this.state.cursors[i].enabled
                    ? "bg-white"
                    : "bg-gray-600"
                }`}
              ></span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default TypingEffect
