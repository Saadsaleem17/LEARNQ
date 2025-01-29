import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MovingBackground } from "@/components/moving-background"

export const metadata: Metadata = {
  title: "Login - LearnQ",
  description: "Login to your LearnQ account.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden flex items-center justify-center">
      <MovingBackground />
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Login to LearnQ</CardTitle>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white/70">
              Don't have an account?{" "}
              <Link href="/signup" className="underline hover:text-white">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

