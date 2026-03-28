import { useState, useEffect, useRef, FormEvent } from 'react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' })

  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Reset errors
    const errors = { name: '', email: '', message: '' }
    let isValid = true

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
      isValid = false
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
      isValid = false
    }

    setFormErrors(errors)

    if (isValid) {
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const projects = [
    {
      title: 'TaskFlow',
      description: 'A comprehensive project management dashboard with real-time collaboration features and task tracking.',
      tech: ['React', 'TypeScript', 'Tailwind'],
      image: 'https://placehold.co/600x400/4f46e5/ffffff?text=TaskFlow'
    },
    {
      title: 'ShopEase',
      description: 'Full-featured e-commerce platform with payment integration and inventory management.',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      image: 'https://placehold.co/600x400/7c3aed/ffffff?text=ShopEase'
    },
    {
      title: 'WeatherNow',
      description: 'Mobile weather application with interactive maps and location-based forecasts.',
      tech: ['React Native', 'OpenWeather API'],
      image: 'https://placehold.co/600x400/4f46e5/ffffff?text=WeatherNow'
    },
    {
      title: 'CodeBlog',
      description: 'Modern developer blog platform with markdown support and syntax highlighting.',
      tech: ['Astro', 'MDX', 'Tailwind'],
      image: 'https://placehold.co/600x400/7c3aed/ffffff?text=CodeBlog'
    }
  ]

  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'AWS']

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-white hover:text-indigo-400 transition-colors duration-150"
            >
              Alex Chen
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-150">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-white transition-colors duration-150">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-150">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-150"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-150"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-150"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
        ref={(el) => { sectionsRef.current[0] = el }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm Alex Chen
          </h1>
          <p className="text-2xl sm:text-3xl text-indigo-300 mb-8">
            Full-Stack Developer & UI Designer
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I craft beautiful, user-centric digital experiences with clean code and thoughtful design.
            Passionate about building scalable applications that make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8"
        ref={(el) => { sectionsRef.current[1] = el }}
      >
        <div className="max-w-7xl mx-auto fade-in-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="flex justify-center">
              <img
                src="https://placehold.co/400x400/4f46e5/ffffff?text=Alex+Chen"
                alt="Alex Chen"
                className="rounded-lg shadow-2xl w-full max-w-sm"
              />
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                With over 8 years of experience in web development, I've had the privilege of working with
                startups and established companies to bring their visions to life. My journey began with a
                simple HTML page and has evolved into architecting complex, scalable systems.
              </p>
              <p className="text-lg">
                I believe great software is born at the intersection of technical excellence and user empathy.
                Whether I'm optimizing a React component or designing a database schema, I'm always thinking
                about the end user's experience.
              </p>
              <p className="text-lg">
                When I'm not coding, you'll find me exploring new design trends, contributing to open-source
                projects, or mentoring aspiring developers. I'm constantly learning and staying current with
                the latest technologies and best practices.
              </p>
              <p className="text-lg">
                Currently, I'm focusing on building modern web applications with React, TypeScript, and Node.js,
                while exploring the exciting possibilities of AI and machine learning integration.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-6 py-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded-full text-sm font-medium hover:bg-indigo-600/30 transition-colors duration-150"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30"
        ref={(el) => { sectionsRef.current[2] = el }}
      >
        <div className="max-w-7xl mx-auto fade-in-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="inline-block text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-150"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8"
        ref={(el) => { sectionsRef.current[3] = el }}
      >
        <div className="max-w-3xl mx-auto fade-in-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 text-green-300 rounded-lg">
              Thanks for reaching out! I'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  formErrors.name ? 'border-red-500' : 'border-slate-700'
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150`}
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-400">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  formErrors.email ? 'border-red-500' : 'border-slate-700'
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150`}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-400">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  formErrors.message ? 'border-red-500' : 'border-slate-700'
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150`}
              />
              {formErrors.message && (
                <p className="mt-2 text-sm text-red-400">{formErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Or connect with me on:</p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-150"
                aria-label="GitHub"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-150"
                aria-label="LinkedIn"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-150"
                aria-label="Twitter"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <p className="mt-6 text-gray-400">
              Email: <a href="mailto:alex@example.com" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150">alex@example.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Alex Chen. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection('hero')}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-150"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
