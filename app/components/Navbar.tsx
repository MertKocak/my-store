import React from 'react'
import Link from 'next/link'

export default function Navbar() { //temel bir navbar tasarımı
  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-white font-bold text-sm">
          My Store
        </Link>
        <div className="space-x-8 flex">
          <Link href="/pages/about">
            <div className="text-white text-sm">Hakkımızda</div>
          </Link>
          <Link href="/pages/contact">
            <div className="text-white text-sm">İletişim</div>
          </Link>
        </div>
      </div>
    </nav>
  )
}