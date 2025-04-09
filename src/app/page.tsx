'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isTime, setIsTime] = useState(false);

  useEffect(() => {
    // Set the target date - April 10th, 2025 at midnight
    const targetDate = new Date("April 9, 2025 00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const remaining = targetDate - now;

      if (remaining <= 0) {
        setIsTime(true);
        return;
      }

      setTimeRemaining({
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remaining % (1000 * 60)) / 1000)
      });
    };

    // Check immediately on load
    updateTimer();

    // Only set up the timer if it's not yet time
    let interval: NodeJS.Timeout | undefined;
    if (!isTime) {
      interval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTime]);

  const handleStartAdventure = () => {
    router.push('/adventure');
  };

  const handlePhotoGallery = () => {
    alert("I'm working to make this precious collection. Still working on it!");
  };

  if (!isTime) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.timerContainer}>
            <h1 className={styles.title}>Birthday Adventure Awaits!</h1>
            <h3>Your birthday adventure begins in:</h3>
            <div className={styles.timer}>
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
            </div>
            <p>Come back when the timer reaches zero to start your birthday surprise adventure!</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.birthdayMessage}>
          <div className={styles.confetti}>🎉 🎊 🎈 🎂 🎁 🎉 🎊 🎈</div>

          <h1 className={styles.title}>Happy Birthday!</h1>

          <p className={styles.description}>
            Today marks another beautiful year in your amazing journey.
            You fill every day with joy and kindness, and I'm so grateful
            to have you in my life. May this year bring you all the happiness,
            success, and adventure you deserve!
          </p>

          <p className={styles.description}>
            I've planned something special just for you - a multi-day adventure
            of surprises and gifts to celebrate how wonderful you are.
            Each day holds a new treasure to discover!
          </p>

          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={handleStartAdventure}
            >
              Start Adventure
            </button>

            <button
              className={styles.button}
              onClick={handlePhotoGallery}
            >
              Photo Gallery
            </button>
          </div>

          <div className={styles.confetti}>🎉 🎊 🎈 🎂 🎁 🎉 🎊 🎈</div>
        </div>
      </main>
    </div>
  );
}