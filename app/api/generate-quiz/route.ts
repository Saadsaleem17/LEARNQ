import { getPlaylistVideos, getVideoDetails, getVideoTranscript } from "@/lib/youtube"
import { generateQuiz } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { playlistId, questionCount } = body

    console.log("Received request:", { playlistId, questionCount })

    if (!playlistId) {
      return new Response(JSON.stringify({ error: "Playlist ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!questionCount || questionCount < 1 || questionCount > 20) {
      return new Response(JSON.stringify({ error: "Question count must be between 1 and 20" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Get videos from playlist
    console.log("Fetching playlist videos...")
    const videos = await getPlaylistVideos(playlistId)

    if (!videos || videos.length === 0) {
      return new Response(JSON.stringify({ error: "No videos found in playlist" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Try to get transcript for the first video
    console.log("Fetching video transcript...")
    const transcript = await getVideoTranscript(videos[0].videoId)

    let quizContent: string
    let isTranscript: boolean

    if (transcript) {
      quizContent = transcript
      isTranscript = true
    } else {
      // If transcript is not available, use video titles
      console.log("Transcript not available. Using video titles...")
      quizContent = videos.map((video) => video.title).join("\n")
      isTranscript = false
    }

    // Generate quiz using Gemini
    console.log("Generating quiz...")
    const quiz = await generateQuiz(quizContent, questionCount, isTranscript)

    console.log("Quiz generated successfully")
    return new Response(JSON.stringify(quiz), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("API route error:", error)
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

