import { Brain, Coins } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  currency: number
}

export function Header({ currency }: HeaderProps) {
  return (
    <header className="border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Brain className="h-8 w-8 text-white transition-transform group-hover:scale-110 duration-300" />
            <span className="font-bold text-2xl text-white group-hover:text-indigo-200 transition-colors duration-300">
              LearnQ
            </span>
          </Link>
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <Coins className="h-5 w-5 text-yellow-300" />
            <span className="font-semibold text-white">{currency}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

