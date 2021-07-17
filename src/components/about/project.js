import React from "react"


const Project = ({ title, duration, children, keywords }) => {
  return (
    <div className="flex flex-col md:flex-row mt-2 pt-1">
      <div className="flex flex-col flex-shrink-0 border-b md:border-r md:w-2/12">
        <span>{title}</span>
        <div className="italic text-sm text-gray-500">{duration}</div>
      </div>
      <div className="flex flex-col pt-1 md:pl-4 w-full text-justify">
        <div>{children}</div>

        <div className="flex flex-row flex-wrap py-2">
          {keywords.map((keyword, i) => (
            <Keyword key={i}>{keyword}</Keyword>
          ))}
        </div>
      </div>
    </div>
  )
}

const Keyword = ({ children }) => {
    return (
      <div className="flex bg-blue-500 rounded-md px-3 py-0.5 text-gray-100 mr-2 mt-1">
        {children}
      </div>
    )
  }

export default Project
