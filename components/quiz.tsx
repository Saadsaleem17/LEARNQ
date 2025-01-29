"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface QuizProps {
  questions: Question[]
  onCurrencyUpdate: (amount: number) => void
  onTryAgain: () => void
}

export function Quiz({ questions, onCurrencyUpdate, onTryAgain }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  useEffect(() => {
    if (quizComplete) {
      if (correctAnswers === questions.length) {
        onCurrencyUpdate(50)
      }
    }
  }, [quizComplete, correctAnswers, questions.length, onCurrencyUpdate])

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      setCorrectAnswers(correctAnswers + 1)
      onCurrencyUpdate(10)
    }
    setShowExplanation(true)
  }

  const handleNext = () => {
    setSelectedAnswer("")
    setShowExplanation(false)

    if (currentQuestion === questions.length - 1) {
      setQuizComplete(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleRestart = () => {
    onTryAgain()
  }

  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Your score: {score} out of {questions.length}
            </p>
            {correctAnswers === questions.length && (
              <p className="text-lg text-green-300 mt-2">Perfect score! You earned a 50 currency bonus!</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleRestart}
              className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{question.question}</p>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.charAt(0)}
                    id={`option-${index}`}
                    disabled={showExplanation}
                    className="border-white text-white"
                  />
                  <Label htmlFor={`option-${index}`} className="text-white">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-white/20 rounded-lg"
              >
                <p className="font-semibold">
                  {selectedAnswer === question.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
                </p>
                <p className="mt-2">{question.explanation}</p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showExplanation ? (
              <Button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

