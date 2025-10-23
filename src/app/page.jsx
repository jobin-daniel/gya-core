'use client'

import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  useEffect(() => {
    // Initialize AOS after component mounts
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
      })
    }
  }, [])

  return (
    <>
      <Header />
      
      {/* Banner Section - matching template structure */}
      <section className="banner-section vh-banner-100">
        <div className="container">
          <div className="inner">
            <div className="content-wrapper" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="hd-typ1">Find the career you're looking for in your future.</h2>
              
              {/* Search Box - matching template structure */}
              <div className="serch-box">
                <div className="inner-wrap">
                  <div className="input-field">
                    <input 
                      type="text" 
                      name="search" 
                      id="search" 
                      placeholder="Search for courses, institutes..." 
                    />
                  </div>
                  <div className="input-button">
                    <button type="button" className="btn-search">
                      <span className="icon">
                        <img src="/images/search.svg" alt="Search" width="20" height="20" />
                      </span>
                      <span className="txt">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}