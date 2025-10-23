'use client'

import { useEffect } from 'react'

export default function Footer() {
  useEffect(() => {
    // Go to top functionality
    const goToTopBtn = document.getElementById('gototop')
    if (goToTopBtn) {
      const handleClick = (e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      goToTopBtn.addEventListener('click', handleClick)
      return () => goToTopBtn.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <footer className="footer section">
      <a id="gototop" title="Go To Top" data-aos="fade-left" data-aos-duration="1000">
        <span className="inner">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L4.75736 0.757359L0.514719 5" stroke="#4A4A4A" strokeLinecap="round"/>
          </svg>   
        </span>            
      </a>
      <div className="container">
        <div className="wrapper">
          <div className="ft-logo">
            <a href="/" title="Gyatech - Get Your Admission">
              <img src="/images/logo-footer.svg" alt="Gyatech - Get Your Admission" />
            </a>   
          </div>
          <div className="quick-links">
            <ul>
              <li>
                <a href="/" title="Home">Home</a>
              </li>
              <li>
                <a href="/courses" title="Courses">Courses</a>
              </li>
              <li>
                <a href="/colleges" title="Colleges">Colleges</a>
              </li>
              <li>
                <a href="/contact-us" title="Contact Us">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="ft-bottom">
            <div className="ft-socialicons">
              <ul>
                <li>
                  <a href="javascript:;" title="Facebook">
                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.90157 19.748C2.90157 19.8871 3.01446 20 3.15353 20H6.74454C6.88361 20 6.99611 19.8871 6.99611 19.748V9.92109H9.59962C9.73009 9.92109 9.83907 9.8207 9.8504 9.69063L10.1008 6.72969C10.1129 6.58281 9.99728 6.45664 9.84962 6.45664H6.99611V4.35625C6.99611 3.86367 7.39532 3.46445 7.88751 3.46445H9.89376C10.0332 3.46445 10.1457 3.35156 10.1457 3.2125V0.251953C10.1457 0.112891 10.0332 0 9.89376 0H6.50392C4.51447 0 2.90157 1.6125 2.90157 3.60195V6.45664H1.10626C0.9672 6.45664 0.854309 6.56953 0.854309 6.70859V9.66914C0.854309 9.80859 0.9672 9.92109 1.10626 9.92109H2.90157V19.748Z" fill="white"/>
                    </svg>                                        
                  </a>
                </li>
                <li>
                  <a href="javascript:;" title="Linkedin">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.84198 6.3042H5.23928V20H0.84198V6.3042Z" fill="white"/>
                      <path d="M3.04018 0C1.65956 0 0.536316 1.12324 0.536316 2.50387C0.536316 3.88453 1.65956 5.00777 3.04018 5.00777C4.42085 5.00777 5.54409 3.88453 5.54409 2.50387C5.54405 1.12324 4.42081 0 3.04018 0Z" fill="white"/>
                      <path d="M19.7537 10.4391C19.6956 7.8866 17.6061 5.88715 14.9968 5.88715C13.5522 5.88715 12.2107 6.52734 11.3109 7.62332V6.30414H7.13V20H11.5273V12.0833C11.5273 11.0286 12.3855 10.1704 13.4402 10.1704C14.495 10.1704 15.3531 11.0284 15.3531 12.0834L15.3578 20H19.755L19.7537 10.4391Z" fill="white"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" title="Instagram">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_356_1656)">
                        <path d="M10.1494 4.86523C7.31359 4.86523 5.01776 7.16357 5.01776 9.9969C5.01776 12.8327 7.31609 15.1286 10.1494 15.1286C12.9853 15.1286 15.2811 12.8302 15.2811 9.9969C15.2811 7.16107 12.9828 4.86523 10.1494 4.86523ZM10.1494 13.3277C8.30859 13.3277 6.81859 11.8369 6.81859 9.9969C6.81859 8.1569 8.30943 6.66607 10.1494 6.66607C11.9894 6.66607 13.4803 8.1569 13.4803 9.9969C13.4811 11.8369 11.9903 13.3277 10.1494 13.3277Z" fill="white"/>
                        <path d="M14.269 0.0633105C12.429 -0.0225228 7.87153 -0.0183562 6.02986 0.0633105C4.41153 0.139144 2.98403 0.529977 1.8332 1.68081C-0.0901362 3.60414 0.155697 6.19581 0.155697 9.99664C0.155697 13.8866 -0.0609694 16.4183 1.8332 18.3125C3.76403 20.2425 6.3932 19.99 10.149 19.99C14.0024 19.99 15.3324 19.9925 16.6949 19.465C18.5474 18.7458 19.9457 17.09 20.0824 14.1158C20.169 12.275 20.164 7.71831 20.0824 5.87664C19.9174 2.36581 18.0332 0.236644 14.269 0.0633105ZM17.1815 17.04C15.9207 18.3008 14.1715 18.1883 10.1249 18.1883C5.9582 18.1883 4.28736 18.25 3.0682 17.0275C1.66403 15.63 1.9182 13.3858 1.9182 9.98331C1.9182 5.37914 1.4457 2.06331 6.06653 1.82664C7.1282 1.78914 7.4407 1.77664 10.1132 1.77664L10.1507 1.80164C14.5915 1.80164 18.0757 1.33664 18.2849 5.95664C18.3324 7.01081 18.3432 7.32748 18.3432 9.99581C18.3424 14.1141 18.4207 15.795 17.1815 17.04Z" fill="white"/>
                        <path d="M15.4845 5.86171C16.1468 5.86171 16.6837 5.32483 16.6837 4.66255C16.6837 4.00026 16.1468 3.46338 15.4845 3.46338C14.8222 3.46338 14.2853 4.00026 14.2853 4.66255C14.2853 5.32483 14.8222 5.86171 15.4845 5.86171Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_356_1656">
                          <rect width="20" height="20" fill="white" transform="translate(0.145691)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" title="Snapchat">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.622714 14.591C2.26178 14.266 3.35826 13.2211 4.1856 11.8492C5.39146 9.84804 3.56842 10.4078 2.48717 9.46718C1.91334 8.96874 2.25279 8.24999 2.92935 8.0871C3.56881 7.93281 4.85045 8.85741 4.7442 7.93632C4.64303 7.05585 4.64576 6.17109 4.68717 5.28749C4.97428 -0.857428 14.8801 -0.836334 15.5559 4.90273C15.6735 5.90077 15.6266 6.90077 15.5477 7.90038C15.4629 8.97538 16.6395 7.75077 17.5641 8.15702C18.1524 8.41523 18.3059 9.02968 17.809 9.4621C17.0993 10.0797 15.2434 10.0738 15.7872 11.2226C16.5712 12.8801 17.7235 14.1391 19.5876 14.5762C20.668 14.8285 19.9641 15.6609 19.284 15.9184C18.3915 16.2574 17.3989 16.0883 17.2551 17.0687C17.1766 17.6039 17.0157 17.6797 16.47 17.6359C15.1563 17.5301 14.3227 17.2473 13.1348 18.2066C11.593 19.4492 9.75904 19.7809 7.99459 18.7516C5.83053 17.4894 6.30318 17.3691 3.73053 17.6523C3.40631 17.6883 3.09342 17.5957 3.07506 17.2605C3.00982 16.0648 1.86451 16.2828 0.928964 15.8922C0.209043 15.591 -0.249942 14.7641 0.622714 14.591Z" fill="white"/>
                    </svg>                                                                               
                  </a>
                </li>
              </ul>
            </div>
            <div className="copyright">
              &copy; Copyright 2024 All rights reserved by Get Your Admission
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}