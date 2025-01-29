"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Quiz } from "./quiz"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlaylistInputProps {
  onCurrencyUpdate: (amount: number) => void
}

export function PlaylistInput({ onCurrencyUpdate }: PlaylistInputProps) {
  const [url, setUrl] = useState("")
  const [questionCount, setQuestionCount] = useState("5")
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [error, setError] = useState("")

  const extractPlaylistId = (url: string) => {
    const regex = /[&?]list=([^&]+)/i
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const generateQuiz = async (playlistId: string) => {
    setLoading(true)
    setError("")
    setQuiz(null)

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId, questionCount: Number.parseInt(questionCount) }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid quiz data received")
      }

      setQuiz(data)
    } catch (err) {
      console.error("Error in generateQuiz:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const playlistId = extractPlaylistId(url)
    if (!playlistId) {
      setError("Invalid YouTube playlist URL. Please make sure the URL contains a playlist ID.")
      return
    }
    await generateQuiz(playlistId)
  }

  const handleTryAgain = async () => {
    const playlistId = extractPlaylistId(url)
    if (playlistId) {
      await generateQuiz(playlistId)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playlist-url" className="text-white">
              YouTube Playlist URL
            </Label>
            <Input
              id="playlist-url"
              type="url"
              placeholder="https://www.youtube.com/playlist?list=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question-count" className="text-white">
              Number of Questions
            </Label>
            <Select value={questionCount} onValueChange={setQuestionCount}>
              <SelectTrigger
                id="question-count"
                className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                {[3, 5, 10, 15, 20].map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </form>
      </Card>
      {quiz && <Quiz questions={quiz} onCurrencyUpdate={onCurrencyUpdate} onTryAgain={handleTryAgain} />}
    </div>
  )
}

