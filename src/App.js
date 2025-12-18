import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, Code, ChevronRight, Download, BookOpen, Brain, Database, Smartphone, CheckCircle, Users, Clock, Target, PlayCircle, Settings, TestTube, Cpu, Boxes, Volume2,Phone } from 'lucide-react';

/**
 * YAP ZHAN HONG - PROFESSIONAL PORTFOLIO
 * Metallic Silver Theme - Single Page Scroll
 * Animated Sections with Rotating Gear Navigation
 */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // 30% volume
  const audioRef = useRef(null);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    casestudy: useRef(null),
    qualities: useRef(null),
    contact: useRef(null)
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'casestudy', label: 'Case Study' },
    { id: 'qualities', label: 'Qualities' },
    { id: 'contact', label: 'Contact' }
  ];

  // Music control functions
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Set initial volume when audio loads
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  // Scroll Spy Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const scrollPosition = window.scrollY + 100;
      
      for (const item of navItems) {
        const section = sectionRefs[item.id]?.current;
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations (both appear and disappear)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is entering viewport
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          } else {
            // Element is leaving viewport - remove it for disappear animation
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' } // Slightly higher threshold for better effect
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-zinc-700 to-slate-800">
      {/* Add metallic text effect styles */}
      <style>{`
        .metallic-text {
          background: linear-gradient(180deg, 
            #ffffff 0%, 
            #e4e4e7 20%, 
            #a1a1aa 50%, 
            #71717a 80%,
            #52525b 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .metallic-text-sm {
          background: linear-gradient(180deg, 
            #f4f4f5 0%, 
            #d4d4d8 30%, 
            #a1a1aa 60%, 
            #71717a 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .silver-shine {
          background: linear-gradient(180deg, 
            #ffffff 0%, 
            #f4f4f5 10%,
            #d4d4d8 30%, 
            #a1a1aa 50%, 
            #d4d4d8 70%,
            #f4f4f5 90%,
            #ffffff 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine-flow 3s ease-in-out infinite;
        }
        
        @keyframes shine-flow {
          0%, 100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
        }
      `}</style>
      
      {/* Navigation Header with Rotating Gear */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-slate-800/95 via-zinc-700/95 to-slate-800/95 backdrop-blur-md shadow-lg shadow-zinc-950/50 border-b border-zinc-600' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with Rotating Gear */}
            <div 
              onClick={() => scrollToSection('home')}
              className="cursor-pointer group flex items-center gap-3"
            >
              <div className="relative w-12 h-12">
                {/* Rotating Gear Background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-500 rounded-lg opacity-20 animate-spin-slow"
                ></div>
                <Settings 
                  className="absolute inset-0 m-auto text-zinc-300 animate-spin-slow"
                  size={28}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-400 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-zinc-900 font-bold text-lg relative z-10">YZ</span>
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-black leading-none tracking-wide" style={{
                  background: 'linear-gradient(to bottom, #fafafa 0%, #d4d4d8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>YAP ZHAN HONG</h1>
                <p className="text-xs text-zinc-200 font-semibold uppercase tracking-wider">Portfolio</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-5 py-2 font-medium transition-all duration-300 text-sm uppercase tracking-wide relative ${
                    activeSection === item.id
                      ? 'text-zinc-100'
                      : 'text-zinc-300 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-zinc-800 transition-colors text-zinc-200 rounded"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-zinc-800/95 backdrop-blur-md border-t border-zinc-800">
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 font-medium transition-all uppercase tracking-wide text-sm ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Single Page Content */}
      <main className="pt-20">
        <HomeSection ref={sectionRefs.home} isVisible={visibleSections.has('home')} scrollToSection={scrollToSection} />
        <AboutSection ref={sectionRefs.about} isVisible={visibleSections.has('about')} />
        <EducationSection ref={sectionRefs.education} isVisible={visibleSections.has('education')} />
        <SkillsSection ref={sectionRefs.skills} isVisible={visibleSections.has('skills')} />
        <ProjectsSection ref={sectionRefs.projects} isVisible={visibleSections.has('projects')} />
        <CaseStudySection ref={sectionRefs.casestudy} isVisible={visibleSections.has('casestudy')} />
        <QualitiesSection ref={sectionRefs.qualities} isVisible={visibleSections.has('qualities')} />
        <ContactSection ref={sectionRefs.contact} isVisible={visibleSections.has('contact')} />
      </main>

      {/* Background Music Player */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {/* Volume Control (shows when playing) */}
        {isPlaying && (
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-600 rounded-lg p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out">
            <div className="flex items-center gap-3">
              <span className="text-zinc-300 text-xs font-semibold uppercase">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-400"
              />
              <span className="text-zinc-300 text-xs font-bold w-8">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        )}
        
        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          className="group relative w-16 h-16 bg-gradient-to-br from-zinc-400 to-zinc-500 rounded-full shadow-2xl hover:from-zinc-300 hover:to-zinc-400 transition-all duration-300 flex items-center justify-center border-4 border-zinc-700 hover:scale-110"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            // Pause Icon
            <svg className="w-6 h-6 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            // Play Icon
            <svg className="w-6 h-6 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
          
          {/* Animated rings when playing */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-zinc-400 animate-ping opacity-20"></span>
              <span className="absolute inset-0 rounded-full bg-zinc-400 animate-pulse opacity-30"></span>
            </>
          )}
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
      >
        {/* Replace this with your music file path */}
        <source src="music/background_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-zinc-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 -sm tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
                YAP ZHAN HONG
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Building innovative solutions through backend development and AI systems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-zinc-400 uppercase text-xs tracking-wider">Navigation</h4>
              <div className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-zinc-300 hover:text-zinc-200 transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-zinc-400 uppercase text-xs tracking-wider">Connect</h4>
              <div className="flex gap-3">
                <a href="https://github.com/Luoye0323" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-zinc-700 border border-zinc-600 flex items-center justify-center hover:bg-gradient-to-br hover:from-zinc-400 hover:to-zinc-600 hover:text-zinc-900 transition-all">
                  <Github size={18} />
                </a>
                <a href="mailto:b032310386@student.utem.edu.my" className="w-9 h-9 bg-zinc-700 border border-zinc-600 flex items-center justify-center hover:bg-gradient-to-br hover:from-zinc-400 hover:to-zinc-600 hover:text-zinc-900 transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-700 pt-6 text-center text-zinc-200 text-xs font-semibold">
            <p>© 2025 Yap Zhan Hong. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SECTION 1: HOME
const HomeSection = React.forwardRef(({ isVisible, scrollToSection }, ref) => {
  return (
    <section 
      id="home" 
      ref={ref} 
      className={`min-h-screen flex items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-wider shadow-lg">
                Available for Opportunities
              </span>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-wide mb-6" style={{ 
                background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 50%, #a1a1aa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textTransform: 'uppercase',
                fontWeight: '900'
              }}>
                YAP ZHAN HONG
              </h1>
              <div className="space-y-2">
                <p className="text-xl text-zinc-200 font-semibold tracking-wide">Software Development Student</p>
                <p className="text-xl text-zinc-200 font-semibold tracking-wide">Backend Developer</p>
                <p className="text-xl text-zinc-200 font-semibold tracking-wide">AI & System Design</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 font-bold hover:from-zinc-300 hover:to-zinc-200 transition-all uppercase text-sm tracking-wide flex items-center gap-2 shadow-lg"
              >
                View Projects
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-transparent border-2 border-zinc-400 text-zinc-300 font-bold hover:bg-zinc-400 hover:text-zinc-900 transition-all uppercase text-sm tracking-wide"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Profile Visual with Silver Metallic Effect */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="aspect-square bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 border-2 border-zinc-600 flex items-center justify-center relative overflow-hidden shadow-2xl">
              {/* Metallic shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-400/20 to-transparent"></div>
              <div className="text-center p-8 relative z-10">
                <div className="w-[30rem] h-[30rem] mx-auto mb-6 overflow-hidden shadow-2xl rounded-full border-4 border-zinc-400">
                 <img 
                  src="/profile.jpg" 
                  alt="Yap Zhan Hong" 
                  className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-zinc-300 text-sm uppercase tracking-wider">Backend Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`grid md:grid-cols-4 gap-px bg-zinc-700 mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: 'UTeM', label: 'University' },
            { value: '4+', label: 'Projects' },
            { value: '8+', label: 'Technologies' },
            { value: '2024', label: 'Graduate' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 hover:from-zinc-800 hover:to-zinc-700 transition-all"
            >
              <div className="text-3xl font-black -sm mb-2" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>{stat.value}</div>
              <div className="text-zinc-300 font-light uppercase text-xs tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// SECTION 2: ABOUT
const AboutSection = React.forwardRef(({ isVisible }, ref) => {
  return (
    <section 
      id="about" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>About</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Personal Info Card */}
          <div className={`md:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 border border-zinc-700 p-8 shadow-xl sticky top-24">
              <div className="w-32 h-32 bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-500 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Code size={64} className="text-zinc-900" />
              </div>
              <h3 className="text-xl font-semibold -sm text-center mb-1 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Yap Zhan Hong</h3>
              <p className="text-zinc-300 text-center text-sm mb-6 uppercase tracking-wide">Software Developer</p>
              
              <div className="space-y-4 mb-6">
                {[
                  { icon: MapPin, label: 'Location', value: 'Melaka, Malaysia' },
                  { icon: GraduationCap, label: 'University', value: 'UTeM' },
                  { icon: Phone, label: 'Phone', value: '+60166620589' },
                  { icon: Mail, label: 'Email', value: 'B032310386@student.utem.edu.my' },
                  { icon: Github, label: 'GitHub', value: 'github.com/Luoye0323' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="text-zinc-300 mt-1 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-zinc-400 uppercase font-medium tracking-wider">{item.label}</p>
                      <p className="text-zinc-100 text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Button */}
              <a
                href="/YapZhanHong_Resume.pdf"  // Make sure your PDF is placed inside the 'public' folder
                download
                className="w-full px-6 py-3 bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 font-bold hover:from-zinc-300 hover:to-zinc-200 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wide shadow-lg"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          </div>

          {/* About Content */}
          <div className={`md:col-span-2 space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 border border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold -sm mb-4 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Introduction</h3>
              <div className="space-y-4 text-zinc-200 leading-relaxed font-medium">
                <p>
                  Software Development student at Universiti Teknikal Malaysia Melaka (UTeM) specializing in <span className="text-zinc-200">backend development</span>, <span className="text-zinc-200">AI systems</span>, and <span className="text-zinc-200">software quality assurance</span>.
                </p>
                <p>
                  Focus on building scalable backend architectures, implementing artificial intelligence solutions, and ensuring software reliability through comprehensive testing methodologies.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 border border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold -sm mb-6 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Core Competencies</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { area: 'Backend Development', desc: 'Spring Boot, REST APIs, Microservices', icon: Database },
                  { area: 'Artificial Intelligence', desc: 'Machine Learning, Expert Systems, CNN', icon: Brain },
                  { area: 'Software Testing', desc: 'V&V Methodologies, Quality Assurance', icon: TestTube },
                  { area: 'Database Design', desc: 'MySQL, Firebase, Data Modeling', icon: Database },
                  { area: 'System Architecture', desc: 'Distributed Systems, Scalability', icon: Boxes },
                  { area: 'Documentation', desc: 'IEEE SRS, Technical Writing', icon: BookOpen }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-600 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon size={24} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
                      <div>
                        <h4 className="font-bold text-zinc-100 mb-1 text-sm tracking-tight">{item.area}</h4>
                        <p className="text-xs text-zinc-300">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// SECTION 3: EDUCATION
const EducationSection = React.forwardRef(({ isVisible }, ref) => {
  return (
    <section 
      id="education" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Education</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">Academic background and qualifications</p>
        </div>

        <div className="space-y-8">
          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 overflow-hidden shadow-xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-500 p-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="text-zinc-900" size={28} />
                    <span className="px-3 py-1 bg-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider">
                      Current
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2 tracking-tight">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-zinc-900/70 text-sm mb-1 uppercase tracking-wide">Software Development</p>
                  <p className="text-zinc-900/60 font-medium">
                    Universiti Teknikal Malaysia Melaka (UTeM)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-900 font-semibold text-sm">2023 - Present</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-zinc-200 mb-4 uppercase tracking-wider">Relevant Courses</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Software Requirements & Design',
                    'Software Validation & Verification',
                    'Artificial Intelligence',
                    'Data Communication & Networking',
                    'Distributed Systems',
                    'Database Systems',
                    'Software Engineering',
                    'System Analysis & Design'
                  ].map((course, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm border border-zinc-700 hover:border-zinc-600 transition-colors"
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-200 mb-4 uppercase tracking-wider">Key Achievements</h4>
                <ul className="space-y-2">
                  {[
                    'Completed projects in V&V, AI, and System Development',
                    'Strong foundation in backend development and system design',
                    'Active participation in software engineering practices'
                  ].map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-100 text-sm font-medium">
                      <span className="text-zinc-300 mt-1">—</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-zinc-300" size={24} />
              <div>
                <h3 className="text-lg font-bold text-zinc-100 tracking-tight">STPM</h3>
                <p className="text-zinc-100 text-sm font-medium">Pre-University Education</p>
              </div>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Completed STPM with focus on Business, Economics, and Accounting. Developed analytical and problem-solving skills applicable to software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

// SECTION 4: SKILLS
const SkillsSection = React.forwardRef(({ isVisible }, ref) => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Java', level: 70 },
        { name: 'Python', level: 75 },
        { name: 'JavaScript', level: 50 },
        { name: 'SQL', level: 80 }
      ]
    },
    {
      category: 'Frameworks & Tools',
      skills: [
        { name: 'Spring Boot', level: 70 },
        { name: 'Firebase', level: 75 },
        { name: 'Flask', level: 75 },
        { name: 'Git & GitHub', level: 80 }
      ]
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'Firebase Realtime DB', level: 80 },
        { name: 'Database Design', level: 85 }
      ]
    },
    {
      category: 'Design & Testing',
      skills: [
        { name: 'Figma', level: 75 },
        { name: 'JMeter', level: 70 },
        { name: 'Test Case Design', level: 85 },
        { name: 'Software V&V', level: 70 }
      ]
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'CNN Models', level: 60 },
        { name: 'Expert Systems', level: 70 },
        { name: 'TensorFlow/Keras', level: 65 }
      ]
    },
    {
      category: 'System Design',
      skills: [
        { name: 'Distributed Systems', level: 75 },
        { name: 'API Design', level: 65 },
        { name: 'System Architecture', level: 75 },
        { name: 'IEEE SRS', level: 75 }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Technical Skills</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">Technologies and competencies</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <h3 className="text-lg font-bold text-zinc-100 mb-6 uppercase tracking-wider">{category.category}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-zinc-100 text-sm">{skill.name}</span>
                      <span className="text-zinc-200 font-black text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-500 transition-all duration-1000"
                        style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-black -sm mb-8 text-center tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Proficiency Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { skill: 'Backend Development', stars: 4 },
              { skill: 'Database Design', stars: 4 },
              { skill: 'AI & Machine Learning', stars: 3 },
              { skill: 'Software Testing', stars: 4 },
              { skill: 'System Architecture', stars: 4 },
              { skill: 'Documentation', stars: 3 }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-zinc-800 border border-zinc-700"
              >
                <h4 className="font-bold text-zinc-100 mb-3 text-sm tracking-tight">{item.skill}</h4>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(item.stars) ? 'bg-zinc-300' : i < item.stars ? 'bg-zinc-500' : 'bg-zinc-700'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});


// SECTION 5: PROJECTS with Icons
const ProjectsSection = React.forwardRef(({ isVisible }, ref) => {
  const projects = [
    {
      title: 'MyTherapy Mobile App (V&V)',
      category: 'Software Testing',
      role: 'Tester & Analyst',
      description: 'Comprehensive validation and verification project for healthcare mobile application. Conducted thorough testing using various methodologies to ensure software quality and reliability.',
      technologies: ['JMeter', 'Test Cases', 'Bug Reports', 'V&V Methodologies'],
      year: '2024',
      icon: TestTube,
      highlights: [
        'Performance testing with JMeter',
        'Comprehensive test case documentation',
        'Critical bug identification',
        'Healthcare quality assurance'
      ]
    },
    {
      title: 'Mushroom Expert System',
      category: 'Artificial Intelligence',
      role: 'AI Developer',
      description: 'Intelligent system combining rule-based expert system with CNN for mushroom species identification and toxicity assessment.',
      technologies: ['Python', 'TensorFlow', 'CNN', 'Expert Systems', 'Flask'],
      year: '2024',
      icon: Brain,
      highlights: [
        'Rule-based inference engine',
        'CNN image classification',
        'Species identification',
        'Toxicity safety advice'
      ]
    },
    {
      title: 'HRMS for Tuition Centre',
      category: 'Full Stack Development',
      role: 'Backend Developer',
      description: 'Web-based Human Resource Management System featuring attendance tracking, payroll management, and comprehensive admin dashboard.',
      technologies: ['Spring Boot', 'MySQL', 'Java', 'REST API', 'IEEE SRS'],
      year: '2024',
      icon: Database,
      highlights: [
        'Attendance tracking system',
        'Automated payroll calculation',
        'Admin dashboard interface',
        'IEEE SRS documentation'
      ]
    },
    {
      title: 'PineAForm',
      category: 'Mobile App Development',
      role: 'System Architect & Developer',
      description: 'Community-driven mobile platform digitizing farm management and utilizing intelligent algorithms to prevent market oversupply.',
      technologies: ['Android Studio', 'Kotlin', 'Firebase Firestore', 'Firebase Auth', 'Repository Pattern'],
      year: '2025',
      icon: Smartphone,
      highlights: [
        'Real-time yield conflict detection',
        'Group chat synchronization',
        'Interactive production planner',
        'Dynamic announcement feed'
      ]
    }
  ];

  return (
    <section 
      id="projects" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Projects</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">Selected work demonstrating technical expertise</p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 overflow-hidden hover:border-zinc-600 transition-all duration-1000 shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="md:flex">
                {/* Project Icon */}
                <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-r border-zinc-700">
                  <div className="w-32 h-32 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full flex items-center justify-center border-4 border-zinc-600 shadow-2xl">
                    <project.icon size={64} className="text-zinc-400" />
                  </div>
                </div>

                {/* Project Content */}
                <div className="md:w-2/3 p-8">
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-wider shadow">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-zinc-800 text-zinc-200 text-xs font-medium font-bold uppercase tracking-wider border border-zinc-700">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black -sm mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-300 font-semibold mb-3 text-sm">Role: {project.role}</p>
                  
                  <p className="text-zinc-200 mb-6 leading-relaxed text-sm font-medium">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-zinc-200 mb-3 uppercase tracking-wider">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-200">
                          <CheckCircle size={14} className="text-zinc-300 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 mb-3 uppercase tracking-wider">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// SECTION 6: CASE STUDY
const CaseStudySection = React.forwardRef(({ isVisible }, ref) => {
  return (
    <section 
      id="casestudy" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Case Study</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">In-depth analysis: PineAForm Mobile Application</p>
        </div>

        {/* Project Header */}
        <div className={`bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-500 p-8 mb-8 shadow-xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center shadow-lg">
              <Smartphone size={32} className="text-zinc-300" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-zinc-900 tracking-tight">PineAForm</h3>
              <p className="text-zinc-900/60 text-sm">Intelligent Pineapple Production & Market Linkage System</p>
            </div>
          </div>
        </div>

        {/* Video Demo */}
        <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 mb-8 shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-semibold -sm mb-6 uppercase tracking-wider flex items-center gap-3" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
            <PlayCircle size={24} />
            Project Demonstration
          </h3>
          <div className="relative w-full aspect-video bg-black border-2 border-zinc-700">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/G3NIBQQChxs?si=hFZZKf03oK5tj7is" title="Project Demo" allowFullScreen></iframe>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-xl font-semibold -sm mb-4 uppercase tracking-wider flex items-center gap-3" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
              <Target size={24} />
              Problem Statement
            </h3>
            <p className="text-zinc-200 leading-relaxed font-medium text-sm">
              Small-scale pineapple entrepreneurs face market oversupply due to lack of coordination. Simultaneous harvesting causes price crashes and poor farm management.
            </p>
          </div>

          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-xl font-semibold -sm mb-4 uppercase tracking-wider flex items-center gap-3" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
              <Brain size={24} />
              Solution
            </h3>
            <p className="text-zinc-200 leading-relaxed font-medium text-sm">
              Native Android ecosystem with Intelligent Production Coordinator aggregating regional harvest data to detect conflicts and facilitate farmer coordination.
            </p>
          </div>
        </div>

        {/* System Workflow */}
        <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 mb-8 shadow-lg transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-semibold -sm mb-6 uppercase tracking-wider flex items-center gap-3" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
            <Code size={24} />
            System Workflow
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { step: '01', title: 'Digital Profiling', desc: 'Comprehensive business and farm data management.' },
              { step: '02', title: 'Schedule Input', desc: 'Planting and harvest timeline with yield estimation.' },
              { step: '03', title: 'Conflict Analysis', desc: 'Regional data aggregation detecting market exceedance.' },
              { step: '04', title: 'Coordination', desc: 'Alert system with integrated communication platform.' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-zinc-800 border border-zinc-700">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 flex items-center justify-center text-zinc-900 font-bold text-xs shadow">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-zinc-100 mb-1 text-sm">{item.title}</h4>
                  <p className="text-zinc-200 text-xs font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Impact */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-lg font-bold text-zinc-100 mb-4 uppercase tracking-wider">Technology Stack</h3>
            <div className="space-y-2">
              {['Android Studio (Native)', 'Kotlin', 'Firebase Firestore', 'Firebase Auth', 'Repository Pattern'].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-100 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-zinc-500"></div>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-lg font-bold text-zinc-100 mb-4 uppercase tracking-wider">SDG Impact</h3>
            <div className="space-y-2">
              {['No Poverty (SDG 1)', 'Zero Hunger (SDG 2)', 'Decent Work & Growth (SDG 8)', 'Responsible Consumption (SDG 12)'].map((impact, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-100 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-zinc-500"></div>
                  <span>{impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// SECTION 7: QUALITIES
const QualitiesSection = React.forwardRef(({ isVisible }, ref) => {
  const qualities = [
    { quality: 'Responsible', description: 'Accountable and reliable in project delivery' },
    { quality: 'Analytical Thinker', description: 'Strong problem-solving capabilities' },
    { quality: 'Fast Learner', description: 'Quick adaptation to new technologies' },
    { quality: 'Team Player', description: 'Collaborative in team environments' }
  ];

  const softSkills = [
    { skill: 'Communication', description: 'Clear technical and stakeholder communication' },
    { skill: 'Problem Solving', description: 'Systematic approach to complex challenges' },
    { skill: 'Documentation', description: 'Professional technical writing' },
    { skill: 'Time Management', description: 'Efficient project planning and execution' }
  ];

  return (
    <section 
      id="qualities" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Qualities</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">Professional attributes and competencies</p>
        </div>

        {/* Personal Qualities */}
        <div className="mb-16">
          <h3 className="text-2xl font-black -sm mb-8 uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Personal Attributes</h3>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-700">
            {qualities.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-zinc-800 to-zinc-700 p-8 hover:from-zinc-800 hover:to-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <h4 className="text-lg font-bold text-zinc-100 mb-2 tracking-tight">{item.quality}</h4>
                <p className="text-zinc-100 text-sm font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-black -sm mb-8 uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Professional Skills</h3>
          <div className="grid md:grid-cols-2 gap-px bg-zinc-700">
            {softSkills.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-zinc-800 to-zinc-700 p-8 hover:from-zinc-800 hover:to-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <h4 className="text-lg font-bold text-zinc-100 mb-2 tracking-tight">{item.skill}</h4>
                <p className="text-zinc-100 text-sm font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Development */}
        <div className={`bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-2xl font-black -sm mb-8 text-center uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Professional Development</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Continuous Learning', desc: 'Stay current with emerging technologies' },
              { title: 'Project Experience', desc: 'Practical application of technical skills' },
              { title: 'Technical Excellence', desc: 'Commitment to quality and best practices' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h4 className="font-bold text-zinc-100 mb-2 tracking-tight">{item.title}</h4>
                <p className="text-zinc-100 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

// SECTION 8: CONTACT
const ContactSection = React.forwardRef(({ isVisible }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message. This is a demonstration form.');
  };

  return (
    <section 
      id="contact" 
      ref={ref} 
      className={`min-h-screen py-20 border-t border-zinc-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black mb-2 tracking-tight" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Contact</h2>
          <div className="w-16 h-px bg-gradient-to-r from-zinc-400 to-transparent mb-4"></div>
          <p className="text-zinc-300">Available for internship and collaboration opportunities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h3 className="text-xl font-semibold -sm mb-6 uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Information</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'B032310386@student.utem.edu.my' },
                  { icon: Phone, label: 'Phone', value: '+60166620589' },
                  { icon: MapPin, label: 'Location', value: 'Melaka, Malaysia' },
                  { icon: GraduationCap, label: 'University', value: 'Universiti Teknikal Malaysia Melaka' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 flex items-center justify-center flex-shrink-0 shadow">
                      <item.icon className="text-zinc-900" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-100 mb-1 text-sm">{item.label}</h4>
                      <p className="text-zinc-100 text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold -sm mb-6 uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Connect</h3>
              <a
                href="https://github.com/Luoye0323"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 hover:bg-gradient-to-br hover:from-zinc-400 hover:to-zinc-600 hover:text-zinc-900 group transition-all"
              >
                <Github className="group-hover:text-zinc-900" size={20} />
                <div>
                  <p className="font-semibold text-sm">GitHub</p>
                  <p className="text-xs text-zinc-300 group-hover:text-zinc-900/70">github.com/Luoye0323</p>
                </div>
              </a>
            </div>

            {/* Resume */}
            <div className="bg-gradient-to-br from-zinc-400 via-zinc-300 to-zinc-500 p-8 shadow-xl">
              <h3 className="text-xl font-black mb-4 text-zinc-900 tracking-tight">Resume</h3>
              <p className="mb-6 text-zinc-900/60 text-sm">Download complete resume with detailed experience.</p>
              {/* Download Button */}
              <a
                href="/YapZhanHong_Resume.pdf"  // Make sure your PDF is placed inside the 'public' folder
                download
                className="w-full px-6 py-3 bg-zinc-800 text-zinc-100 font-bold hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wide shadow-lg rounded-md"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold -sm mb-4 uppercase tracking-wider flex items-center gap-2" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
                <Clock size={20} />
                Availability
              </h3>
              <p className="text-zinc-400 mb-4 text-sm">Currently seeking opportunities in:</p>
              <ul className="space-y-2">
                {['Backend Development', 'Software Engineering', 'AI & Machine Learning', 'System Design'].map((role, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-100 text-sm font-medium">
                    <div className="w-1.5 h-1.5 bg-zinc-500"></div>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm mt-4 font-semibold">Status: Available Immediately</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 p-8 shadow-lg">
              <h3 className="text-xl font-semibold -sm mb-6 uppercase tracking-wider" style={{ 
      background: 'linear-gradient(to bottom, #fafafa 0%, #e4e4e7 40%, #d4d4d8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-zinc-400 font-medium mb-2 text-sm uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 focus:border-zinc-400 focus:outline-none transition-colors text-zinc-200"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-2 text-sm uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 focus:border-zinc-400 focus:outline-none transition-colors text-zinc-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-2 text-sm uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 focus:border-zinc-400 focus:outline-none transition-colors text-zinc-200"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-2 text-sm uppercase tracking-wide">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 focus:border-zinc-400 focus:outline-none transition-colors resize-none text-zinc-200"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 font-bold hover:from-zinc-300 hover:to-zinc-200 transition-all uppercase text-sm tracking-wide shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* Add this CSS for music player animations - paste in your global CSS file or add as style tag */