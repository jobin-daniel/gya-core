'use client'

import { useState } from 'react'

export default function Header() {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen)
  }

  return (
    <header className="header">
      <div className="headercontainer-wrapper">
        <div className="container">
          <div className="inner">
            {/* Left Box - Logo and Course/Institute Links */}
            <div className="lftbox" data-aos="fade-right" data-aos-duration="1000">
              <a href="/" title="Gyatech - Get Your Admission" className="logo">
                <img src="/images/logo.svg" alt="Gyatech - Get Your Admission" />
              </a>
              <div className="coursescolleges-wrapper">
                <a href="/courses" className="item" title="Courses">
                  <span className="wrap">
                    <span className="icon">
                      <img src="/images/courses.svg" alt="Courses" width="30" height="30" />
                    </span>
                    <span className="title">Courses</span>
                  </span>
                </a>
                <a href="/institutes" className="item" title="Institutes">
                  <span className="wrap">
                    <span className="icon">
                      <img src="/images/institutes.svg" alt="Institutes" width="30" height="30" />
                    </span>
                    <span className="title">Institutes</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Box - Help and Account */}
            <div className="rgtbox" data-aos="fade-left" data-aos-duration="1000">
              <div className="wrap">
                <a href="/contact-us" title="Help" className="item">
                  <span className="icon">
                    <img src="/images/help.svg" alt="Help" width="22" height="22" />
                  </span>
                  <span className="txt">Help</span>
                </a>
                
                {/* Account Dropdown - React-controlled */}
                <span 
                  className={`item account-dropdown ${accountDropdownOpen ? 'active' : ''}`}
                  onClick={toggleAccountDropdown}
                >
                  <span className="title-account">
                    <span className="icon">
                      <img src="/images/account.svg" alt="Account" width="23" height="22" />
                    </span>
                    <span className="txt">Account</span>
                    <span className="arrow">
                      <img src="/images/arrow.svg" alt="Arrow" width="10" height="6" />
                    </span>
                  </span>
                  <span className="account-submenu" style={{ display: accountDropdownOpen ? 'block' : 'none' }}>
                    <a href="/login" title="Login">Login</a>
                    <a href="/student-signup" title="Student Sign Up">Student Sign Up</a>
                    <a href="/institute-signup" title="Institute Sign Up">Institute Sign Up</a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}