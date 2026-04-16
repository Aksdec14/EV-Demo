import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import { Services, Mission } from "./components/Servicesmission"
import { EVGenerations, Testimonials } from "./components/Evgenerationstestimonials"
import { ServicesWeProvide } from './components/ServicesWeProvide'
import ContactSection from './components/Contact'
import Footer from './components/Footer'

const page = () => {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Mission />
      <EVGenerations />
      <ServicesWeProvide />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default page