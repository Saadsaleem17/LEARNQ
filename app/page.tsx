"use client"

import { useState } from "react"
import Link from "next/link"
import { PlaylistInput } from "@/components/playlist-input"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { MovingBackground } from "@/components/moving-background"

export default function Home() {
  const [currency, setCurrency] = useState(0)

  const handleCurrencyUpdate = (amount: number) => {
    setCurrency((prevCurrency) => prevCurrency + amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
      <MovingBackground />
      <Header currency={currency} />
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tight animate-fade-in">LearnQ</h1>
            <p className="text-xl text-indigo-100 animate-fade-in-delay">
              Transform any YouTube playlist into an interactive quiz
            </p>
            <div className="space-x-4">
              <Link href="/auth">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <PlaylistInput onCurrencyUpdate={handleCurrencyUpdate} />
        </div>
      </main>
    </div>
  )
}

