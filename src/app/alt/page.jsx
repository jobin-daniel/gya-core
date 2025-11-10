// app/alt/page.jsx
"use client";

import { useEffect } from 'react';

export default function AltHome() {

  useEffect(() => {
    // Add fade class to modal after hydration
    const modalEl = document.getElementById('loginModal');
    if (modalEl && !modalEl.classList.contains('fade')) {
      modalEl.classList.add('fade');
    }
  }, []);

  useEffect(() => {
    // GO TO TOP JS
    const btn = $('#gototop');
    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });
    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });

    // ACCOUNT DROPDOWN MENU JS
    const tap = document.querySelector('.title-account');
    const toggleMenu = document.querySelector('.account-submenu');
    const headerElem = document.querySelector('.header');

    let handleTapClick, handleDocClick;

    if (tap && toggleMenu && headerElem) {
      handleTapClick = function(event) {
        toggleMenu.classList.toggle('active');
        headerElem.classList.toggle('active-acount-menu');
        event.stopPropagation();
      };

      handleDocClick = function(event) {
        if (!tap.contains(event.target)) {
          toggleMenu.classList.remove('active');
          headerElem.classList.remove('active-acount-menu');
        }
      };

      tap.addEventListener('click', handleTapClick);
      document.addEventListener('click', handleDocClick);
    }

    // Modal overflow handling
    function checkModal() {
      if (document.querySelector('body').classList.contains('modal-open')) {
        document.documentElement.style.overflow='hidden';
      } else {
        document.documentElement.style.overflow='auto';
      } 
    }

    document.addEventListener('shown.bs.modal', checkModal);
    document.addEventListener('hidden.bs.modal', checkModal);

    // Handle login modal
    const loginModalEl = document.getElementById('loginModal');
    if (loginModalEl) {
      const loginFrm = loginModalEl.querySelector('.login-frm');
      const forgotPassword = loginModalEl.querySelector('.forgot-frm');
      const forgotAndCreate = loginModalEl.querySelector('.forgotandcreate');

      const handleForgotClick = function() {
        loginFrm.classList.add('hide-frm');
        forgotAndCreate.classList.add('hide-frm');
        forgotPassword.classList.remove('hide-frm');
      };

      const handleModalHidden = function() {
        loginFrm.classList.remove('hide-frm');
        forgotAndCreate.classList.remove('hide-frm');
        forgotPassword.classList.add('hide-frm');
      };

      loginModalEl.querySelector('.forgotandcreate .frgtpswd').addEventListener('click', handleForgotClick);
      loginModalEl.addEventListener('hidden.bs.modal', handleModalHidden);
    }

    // Initialize Slick Slider
    if (typeof window !== 'undefined' && window.$) {
      $('.courses-slider').slick({
        dots: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToScroll: 1,
              autoplay: true,
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              dots: false,
              speed: 1000,
              autoplay: true,
              autoplaySpeed: 5000,
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 991,
            settings: {
              dots: false,
              speed: 1000,
              autoplay: true,
              autoplaySpeed: 5000,
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 767,
            settings: {
              dots: false,
              speed: 1000,
              autoplay: true,
              autoplaySpeed: 5000,
              slidesToShow: 1,
            }
          }
        ]
      });

      $('button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.courses-slider').slick('setPosition');
      });

      $('.slick-slide').css({
        'pointer-events': 'auto',
        'z-index': 1000
      });

      $('.slick-slider').css({
        'z-index': 1
      });
    }

    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
      });
    }

    // Disable logo links
    document.querySelectorAll('a.logo').forEach(function(element) {
      element.style.pointerEvents = 'none';
      element.style.cursor = 'default';
    });

    const homelinkEl = document.querySelector('.footer .quick-links ul li:first-child a');
    if (homelinkEl) {
      homelinkEl.style.pointerEvents = 'none';
      homelinkEl.style.cursor = 'default';
    }

    // Cleanup function
    return () => {
      if (tap) tap.removeEventListener('click', handleTapClick);
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('shown.bs.modal', checkModal);
      document.removeEventListener('hidden.bs.modal', checkModal);
      
      if (typeof window !== 'undefined' && window.$ && $('.courses-slider').hasClass('slick-initialized')) {
        $('.courses-slider').slick('unslick');
      }
    };
  }, []);

  // Helper functions
  const addSave = (item) => {
    item.classList.toggle('save-item');
    if (item.classList.contains('save-item')) {
      item.querySelector('.saved').style.display = 'inline';
      item.querySelector('.unsaved').style.display = 'none';
    } else {
      item.querySelector('.saved').style.display = 'none';
      item.querySelector('.unsaved').style.display = 'inline';
    }
  };

  const toggleIcon = (element) => {
    element.classList.toggle('active');
  };

  return (
    <>
      <header className="header">
        <div className="headercontainer-wrapper">
          <div className="container">
            <div className="inner">
              <div className="lftbox" data-aos="fade-right" data-aos-duration="1000">
                <a href="index.html" title="Gyatech - Get Your Admission" className="logo">
                  <img src="../images/logo.svg" alt="Gyatech - Get Your Admission" />
                </a>
                <div className="coursescolleges-wrapper">
                  <a href="courses.html" className="item" title="Courses">
                    <span className="wrap">
                      <span className="icon">
                        <img src="../images/courses.svg" alt="Courses" width="30" height="30" />
                      </span>
                      <span className="title">Courses</span>
                    </span>
                  </a>
                  <a href="institutes.html" className="item" title="Institutes">
                    <span className="wrap">
                      <span className="icon">
                        <img src="../images/institutes.svg" alt="Institutes" width="30" height="30" />
                      </span>
                      <span className="title">Institutes</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="rgtbox" data-aos="fade-left" data-aos-duration="1000">
                <div className="wrap">
                  <a href="contact-us.html" title="Help" className="item">
                    <span className="icon">
                      <img src="../images/help.svg" alt="Help" width="22" height="22" />
                    </span>
                    <span className="txt">Help</span>
                  </a>
                  <span className="item account-dropdown">
                    <span className="title-account">
                      <span className="icon">
                        <img src="../images/account.svg" alt="Account" width="23" height="22" />
                      </span>
                      <span className="txt">Account</span>
                      <span className="arrow">
                        <img src="../images/arrow.svg" alt="Arrow" width="10" height="6" />
                      </span>
                    </span>
                    <span className="account-submenu">
                      <a href="javascript:;" title="Login" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                      <a href="student-signup.html" title="Student Sign Up">Student Sign Up</a>
                      <a href="institute-signup.html" title="Institute Sign Up">Institute Sign Up</a>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ADD YOUR PAGE CONTENT HERE */}

      <footer className="footer section">
        <a id="gototop" title="Go To Top" data-aos="fade-left" data-aos-duration="1000">
          <span className="inner">
            <img src="../images/gototop.svg" alt="Go To Top" width="10" height="6" />
          </span>
        </a>
        <div className="container">
          <div className="wrapper">
            <div className="ft-logo">
              <a href="index.html" className="logo" title="Gyatech - Get Your Admission">
                <img src="../images/logo-footer.svg" alt="Gyatech - Get Your Admission" />
              </a>
            </div>
            <div className="quick-links">
              <ul>
                <li>
                  <a href="index.html" title="Home">Home</a>
                </li>
                <li>
                  <a href="courses.html" title="Courses">Courses</a>
                </li>
                <li>
                  <a href="institutes.html" title="Institutes">Institutes</a>
                </li>
                <li>
                  <a href="contact-us.html" title="Contact Us">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="ft-bottom">
              <div className="ft-socialicons">
                <ul>
                  <li>
                    <a href="javascript:;" title="Facebook">
                      <img src="../images/facebook.svg" alt="Facebook" width="11" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" title="Linkedin">
                      <img src="../images/linkedin.svg" alt="Linkedin" width="20" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" title="Instagram">
                      <img src="../images/instagram.svg" alt="Instagram" width="21" height="20" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" title="Snapchat">
                      <img src="../images/snapchat.svg" alt="Snapchat" width="21" height="20" />
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

      <div className="modal" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" suppressHydrationWarning>
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close">
              <img src="../images/close.svg" alt="Close" width="15" height="15" />
            </button>
            <div className="modal-body">
              <div className="login-inner">
                <div className="row">
                  <div className="col-md-6 cols">
                    <div className="imgbox-wrapper">
                      <div className="inner-wrap">
                        <h3 className="hd-welcome">Welcome</h3>
                        <picture>
                          <source media="(min-width:1200px)" srcSet="/images/login-img-desk.png" />
                          <source media="(min-width:768px)" srcSet="/images/login-img-tablet.png" />
                          <img src="/images/login-img-desk.png" alt="Institute Name Will Come Here" loading="lazy" />
                        </picture>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 cols">
                    <div className="frm-wrapper">
                      <div className="inner-wrap">
                        <a href="index.html" title="Gyatech - Get Your Admission" className="logo">
                          <img src="../images/logo-login.svg" alt="Gyatech - Get Your Admission" />
                        </a>
                        <div className="login-frm">
                          <form action="login">
                            <ul>
                              <li>
                                <div className="input-field">
                                  <input type="text" name="User" id="username" placeholder="User Name" />
                                </div>
                              </li>
                              <li>
                                <div className="input-field">
                                  <input type="password" name="Password" id="password" placeholder="Password" />
                                  <span className="icon" onClick={(e) => {
                                    const inputEl = e.currentTarget.previousElementSibling;
                                    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
                                    e.currentTarget.classList.toggle('active');
                                  }}>
                                    <img src="../images/eye.svg" alt="Toggle Password" width="15" height="15" />
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div className="btnbar">
                                  <input type="submit" name="Login" value="Login" className="login-btn" />
                                </div>
                              </li>
                            </ul>
                          </form>
                        </div>
                        <div className="forgot-frm hide-frm">
                          <form action="login">
                            <ul>
                              <li>
                                <div className="input-field">
                                  <input type="email" name="email" id="email" placeholder="Enter Your Email" />
                                </div>
                              </li>
                              <li>
                                <div className="btnbar">
                                  <input type="submit" name="Verify" value="Verify" className="login-btn" />
                                </div>
                              </li>
                            </ul>
                          </form>
                        </div>
                        <div className="forgotandcreate">
                          <ul>
                            <li>
                              <a href="javascript:;" title="Forgot password?" className="lnk frgtpswd">Forgot password?</a>
                            </li>
                            <li>
                              <div className="createaccount">
                                Create your account <a href="student-signup.html" className="link" title="Create your Student account">Student</a> / <a href="institute-signup.html" className="link" title="Create your Institution account">Institution</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}