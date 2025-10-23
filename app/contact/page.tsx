'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail01Icon, 
  Github01Icon, 
  Linkedin02Icon, 
  NewTwitterIcon,
  SentIcon
} from 'hugeicons-react';
import { ScrollReveal, HoverScale } from '@/components/animations/AdvancedAnimations';

const socialLinks = [
  { 
    name: 'Email', 
    icon: Mail01Icon, 
    href: 'mailto:your@email.com',
    label: 'martinmwai901@gmail.com' 
  },
  { 
    name: 'GitHub', 
    icon: Github01Icon, 
    href: 'https://github.com/lemonhead-ai',
    label: '@lemonhead-ai' 
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin02Icon, 
    href: 'https://linkedin.com/in/martinmwai',
    label: 'Martin Mwai' 
  },
  { 
    name: 'X (Twitter)', 
    icon: NewTwitterIcon, 
    href: 'https://x.com/sacredllemon',
    label: '@sacredllemon' 
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s work together to create something amazing
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-3xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' && 'Sending...'}
                  {status === 'sent' && 'Message Sent!'}
                  {status === 'idle' && (
                    <>
                      Send Message
                      <SentIcon size={20} />
                    </>
                  )}
                  {status === 'error' && 'Try Again'}
                </motion.button>

                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-500 text-sm"
                  >
                    Thanks! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                <p className="text-muted mb-6">
                  I&apos;m always interested in hearing about new projects and opportunities. 
                  Feel free to reach out through any of these channels.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((link, i) => (
                    <HoverScale key={link.name}>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-secondary hover:bg-card rounded-3xl transition-colors group"
                      >
                        <div className="p-2 rounded-3xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <link.icon size={24} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{link.name}</p>
                          <p className="text-sm text-muted">{link.label}</p>
                        </div>
                      </motion.a>
                    </HoverScale>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-4">Availability</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-foreground font-medium">Available for work</span>
                </div>
                <p className="text-muted text-sm">
                  Currently open to freelance projects and full-time opportunities. 
                  Response time: Usually within 24 hours.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}