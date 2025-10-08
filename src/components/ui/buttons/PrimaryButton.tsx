'use client'

import React from 'react'
import Link from 'next/link'

type Props = {
    href: string
    children: React.ReactNode
    ariaLabel?: string
    className?: string
    ref?: React.Ref<HTMLAnchorElement>
}

export default function PrimaryButton({ href, children, ariaLabel, className, ref }: Props) {
    return (
        <Link
            ref={ref}
            href={href}
            aria-label={ariaLabel || (typeof children === 'string' ? children : 'Primary button')}
            className={`
          ${className}
    px-6 py-2 md:px-8 md:py-3 
    text-sm md:text-base lg:text-lg
bg-gradient-to-l from-white via-purple-300 to-pink-300 
    rounded-full font-semibold text-blue-950
    transition-all duration-300 transform hover:scale-105 
    shadow-lg hover:shadow-purple-500/25 
    will-change-transform
        `}
        >
            {children}
        </Link>
    )
}
