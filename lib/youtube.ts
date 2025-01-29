import { YoutubeTranscript } from "youtube-transcript"

export async function getPlaylistVideos(playlistId: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`YouTube API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.items.map((item: any) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails?.default?.url || "",
    }))
  } catch (error) {
    console.error("YouTube API error:", error)
    throw error
  }
}

export async function getVideoDetails(videoId: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`YouTube API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.items[0]?.snippet || null
  } catch (error) {
    console.error("YouTube API error:", error)
    throw error
  }
}

export async function getVideoTranscript(videoId: string): Promise<string | null> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId)
    return transcript.map((entry) => entry.text).join(" ")
  } catch (error) {
    console.error("Error fetching transcript:", error)
    return null
  }
}

