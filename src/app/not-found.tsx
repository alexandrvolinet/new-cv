import Link from 'next/link'
import SmokeyCursor from "@/components/ui/cursors/SmokeyCursor"
import SmokeyBackground from "@/components/ui/shaders/SmokeyBackground";

export default function NotFound() {
  return (
    <>
      <SmokeyCursor />
      <SmokeyBackground />
      <div className='text-black flex flex-col items-center justify-center min-h-screen'>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </>
  )
}