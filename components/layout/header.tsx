"use client"
import React from 'react'
import Link from 'next/link'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full py-4 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <Link 
          href="/" 
          className="font-kumar-one text-3xl md:text-4xl text-primary hover:text-secondary transition-colors mt-1"
        >
          Pickizard
        </Link>
      </div>
    </header>
  )
}

export default Header