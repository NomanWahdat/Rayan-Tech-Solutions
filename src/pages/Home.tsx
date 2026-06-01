import { SplineSceneBasic } from '../components/SplineSceneBasic'
import About from './About'
import Services from './Services'
import Portfolio from './Portfolio'
import Contact from './Contact'

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Spline */}
      <section id="home" className="relative pt-0">
        <div className="max-w-6xl mx-auto px-4">
          <SplineSceneBasic />
        </div>
        {/* Hero content moved into SplineSceneBasic */}
      </section>

      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      <section id="services" className="scroll-mt-24">
        <Services />
      </section>

      

      <section id="portfolio" className="scroll-mt-24">
        <Portfolio />
      </section>

      <section id="contact" className="scroll-mt-24">
        <Contact />
      </section>
    </div>
  )
}
