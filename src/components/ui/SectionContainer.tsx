interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLDivElement>
}

function SectionContainer({ children, className = '', ref }: SectionContainerProps) {
  return (
    <section className={`h-screen w-full p-4 md:p-12 lg:p-32  ${className}`} ref={ref}>
      {children}
    </section>
  )
}

export default SectionContainer