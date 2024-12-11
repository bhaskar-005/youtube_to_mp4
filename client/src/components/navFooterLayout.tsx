import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen ">
      <header className="bg-darkgreen text-white p-4 shadow-lg">
        <nav className="container px-10 mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center space-x-2 gap-2 hover:text-green-200 transition-colors">
            <Image src={'/logo.png'} alt="FastYouTubeMP4 Logo" width={40} height={40}/>
            <span>FastYouTubeMP4</span>
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-green-100 transition-colors">Home</Link>
            <Link href="#faq" className="hover:text-green-100 transition-colors">faq</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 animate-fadeIn">
        {children}
      </main>
      <footer className="bg-darkgreen text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FastYouTubeMP4. All rights reserved.</p>
          <div className="mt-2 space-x-4 opacity-60">
            <Link href="/terms" className="hover:text-green-100 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-green-100 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

