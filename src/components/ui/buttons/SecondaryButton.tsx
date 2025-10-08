'use client'

import React from 'react'
import Link from 'next/link'

type Props = {
    href: string
    children: React.ReactNode
    ariaLabel?: string
}

export default function SecondaryButton({ href, children, ariaLabel }: Props) {
    return (
        <Link
            href={href}
            aria-label={ariaLabel || (typeof children === 'string' ? children : 'Secondary button')}
            className="
        px-6 py-2 md:px-8 md:py-3 
        text-sm md:text-base lg:text-lg
        border border-white/30 
        rounded-full font-semibold text-white 
        hover:bg-white/10 
        transition-all duration-300 transform hover:scale-105 
        will-change-transform
      "
        >
            {children}
        </Link>
    )
}
