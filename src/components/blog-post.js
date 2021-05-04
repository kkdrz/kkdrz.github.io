import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const BlogPost = ({ title, date, excerpt, slug, featuredImage }) => {
  let frontImg = (
    <GatsbyImage
      imgClassName="h-full w-full object-cover md:w-72"
      className="h-full w-full object-cover md:w-72"
      image={featuredImage}
      alt="Front Picture"
    />
  )
  return (
    <Link className="hover:no-underline" to={slug}>
      <div className="max-w-md mx-auto bg-white shadow-md hover:shadow-xl transition duration-200 ease-in-out overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0 ">{frontImg}</div>
          <div className="p-3">
            <div className="uppercase tracking-wide font-semibold text-gray-700">
              {title}
            </div>
            <div className="block mt-1 text-sm text-gray-600 leading-tight font-medium ">
              {date}
            </div>
            <p
              className="mt-2 text-gray-500"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></p>
          </div>
        </div>
      </div>
    </Link>

    // <div className="flex">
    //   <div className="border-r-2 hidden sm:block md:flex-shrink-0">
    //     {frontImg}
    //   </div>
    //   <div className="ml-1 flex flex-col">
    //     <div className="border-b-2 sm:hidden w-1/3">{frontImg}</div>
    //     <div className="font-semibold">{title}</div>
    //     <div className="text-sm text-gray-600">{date}</div>
    //     <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
    //   </div>
    // </div>
  )
}

export default BlogPost
