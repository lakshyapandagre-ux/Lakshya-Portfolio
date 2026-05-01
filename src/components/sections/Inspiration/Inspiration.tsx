import { useState, useEffect, useCallback } from 'react';
import './Inspiration.css';

const slides = [
  { 
    quote: 'Improve more than you compare.', 
    author: "— Lakshya's Rule", 
    tag: 'PERSONAL RULE',
    codeFile: 'rule.sql',
    codeTokens: [
      [{ text: 'SELECT', color: '#FF79C6' }, { text: ' * ', color: '#F8F8F2' }, { text: 'FROM', color: '#FF79C6' }, { text: ' engineer', color: '#50FA7B' }],
      [{ text: 'WHERE', color: '#FF79C6' }, { text: ' focus ', color: '#F8F8F2' }, { text: '=', color: '#FF79C6' }, { text: " 'improving'", color: '#F1FA8C' }],
      [{ text: 'AND NOT', color: '#FF79C6' }, { text: ' focus ', color: '#F8F8F2' }, { text: '=', color: '#FF79C6' }, { text: " 'comparing'", color: '#F1FA8C' }, { text: ';', color: '#F8F8F2' }]
    ]
  },
  { 
    quote: '1% better every day.', 
    author: '— Daily Protocol', 
    tag: 'DAILY PROTOCOL',
    codeFile: 'protocol.sql',
    codeTokens: [
      [{ text: 'UPDATE', color: '#FF79C6' }, { text: ' skills', color: '#50FA7B' }],
      [{ text: 'SET', color: '#FF79C6' }, { text: ' level ', color: '#F8F8F2' }, { text: '=', color: '#FF79C6' }, { text: ' level ', color: '#F8F8F2' }, { text: '*', color: '#FF79C6' }, { text: ' 1.01', color: '#BD93F9' }],
      [{ text: 'WHERE', color: '#FF79C6' }, { text: ' effort ', color: '#F8F8F2' }, { text: '=', color: '#FF79C6' }, { text: " 'consistent'", color: '#F1FA8C' }, { text: ';', color: '#F8F8F2' }]
    ]
  },
  { 
    quote: 'Build what matters, then build it beautifully.', 
    author: '— Unknown', 
    tag: 'BUILDING PHILOSOPHY',
    codeFile: 'mindset.sql',
    codeTokens: [
      [{ text: 'INSERT INTO', color: '#FF79C6' }, { text: ' products', color: '#50FA7B' }],
      [{ text: 'VALUES', color: '#FF79C6' }, { text: ' (', color: '#F8F8F2' }],
      [{ text: "  'meaningful'", color: '#F1FA8C' }, { text: ',', color: '#F8F8F2' }],
      [{ text: "  'beautiful'", color: '#F1FA8C' }, { text: ',', color: '#F8F8F2' }],
      [{ text: "  'impactful'", color: '#F1FA8C' }],
      [{ text: ');', color: '#F8F8F2' }]
    ]
  },
  { 
    quote: "Don't wait to be great. Ship, learn, repeat.", 
    author: "— Builder's Mindset", 
    tag: "BUILDER'S MINDSET",
    codeFile: 'workflow.sql',
    codeTokens: [
      [{ text: 'WHILE', color: '#FF79C6' }, { text: ' not_perfect ', color: '#F8F8F2' }, { text: 'LOOP', color: '#FF79C6' }],
      [{ text: '  ship_it', color: '#8BE9FD' }, { text: '();', color: '#F8F8F2' }],
      [{ text: '  learn_from_feedback', color: '#8BE9FD' }, { text: '();', color: '#F8F8F2' }],
      [{ text: '  iterate', color: '#8BE9FD' }, { text: '();', color: '#F8F8F2' }],
      [{ text: 'END LOOP', color: '#FF79C6' }, { text: ';', color: '#F8F8F2' }]
    ]
  },
  { 
    quote: 'Code is just a tool. The real product is the problem you solve.', 
    author: '— Engineering Truth', 
    tag: 'ENGINEERING TRUTH',
    codeFile: 'truth.js',
    codeTokens: [
      [{ text: 'const', color: '#FF79C6' }, { text: ' success ', color: '#F8F8F2' }, { text: '=', color: '#FF79C6' }],
      [{ text: '  solveProblem', color: '#8BE9FD' }, { text: '(', color: '#F8F8F2' }, { text: 'userNeeds', color: '#FFB86C' }, { text: ') ', color: '#F8F8F2' }, { text: '>', color: '#FF79C6' }, { text: ' writeCode', color: '#8BE9FD' }, { text: '(', color: '#F8F8F2' }, { text: 'features', color: '#FFB86C' }, { text: ');', color: '#F8F8F2' }]
    ]
  },
];

export default function InspirationSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating, current]
  );

  const goToNext = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  // Auto advance every 4.8s
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 4800);
    return () => clearInterval(timer);
  }, [goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToSlide((current - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goToNext, goToSlide]);

  return (
    <section className="inspiration__section section-wrapper">
      <div className="inspiration__container">
        
        {/* LEFT COLUMN: Quotes & Navigation */}
        <div className="inspiration__left">
          {/* Small label on top */}
          <div className={`inspiration__label ${animating ? 'is-animating' : ''}`}>
            <div className="inspiration__dot" />
            <span>{slides[current].tag}</span>
          </div>

          {/* Large centered quote text */}
          <div className={`inspiration__quote-wrapper ${animating ? 'is-animating' : ''}`}>
            <h2 className="inspiration__quote">"{slides[current].quote}"</h2>
          </div>

          {/* Author below */}
          <p className={`inspiration__author ${animating ? 'is-animating' : ''}`}>
            {slides[current].author}
          </p>

          {/* Dot navigation below */}
          <div className="inspiration__nav">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`inspiration__nav-dot ${i === current ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Code Card */}
        <div className="inspiration__right">
          <div className={`inspiration__code-card ${animating ? 'is-animating' : ''}`}>
            
            <div className="inspiration__code-header">
              <div className="inspiration__window-controls">
                <div style={{ background: '#FF5F56' }} />
                <div style={{ background: '#FFBD2E' }} />
                <div style={{ background: '#27C93F' }} />
              </div>
              <div className="inspiration__code-title">{slides[current].codeFile}</div>
            </div>

            <div className="inspiration__code-body">
              <div className="inspiration__line-numbers">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              
              <div className="inspiration__code-content">
                {Array.from({ length: 8 }).map((_, i) => {
                  const line = slides[current].codeTokens[i];
                  return (
                    <div className="inspiration__code-line" key={i}>
                      {line ? (
                        line.map((token, j) => (
                          <span key={j} style={{ color: token.color }}>{token.text}</span>
                        ))
                      ) : (
                        <span> </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
