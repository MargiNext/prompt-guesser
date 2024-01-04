import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'

export default function SinglePlay() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/image.png"
        alt="Next.js Logo"
        width={300}
        height={300}
        priority
      />
      <TextArea 
        placeholder="Enter text here"
      />
      <Link href="/SinglePlay">
        予測する
      </Link>
    </main>
  )
}
