import * as React from "react"
import { Link } from "gatsby"

const Header = ({ children }) => {
  const menuItemClasses = "text-gray-800 hover:text-gray-900 py-2 px-4"

  return (
    <header className="p-2 flex text-lg justify-between border-b-2">
      <div className="flex">
          <Link className={menuItemClasses} to="/">kdrozd.pl</Link>
      </div>
      <div className="flex">
          <Link className={menuItemClasses} to="/blog">Blog</Link>
          {/* <Link className={menuItemClasses} to="/snippets">Snippets</Link> */}
          <Link className={menuItemClasses} to="/about">About me</Link>
      </div>
    </header>
  )
}

export default Header
