import { useEffect, useState, useRef } from 'react'

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    let iterations = 0

    if (isHovering) {
      setIsScrambling(true)
      interval = setInterval(() => {
        iterations++

        const scrambled = text.split('').map((char, i) => {
          if (char === ' ') return ' '
          return characters[Math.floor(Math.random() * characters.length)]
        }).join('')

        setDisplayText(scrambled)

        if (iterations >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsScrambling(false)
        }
      }, speed)
    } else {
      setDisplayText(text)
      setIsScrambling(false)
    }

    return () => clearInterval(interval)
  }, [isHovering, text, characters, speed, maxIterations])

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText.split('').map((char, index) => {
        const isEncrypted = isScrambling && isHovering && char !== ' '
        return (
          <span
            key={index}
            className={`${isEncrypted ? encryptedClassName : className} inline-block min-w-[0.6em] font-mono will-change-transform`}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
