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
  Smartphone, 
  Cloud,
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
  Instagram,
  Facebook,
  ExternalLink,
  Quote
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
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
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "glass-strong shadow-2xl" : "glass"
      }`}
      data-testid="navbar"
    >
      <a href="#" className="flex items-center gap-2" data-testid="logo-link">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Code className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <span className="font-bold text-lg md:text-xl text-white">Softogram</span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            data-testid={`nav-link-${link.label.toLowerCase()}`}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact">
          <Button className="btn-primary rounded-full px-6 py-2 text-sm font-semibold" data-testid="nav-cta-button">
            Get a Quote
          </Button>
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
            className="absolute top-full left-0 right-0 mt-4 glass-strong rounded-2xl p-6 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary rounded-full w-full py-3 text-sm font-semibold mt-2">
                  Get a Quote
                </Button>
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
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4" data-testid="hero-section">
      {/* Background Orbs */}
      <div className="gradient-orb gradient-orb-1 animate-pulse-glow" />
      <div className="gradient-orb gradient-orb-2 animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
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
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">Building the future, one line at a time</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          We Build Software That{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Grows Your Business
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Custom websites, web apps, and software solutions tailored to your needs. 
          Your idea. Our code. Delivered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#contact">
            <Button className="btn-primary rounded-full px-8 py-4 text-base font-semibold flex items-center gap-2" data-testid="hero-cta-quote">
              Get a Free Quote
              <ChevronRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="#portfolio">
            <Button className="btn-secondary rounded-full px-8 py-4 text-base font-semibold" data-testid="hero-cta-work">
              See Our Work
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Code Snippet Decoration */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 code-block p-6 animate-float"
      >
        <div className="text-sm">
          <div className="code-line mb-1">
            <span className="code-keyword">const</span>{" "}
            <span className="code-variable">project</span> = {"{"}
          </div>
          <div className="code-line mb-1 pl-4">
            <span className="code-function">idea</span>:{" "}
            <span className="code-string">"yours"</span>,
          </div>
          <div className="code-line mb-1 pl-4">
            <span className="code-function">code</span>:{" "}
            <span className="code-string">"ours"</span>,
          </div>
          <div className="code-line mb-1 pl-4">
            <span className="code-function">result</span>:{" "}
            <span className="code-string">"delivered"</span>
          </div>
          <div className="code-line">{"}"}</div>
        </div>
      </motion.div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: 10, suffix: "+", label: "Projects Delivered", icon: CheckCircle },
    { value: 8, suffix: "+", label: "Happy Clients", icon: Users },
    { value: 3, suffix: "+", label: "Years Experience", icon: Award },
    { value: 100, suffix: "%", label: "On-Time Delivery", icon: Zap }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm" data-testid="stats-section">
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
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
              <div className="stat-number text-3xl md:text-4xl font-bold mb-1">
                {isInView && (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
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
      description: "Full-stack web apps built with modern technologies tailored to your business workflow.",
      span: "md:col-span-2"
    },
    {
      icon: Globe,
      title: "Business Websites",
      description: "Fast, responsive, and SEO-friendly websites that convert visitors into customers."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Platforms",
      description: "End-to-end online stores with payment integration, inventory and order management."
    },
    {
      icon: Server,
      title: "API Development & Microservices",
      description: "Scalable backend APIs and microservices architecture for growing platforms.",
      span: "md:col-span-2"
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      description: "App-like experiences accessible directly from the browser."
    },
    {
      icon: Cloud,
      title: "Cloud Deployment & DevOps",
      description: "AWS-based cloud setup, Docker containerization, and CI/CD pipelines."
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden" data-testid="services-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What We Build For You
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From idea to deployment, we deliver end-to-end software solutions.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bento-grid"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`glass rounded-2xl p-8 card-hover group ${service.span || ""}`}
              data-testid={`service-card-${index}`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <service.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
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
        "Basic business website",
        "Up to 5 pages",
        "Mobile responsive design",
        "Contact form integration",
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
        "3 months support",
        "Priority development"
      ],
      popular: true
    },
    {
      name: "Custom",
      price: "Let's Talk",
      description: "Enterprise solutions tailored to your exact needs",
      features: [
        "Enterprise software",
        "Microservices architecture",
        "Cloud infrastructure",
        "Dedicated support",
        "Custom timeline",
        "SLA guarantee"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-black/30" data-testid="pricing-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose a plan that fits your business needs. No hidden costs.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedSection key={index}>
              <div
                className={`glass rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular ? "pricing-popular" : ""
                } card-hover`}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-3">{plan.price}</div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact">
                  <Button
                    className={`w-full rounded-full py-3 font-semibold ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                    data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                  >
                    Get Started
                  </Button>
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
      description: "Full-stack e-commerce platform built with React frontend, .NET microservices backend, deployed on AWS. Includes product catalog, cart, payments and order management.",
      tags: ["React", ".NET", "AWS", "Microservices"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      title: "Expense Splitter App",
      description: "A Splitwise-like application for splitting group expenses with real-time balance tracking and settlement suggestions.",
      tags: ["React", "Node.js", "MongoDB", "Real-time"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    },
    {
      title: "Custom API Gateway",
      description: "Designed and built a high-performance API gateway handling routing, authentication and rate limiting for a microservices architecture.",
      tags: ["Go", "Redis", "Docker", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="portfolio" className="section-padding" data-testid="portfolio-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Work We're Proud Of
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real projects, real results. See how we've helped businesses grow.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index}>
              <div className="glass rounded-2xl overflow-hidden card-hover group h-full flex flex-col" data-testid={`project-card-${index}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="btn-secondary rounded-full w-full py-2 text-sm font-medium flex items-center justify-center gap-2"
                    data-testid={`project-view-${index}`}
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </Button>
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
      quote: "Softogram built our e-commerce platform from scratch. The delivery was on time and the quality exceeded our expectations.",
      name: "Rahul Sharma",
      title: "Founder, ShopEasy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      quote: "Their API development work transformed how our platform scales. Highly professional team.",
      name: "Priya Mehta",
      title: "CTO, TechNova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    },
    {
      quote: "We got a beautiful business website within 3 weeks. Our inquiries doubled after launch.",
      name: "Amit Singh",
      title: "Owner, Prayagraj Traders",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
    }
  ];

  return (
    <section className="section-padding bg-black/30" data-testid="testimonials-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted By Growing Businesses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients say.
          </p>
        </AnimatedSection>

        <Marquee gradient={false} speed={40} pauseOnHover>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 mx-4 w-96 flex-shrink-0"
              data-testid={`testimonial-card-${index}`}
            >
              <Quote className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
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
      title: "3+ Years of Real Experience",
      description: "Built enterprise-grade software at global tech companies"
    },
    {
      icon: CheckCircle,
      title: "End-to-End Delivery",
      description: "From design and development to deployment and support"
    },
    {
      icon: MessageCircle,
      title: "Transparent Communication",
      description: "Regular updates, no hidden costs, clear timelines"
    },
    {
      icon: Shield,
      title: "Built for Growth",
      description: "Scalable architecture that grows with your business"
    }
  ];

  return (
    <section className="section-padding" data-testid="why-choose-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Businesses Choose Softogram
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just build software. We build partnerships.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index}>
              <div className="glass rounded-2xl p-8 card-hover flex gap-6" data-testid={`feature-card-${index}`}>
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
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
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Custom Web Application",
    "Business Website",
    "E-commerce Platform",
    "API Development",
    "Progressive Web App",
    "Cloud & DevOps",
    "Other"
  ];

  return (
    <section id="contact" className="section-padding bg-black/30" data-testid="contact-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Your Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91-98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Service Interested In</label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger 
                      className="bg-white/5 border-white/10 text-white focus:border-blue-500"
                      data-testid="contact-service-select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] border-white/10">
                      {services.map((service) => (
                        <SelectItem 
                          key={service} 
                          value={service}
                          className="text-white hover:bg-white/10"
                        >
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Project Brief</label>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 resize-none"
                  data-testid="contact-message-textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary rounded-full w-full py-4 text-base font-semibold flex items-center justify-center gap-2"
                data-testid="contact-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection>
            <div className="h-full flex flex-col">
              <div className="glass rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email Us</h4>
                      <a href="mailto:hello@softogram.com" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="contact-email-link">
                        hello@softogram.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Call Us</h4>
                      <a href="tel:+91-98XXXXXXXX" className="text-gray-400 hover:text-blue-400 transition-colors" data-testid="contact-phone-link">
                        +91-98XXXXXXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-gray-400" data-testid="contact-location">Uttar Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-8 flex-grow">
                <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Facebook, href: "#", label: "Facebook" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500/20 transition-colors group"
                      data-testid={`social-link-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
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
    <footer className="py-16 border-t border-white/5" data-testid="footer">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Softogram</span>
            </div>
            <p className="text-gray-400 mb-4">Your idea. Our code. Delivered.</p>
            <p className="text-sm text-gray-500">
              Building modern software solutions for businesses across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
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
            <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
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
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              hello@softogram.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Softogram. All rights reserved.
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
    <div className="min-h-screen">
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
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
