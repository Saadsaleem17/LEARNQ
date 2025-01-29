const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export async function generateQuiz(content: string, questionCount: number, isTranscript: boolean) {
  try {
    console.log("Sending request to Gemini API...")
    const prompt = isTranscript
      ? `Given the following transcript from a YouTube video, generate a quiz with ${questionCount} well-structured multiple-choice questions (MCQs) or short-answer questions. Each question should be strictly based on the actual spoken content of the video and should evaluate a person's understanding of the concepts, facts, or insights presented in the video.`
      : `Given the following titles from YouTube videos in a playlist, generate a quiz with ${questionCount} well-structured multiple-choice questions (MCQs) or short-answer questions. Each question should be related to the topics suggested by the video titles and should evaluate a person's general knowledge or understanding of these topics.`

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GOOGLE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${prompt}

                Ensure that the questions are:
                - Relevant to the main points discussed in the video or suggested by the titles.
                - Able to assess comprehension, recall, and critical thinking related to the subject.
                - Varied in difficulty, including both direct recall and deeper analytical questions.

                For each question, provide:
                - The question itself.
                - Four answer options (for MCQs) with one correct answer.
                - A short explanation for the correct answer.

                If the content is not educational or lacks clear information, generate questions that focus on the key takeaways or themes suggested.

                Format the response as a JSON array with the following structure:
                [
                  {
                    "question": "Question text",
                    "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
                    "correctAnswer": "A",
                    "explanation": "Why this is the correct answer"
                  }
                ]

                Content: ${content}`,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    console.log("Received response from Gemini API")

    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts
    ) {
      console.error("Unexpected Gemini API response structure:", data)
      throw new Error("Unexpected response structure from Gemini API")
    }

    const generatedText = data.candidates[0].content.parts[0].text

    // Find the JSON array in the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error("Invalid quiz format received:", generatedText)
      throw new Error("Invalid quiz format received")
    }

    const parsedQuiz = JSON.parse(jsonMatch[0])

    if (!Array.isArray(parsedQuiz) || parsedQuiz.length === 0) {
      console.error("Invalid parsed quiz:", parsedQuiz)
      throw new Error("Invalid quiz data structure")
    }

    return parsedQuiz
  } catch (error) {
    console.error("Gemini API error:", error)
    throw error
  }
}

