import React from 'react'
import Carousal from './Carousal'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Homepage() {
    return (
        <div>
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Carousal />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
