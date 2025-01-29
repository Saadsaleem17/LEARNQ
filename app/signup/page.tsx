import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserAuthForm } from "@/components/user-auth-form"
import { MovingBackground } from "@/components/moving-background"

export const metadata: Metadata = {
  title: "Sign Up - LearnQ",
  description: "Create a new LearnQ account.",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden flex items-center justify-center">
      <MovingBackground />
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create a LearnQ Account</CardTitle>
          </CardHeader>
          <CardContent>
            <UserAuthForm isSignUp />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <Link href="/auth" className="underline hover:text-white">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

