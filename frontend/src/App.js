import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";
import { 
  Code, 
  Globe, 
  ShoppingCart, 
  Server, 
  Briefcase,
  Gamepad2,
  Bot,
  Rocket,
  CheckCircle,
  Award,
  MessageCircle,
  Shield,
  Zap,
  Users,
  ChevronRight,
  Menu,
  X,
  Send,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Quote,
  ArrowRight
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Typing Animation Component
const TypingCode = () => {
  const lines = [
    { indent: 0, content: [
      { text: "const ", type: "keyword" },
      { text: "softogram", type: "variable" },
      { text: " = {", type: "bracket" }
    ]},
    { indent: 1, content: [
      { text: "mission", type: "function" },
      { text: ": ", type: "bracket" },
      { text: '"Build dreams"', type: "string" },
      { text: ",", type: "bracket" }
    ]},
    { indent: 1, content: [
      { text: "approach", type: "function" },
      { text: ": ", type: "bracket" },
      { text: '"Your idea"', type: "string" },
      { text: ",", type: "bracket" }
    ]},
    { indent: 1, content: [
      { text: "delivery", type: "function" },
      { text: ": ", type: "bracket" },
      { text: '"Our code"', type: "string" },
      { text: ",", type: "bracket" }
    ]},
    { indent: 1, content: [
      { text: "result", type: "function" },
      { text: ": ", type: "bracket" },
      { text: '"Delivered"', type: "string" }
    ]},
    { indent: 0, content: [
      { text: "};", type: "bracket" }
    ]},
    { indent: 0, content: [] },
    { indent: 0, content: [
      { text: "// ", type: "comment" },
      { text: "Let's build together", type: "comment" }
    ]}
  ];

  return (
    <div className="code-window animate-float">
      <div className="code-window-header">
        <div className="code-dot code-dot-red"></div>
        <div className="code-dot code-dot-yellow"></div>
        <div className="code-dot code-dot-green"></div>
        <span className="text-xs text-gray-500 ml-4">softogram.js</span>
      </div>
      <div className="code-content">
        {lines.map((line, lineIndex) => (
          <motion.div 
            key={lineIndex} 
            className="code-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lineIndex * 0.3 }}
          >
            <span style={{ marginLeft: `${line.indent * 20}px` }}>
              {line.content.map((part, partIndex) => (
                <span key={partIndex} className={`code-${part.type}`}>
                  {part.text}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
        <span className="typing-cursor"></span>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "navbar-glass shadow-2xl" : "bg-transparent border border-transparent"
      }`}
      data-testid="navbar"
    >
      <a href="#" className="flex items-center gap-2" data-testid="logo-link">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
          <Code className="w-4 h-4 md:w-5 md:h-5 text-black" />
        </div>
        <span className="font-bold text-lg md:text-xl text-white font-['Space_Grotesk']">Softogram</span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
            data-testid={`nav-link-${link.label.toLowerCase()}`}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact">
          <button className="btn-glow text-sm" data-testid="nav-cta-button">
            Start Project
          </button>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        data-testid="mobile-menu-toggle"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 navbar-glass rounded-2xl p-6 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-base font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-glow w-full py-3 text-sm mt-2">
                  Start Project
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4 dot-pattern" data-testid="hero-section">
      {/* Background Orbs */}
      <div className="gradient-orb orb-cyan absolute -top-48 -right-48" />
      <div className="gradient-orb orb-violet absolute -bottom-32 -left-32" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto pt-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-400">Premium Software Development Studio</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
          We Build Software That{" "}
          <span className="gradient-text">
            Grows Your Business
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Custom websites, web apps, enterprise software, games, and intelligent automation — 
          end-to-end digital solutions for ambitious businesses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#contact">
            <button className="btn-glow flex items-center gap-2 text-base" data-testid="hero-cta-quote">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </a>
          <a href="#portfolio">
            <button className="btn-outline text-base" data-testid="hero-cta-work">
              Explore Our Work
            </button>
          </a>
        </div>
      </motion.div>

      {/* Code Window */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2"
      >
        <TypingCode />
      </motion.div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: 15, suffix: "+", label: "Projects Delivered", icon: CheckCircle },
    { value: 10, suffix: "+", label: "Happy Clients", icon: Users },
    { value: 3, suffix: "+", label: "Years Experience", icon: Award },
    { value: 100, suffix: "%", label: "On-Time Delivery", icon: Zap }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 border-y border-[#2A2A2A] bg-[#0D0D0D]" data-testid="stats-section">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
              data-testid={`stat-item-${index}`}
            >
              <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
              <div className="stat-number text-3xl md:text-4xl mb-1">
                {isInView && (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web Applications",
      description: "We architect and develop full-stack web applications tailored to your business logic — from complex dashboards and SaaS platforms to internal tools with real-time capabilities."
    },
    {
      icon: Globe,
      title: "Business & Portfolio Websites",
      description: "High-performance, SEO-optimized, and conversion-focused websites built with pixel-perfect UI — crafted to make your brand stand out and turn visitors into leads."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "End-to-end commerce solutions with product management, secure payment gateways, order tracking, and analytics dashboards — built to handle real-world scale."
    },
    {
      icon: Server,
      title: "API Development & Microservices",
      description: "We design RESTful and gRPC APIs with microservices architecture — decoupled, scalable, and production-ready backend systems engineered for performance and reliability."
    },
    {
      icon: Briefcase,
      title: "Business Software & Enterprise Tools",
      description: "Custom ERP systems, CRM platforms, inventory management tools, billing software, and internal dashboards — purpose-built software that streamlines your operations."
    },
    {
      icon: Gamepad2,
      title: "Game Development",
      description: "From casual 2D browser games to interactive gamified experiences and simulation tools — we build engaging, performant games using modern game engines and web technologies."
    },
    {
      icon: Bot,
      title: "AI-Powered Automation & Workflows",
      description: "We integrate intelligent automation into your business processes — from automated data pipelines and report generation to AI-assisted workflows and chatbots."
    },
    {
      icon: Rocket,
      title: "Future-Ready Tech & Scalability",
      description: "We help you architect systems that don't just work today — we build with cloud-native infrastructure, containerization, CI/CD pipelines, and scalable microservices."
    }
  ];

  return (
    <section id="services" className="section-padding bg-[#0D0D0D]" data-testid="services-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">What We Build For You</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From idea to deployment — we engineer solutions that perform, scale, and evolve with your business.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass-card p-6 group"
              data-testid={`service-card-${index}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-5 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-all">
                <service.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-['Space_Grotesk']">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹25,000 – ₹50,000",
      description: "Perfect for small businesses getting started online",
      features: [
        "Business website up to 5 pages",
        "Responsive design",
        "Contact form integration",
        "Basic SEO setup",
        "2 revision rounds"
      ],
      popular: false
    },
    {
      name: "Growth",
      price: "₹75,000 – ₹2,00,000",
      description: "For businesses ready to scale with custom solutions",
      features: [
        "Custom web application",
        "E-commerce capabilities",
        "API integration",
        "Admin dashboard",
        "3 months post-launch support",
        "Priority development"
      ],
      popular: true
    },
    {
      name: "Custom",
      price: "Let's Talk",
      description: "Enterprise solutions tailored to your exact needs",
      features: [
        "Enterprise software development",
        "Game development",
        "AI automation & workflows",
        "Microservices architecture",
        "Cloud infrastructure",
        "Dedicated support & custom SLA"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-black" data-testid="pricing-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">Simple, Transparent Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            No surprise costs. No vague timelines. Just clear value.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedSection key={index}>
              <div
                className={`glass-card p-8 h-full flex flex-col ${
                  plan.popular ? "pricing-popular" : ""
                }`}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">{plan.name}</h3>
                  <div className="text-2xl font-bold gradient-text mb-3">{plan.price}</div>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact">
                  <button
                    className={`w-full py-3 font-semibold rounded-full transition-all ${
                      plan.popular ? "btn-glow" : "btn-outline"
                    }`}
                    data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                  >
                    Get Started
                  </button>
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      title: "Polluxkart",
      description: "Full-stack e-commerce platform. React frontend, .NET microservices backend, AWS deployment. Features: product catalog, cart, payments, order management.",
      tags: ["React", ".NET", "AWS", "Microservices"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Expense Splitter App",
      description: "Real-time group expense management with balance tracking and smart settlement suggestions.",
      tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      title: "Custom API Gateway",
      description: "High-performance API gateway with dynamic routing, JWT authentication, and rate limiting built for a microservices ecosystem.",
      tags: ["Go", "Docker", "Kubernetes", "gRPC"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="portfolio" className="section-padding bg-[#0D0D0D]" data-testid="portfolio-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">Work We're Proud Of</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real projects. Real impact. Built with precision.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index}>
              <div className="glass-card overflow-hidden group h-full flex flex-col" data-testid={`project-card-${index}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk']">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn-outline w-full py-2 text-sm flex items-center justify-center gap-2"
                    data-testid={`project-view-${index}`}
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Softogram built our e-commerce platform from scratch. Delivery was on time and quality exceeded every expectation.",
      name: "Rahul Sharma",
      title: "Founder, ShopEasy",
      initials: "RS"
    },
    {
      quote: "Their API architecture transformed how our platform scales under load. Incredibly professional team.",
      name: "Priya Mehta",
      title: "CTO, TechNova",
      initials: "PM"
    },
    {
      quote: "We had a stunning business website live in 3 weeks. Our inbound inquiries doubled within a month.",
      name: "Amit Singh",
      title: "Owner, Prayagraj Traders",
      initials: "AS"
    }
  ];

  return (
    <section className="section-padding bg-black" data-testid="testimonials-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">Trusted By Growing Businesses</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients say.
          </p>
        </AnimatedSection>

        <Marquee gradient={false} speed={40} pauseOnHover>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 mx-4 w-96 flex-shrink-0"
              data-testid={`testimonial-card-${index}`}
            >
              <Quote className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-gray-400 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-black font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Award,
      title: "Enterprise-Grade Experience",
      description: "3+ years building production software at global tech companies. We bring that rigor to every project."
    },
    {
      icon: CheckCircle,
      title: "Full-Cycle Delivery",
      description: "Design, development, testing, deployment, and post-launch support — all under one roof."
    },
    {
      icon: MessageCircle,
      title: "Radical Transparency",
      description: "Weekly progress updates, clear milestones, no hidden costs, no surprises."
    },
    {
      icon: Shield,
      title: "Engineered to Scale",
      description: "Cloud-native architecture, containerized deployments, and future-proof tech stacks that grow with you."
    }
  ];

  return (
    <section id="about" className="section-padding bg-[#0D0D0D]" data-testid="why-choose-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">Why Businesses Choose Softogram</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just build software. We build partnerships.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index}>
              <div className="glass-card p-8 flex gap-6" data-testid={`feature-card-${index}`}>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: `${formData.message}\n\nBudget Range: ${formData.budget || 'Not specified'}`
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", phone: "", service: "", message: "", budget: "" });
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Custom Web Application",
    "Business & Portfolio Website",
    "E-commerce Platform",
    "API Development & Microservices",
    "Business Software & Enterprise Tools",
    "Game Development",
    "AI-Powered Automation",
    "Future-Ready Tech Consulting"
  ];

  const budgetRanges = [
    "Under ₹50,000",
    "₹50,000 – ₹2,00,000",
    "₹2,00,000+",
    "Not Sure"
  ];

  return (
    <section id="contact" className="section-padding bg-black" data-testid="contact-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            <span className="gradient-text">Let's Build Something Great Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your idea with us. We'll respond within 24 hours with a free consultation.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-card p-8" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-dark w-full"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-dark w-full"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91-98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-dark w-full"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Service Interested In *</label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger 
                      className="bg-[#111111] border-[#2A2A2A] text-white focus:border-cyan-400 h-[46px]"
                      data-testid="contact-service-select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111111] border-[#2A2A2A]">
                      {services.map((service) => (
                        <SelectItem 
                          key={service} 
                          value={service}
                          className="text-white hover:bg-[#1A1A1A] focus:bg-[#1A1A1A]"
                        >
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                >
                  <SelectTrigger 
                    className="bg-[#111111] border-[#2A2A2A] text-white focus:border-cyan-400 h-[46px]"
                    data-testid="contact-budget-select"
                  >
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#2A2A2A]">
                    {budgetRanges.map((budget) => (
                      <SelectItem 
                        key={budget} 
                        value={budget}
                        className="text-white hover:bg-[#1A1A1A] focus:bg-[#1A1A1A]"
                      >
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Project Brief *</label>
                <textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="input-dark w-full resize-none"
                  data-testid="contact-message-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow w-full py-4 text-base flex items-center justify-center gap-2"
                data-testid="contact-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection>
            <div className="h-full flex flex-col gap-6">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk']">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email Us</h4>
                      <a href="mailto:hello@softogram.com" className="text-gray-500 hover:text-cyan-400 transition-colors" data-testid="contact-email-link">
                        hello@softogram.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Call Us</h4>
                      <a href="tel:+91-98XXXXXXXX" className="text-gray-500 hover:text-cyan-400 transition-colors" data-testid="contact-phone-link">
                        +91-98XXXXXXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-gray-500" data-testid="contact-location">Uttar Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8 flex-grow">
                <h3 className="text-xl font-bold text-white mb-6 font-['Space_Grotesk']">Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Twitter, href: "#", label: "Twitter" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all group"
                      data-testid={`social-link-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <footer className="bg-[#0A0A0A]" data-testid="footer">
      {/* Gradient Border */}
      <div className="footer-gradient-border"></div>
      
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-xl text-white font-['Space_Grotesk']">Softogram</span>
            </div>
            <p className="text-gray-500 mb-4">Your idea. Our code. Delivered.</p>
            <p className="text-sm text-gray-600">
              Premium software development studio crafting digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-['Space_Grotesk']">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-['Space_Grotesk']">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                >
                  <social.icon className="w-5 h-5 text-gray-500" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              hello@softogram.com
            </p>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Softogram. Crafted with precision in India. 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9198XXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      data-testid="whatsapp-button"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
};

// Home Page
const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PricingSection />
      <ProjectsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" richColors theme="dark" />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
