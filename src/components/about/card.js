import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useState } from "react"
import Expand from "react-expand-animated"

const Card = ({ image, mainTitle, subTitle, detailsButton, children }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col p-8 shadow-md2">
      <div className="flex flex-row items-center max-h-24">
        {image}
        <div className="flex flex-row w-full ml-8">
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{mainTitle}</span>
            <span className="italic text-sm text-gray-500">{subTitle}</span>
          </div>

          <button hidden={!children}
            className={
              "ml-auto p-2 " +
              (expanded ? "" : "animate-pulse")
            }
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide " : "Show "}{detailsButton}
            <FontAwesomeIcon
              className={"" + (expanded ? "pr-1 transform rotate-180" : "pl-1")}
              size="1x"
              icon={faChevronDown}
            />
          </button>
        </div>
      </div>
      <Expand className={"flex flex-col pt-2"} open={expanded}>
        {children ? children : ""}
      </Expand>
    </div>
  )
}
export default Card
