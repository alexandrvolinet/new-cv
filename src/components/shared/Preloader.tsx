'use client'

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-[#0c1124] flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="flex items-center">
        <span className="w-1 h-5 rounded-full animate-[scale-up4_1s_linear_infinite] bg-cuboid-glow"></span>
        <span className="w-1 h-9 rounded-full mx-2 animate-[scale-up4_1s_linear_infinite] animation-delay-250 bg-cuboid-glow"></span>
        <span className="w-1 h-5 rounded-full animate-[scale-up4_1s_linear_infinite] animation-delay-500 bg-cuboid-glow"></span>
      </div>
    </div>
  )
}
