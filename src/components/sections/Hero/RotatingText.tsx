import { useState, useEffect, memo } from 'react';

interface RotatingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDuration?: number;
}

const RotatingText = memo(({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  holdDuration = 1800,
}: RotatingTextProps) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      // Hold at the end of the word before deleting
      timer = setTimeout(() => setIsDeleting(true), holdDuration);
    } else if (isDeleting && text === '') {
      // Move to the next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
      // Small pause before typing next word
      timer = setTimeout(() => {}, 200); 
    } else {
      // Type or delete characters
      const nextText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      timer = setTimeout(() => setText(nextText), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, holdDuration]);

  return (
    <p className="hero__greeting">
      HI, I'M A{' '}
      <span className="hero__rotating-text">
        {text}
      </span>
      <span className={`hero__cursor-blink ${isDeleting ? 'hidden' : ''}`}>|</span>
    </p>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
