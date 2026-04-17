import { useState, useEffect } from 'react'

export interface TypewriterLine {
  text: string
  indent: number
  type: 'normal' | 'key-value' | 'comment' | 'feature'
}

export const useTypewriter = (
  lines: TypewriterLine[],
  charDelay = 30,
  lineDelay = 350
) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>(() =>
    lines.map(() => '')
  )
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true)
      return
    }

    const line = lines[currentLine].text

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev]
          next[currentLine] = line.slice(0, currentChar + 1)
          return next
        })
        setCurrentChar((c) => c + 1)
      }, charDelay)
      return () => clearTimeout(timer)
    }

    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, lineDelay)
      return () => clearTimeout(timer)
    }

    setDone(true)
  }, [currentLine, currentChar, lines, charDelay, lineDelay])

  return { displayedLines, currentLine, done }
}
