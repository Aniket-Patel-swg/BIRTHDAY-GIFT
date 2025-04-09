'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/Adventure.module.css';

export default function Adventure() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [allHintsFound, setAllHintsFound] = useState(false);

    // Quiz questions and answers
    const questions = [
        {
            text: "What was the time when I proposed to you?",
            options: [
                { text: "8:25 PM", isCorrect: false },
                { text: "8:27 PM", isCorrect: true },
                { text: "8:30 PM", isCorrect: false },
                { text: "8:35 PM", isCorrect: false }
            ],
            hint: "Something delicate is waiting, made with love and grace 🌙"
        },
        {
            text: "Which of these songs is my all time favourite song?",
            options: [
                { text: "\"Yellow\" – Coldplay", isCorrect: false },
                { text: "\"Sky full of Stars\" – Coldplay", isCorrect: false },
                { text: "\"The Nights\" – Avicii", isCorrect: true },
                { text: "\"A Thousand Years\" – Christina Perri", isCorrect: false }
            ],
            hint: "It comes in a box, but holds more than just a gift — it'll make you more gorgeous. 💫"
        },
        {
            text: "Which shirt did I wear when we had I know you know?",
            options: [
                { text: "White", isCorrect: false },
                { text: "Blue", isCorrect: true },
                { text: "Yellow Tshirt", isCorrect: false },
                { text: "Black", isCorrect: false }
            ],
            hint: "Scale your personal Everest and conquer your aspirations, one sparkle at a time. 💖"
        }
    ];

    const checkAnswer = (isCorrect: boolean, index: number) => {
        setSelectedAnswer(index);

        if (isCorrect) {
            // If correct, show the hint
            setShowHint(true);
        } else {
            // If incorrect, don't show hint
            setShowHint(false);
        }
    };

    const moveToNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowHint(false);
            setSelectedAnswer(null);
        } else {
            // All questions answered correctly
            setAllHintsFound(true);
        }
    };

    const tryAgain = () => {
        setShowHint(false);
        setSelectedAnswer(null);
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>🎉 Your Birthday Treasure Hunt! 🎉</h1>

                <div className={styles.welcome}>
                    <p>Hey Cutieeeeeeeeee!</p>
                    <p>Every treasure is linked to a memory. Let's see how well you remember our moments…</p>
                    <div className={styles.envelope}>🔍</div>
                </div>

                {!allHintsFound ? (
                    <div className={styles.quizContainer}>
                        <div className={styles.question}>
                            <h2>Question {currentQuestion + 1}:</h2>
                            <p>{questions[currentQuestion].text}</p>

                            <div className={styles.options}>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.optionButton} ${selectedAnswer === index ?
                                            option.isCorrect ?
                                                styles.correctOption :
                                                styles.incorrectOption
                                            : ''
                                            }`}
                                        onClick={() => checkAnswer(option.isCorrect, index)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {String.fromCharCode(65 + index)}. {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedAnswer !== null && (
                            <div className={`${styles.feedback} ${showHint ? styles.correct : styles.incorrect}`}>
                                {showHint ? (
                                    <>
                                        <h3>✨ You got it right! ✨</h3>
                                        <div className={styles.hintContainer}>
                                            <h4>Treasure Hint {currentQuestion + 1}:</h4>
                                            <p className={styles.hintText}>{questions[currentQuestion].hint}</p>
                                            <button
                                                className={styles.button}
                                                onClick={moveToNextQuestion}
                                            >
                                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Find All Treasures'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3>That's not quite right!</h3>
                                        <p>Try again to unlock your special hint.</p>
                                        <button
                                            className={styles.button}
                                            onClick={tryAgain}
                                        >
                                            Try Again
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.allHintsContainer}>
                        <h2>🎊 You've Unlocked All Your Treasure Hints! 🎊</h2>

                        <div className={styles.allHints}>
                            <div className={styles.hintCard}>
                                <h3>Hint #1:</h3>
                                <p>{questions[0].hint}</p>
                            </div>

                            <div className={styles.hintCard}>
                                <h3>Hint #2:</h3>
                                <p>{questions[1].hint}</p>
                            </div>

                            <div className={styles.hintCard}>
                                <h3>Hint #3:</h3>
                                <p>{questions[2].hint}</p>
                            </div>
                        </div>

                        <div className={styles.treasureMessage}>
                            <p>Now that you have all the clues, it's time to find your birthday treasures!</p>
                            <p>Each hint leads to a special gift hidden just for you. Happy hunting!</p>
                            <p>First one might be somewhere near your pillow... 😉</p>
                        </div>

                        <Link href="/">
                            <button className={styles.button}>Return to Home</button>
                        </Link>
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                <p>Made with love for your special day!</p>
            </footer>
        </div>
    );
}