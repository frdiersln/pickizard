"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/create-list', label: 'Create List' },
    { href: '/start', label: 'Start' },
  ]

  return (
    <header className="w-full py-4 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex gap-4 basis-[200px]">
          <button className="text-primary hover:text-secondary transition-colors">
            About
          </button>
          <button className="text-primary hover:text-secondary transition-colors">
            How It Works
          </button>
        </div>

        <div className="basis-[24px] md:hidden"></div>

        <Link 
          href="/" 
          className="font-kumar-one text-3xl md:text-4xl text-primary hover:text-secondary transition-colors mt-1"
        >
          Pickizard
        </Link>

        <div className="flex gap-4 justify-end basis-[24px] md:basis-[200px]">
          <button className="hidden md:block text-primary hover:text-secondary transition-colors">
            Create List
          </button>
          <button className="hidden md:block text-primary hover:text-secondary transition-colors">
            Start
          </button>
          <button 
            className="md:hidden text-primary hover:text-secondary z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm md:hidden"
            style={{ zIndex: 40 }}
          >
            {/* Sparkle effect container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center h-full"
            >
              <nav className="flex flex-col items-center gap-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    {/* Sparkle effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.2, opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Link 
                      href={item.href}
                      className="text-primary hover:text-secondary transition-colors text-2xl px-8 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header