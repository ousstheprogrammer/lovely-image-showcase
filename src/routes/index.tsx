import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { useCallback, useState } from "react";
import heroAsset from "@/assets/aicha-running-surprise.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aicha, One Important Question ❤️" },
      { name: "description", content: "A little running-date surprise for Aicha." },
      { property: "og:title", content: "Aicha, One Important Question ❤️" },
      { property: "og:description", content: "A little running-date surprise for Aicha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const teases = [
  "Are you sure, Aicha? 👀",
  "Hmm… I don't think you really mean that 😂",
  "Nice try 😭",
  "NO button.exe has stopped working 💀",
  "Aicha… please 😭❤️",
  "Your trainer is disappointed 😔😂",
  "Okay okay… I'll give you one more chance 😭",
  "THE NO BUTTON REFUSES TO COOPERATE 😂",
  "Okay Aicha… apparently NO isn't an option 😂❤️",
];

const hearts = Array.from({ length: 13 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 96}%`,
  delay: `${(index * 0.83) % 9}s`,
  speed: `${10 + (index % 5)}s`,
}));

function Index() {
  const reducedMotion = useReducedMotion();
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const dodge = useCallback(() => {
    if (accepted) return;
    setAttempts((value) => value + 1);
    const maxX = Math.min(150, Math.max(70, window.innerWidth / 2 - 80));
    const maxY = Math.min(100, Math.max(55, window.innerHeight / 5));
    setNoPosition({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
    });
  }, [accepted]);

  const celebrate = useCallback(() => {
    setAccepted(true);
    if (reducedMotion) return;
    const end = Date.now() + 1800;
    const colors = ["#ff244d", "#ff7892", "#ffffff"];
    const frame = () => {
      confetti({ particleCount: 8, angle: 60, spread: 65, origin: { x: 0, y: 0.65 }, colors });
      confetti({ particleCount: 8, angle: 120, spread: 65, origin: { x: 1, y: 0.65 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [reducedMotion]);

  const tease = attempts ? teases[Math.min(attempts - 1, teases.length - 1)] : "Pick wisely, gorgeous.";
  const noScale = Math.max(0.56, 1 - attempts * 0.06);
  const yesScale = Math.min(1.35, 1 + attempts * 0.045);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart absolute text-lg text-love-soft opacity-0"
            style={{ left: heart.left, animationDelay: heart.delay, "--heart-speed": heart.speed } as React.CSSProperties}
          >
            ♥
          </span>
        ))}
      </div>

      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden px-5 pb-8 pt-24 sm:px-10 sm:pb-12 lg:min-h-screen lg:items-center lg:px-16 lg:py-20">
        <img src={heroAsset.url} alt="Your personal trainer waiting in a red-lit gym" className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center] sm:object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--night)_16%,transparent)_0%,color-mix(in_oklab,var(--night)_52%,transparent)_48%,var(--night)_100%)] lg:bg-[linear-gradient(90deg,color-mix(in_oklab,var(--night)_96%,transparent)_0%,color-mix(in_oklab,var(--night)_72%,transparent)_45%,color-mix(in_oklab,var(--night)_18%,transparent)_78%)]" />
        <span className="runner-pass absolute left-0 top-[16%] text-2xl" aria-hidden="true">🏃‍♀️</span>

        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div key="question" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} className="relative z-10 w-full max-w-2xl lg:ml-[4vw]">
              <p className="mb-3 font-bold uppercase text-love-soft">A very serious invitation</p>
              <h1 className="font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-9xl">Hey Aicha <span className="text-love">♥</span></h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 0.55 }} className="mt-5 text-lg font-semibold sm:text-2xl">I have an important question for you…</motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.2 }} className="mt-2 max-w-xl text-2xl font-black leading-tight sm:text-4xl">Will you go running with me tomorrow? 🏃‍♂️❤️</motion.p>
              <p className="mt-4 text-sm text-foreground/75 sm:text-base">Just you + me + a little suffering + lots of laughs 😂</p>

              <div className="relative mt-9 min-h-44">
                <motion.p key={tease} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 h-6 text-sm font-bold text-love-soft sm:text-base">{tease}</motion.p>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button type="button" onClick={celebrate} animate={{ scale: yesScale }} whileHover={{ scale: yesScale + 0.04 }} whileTap={{ scale: yesScale - 0.04 }} className="rounded-md bg-love px-6 py-4 text-sm font-black text-foreground shadow-[0_0_30px_color-mix(in_oklab,var(--love)_45%,transparent)] sm:px-9 sm:text-base">❤️ YES, LET'S RUN</motion.button>
                  <motion.button type="button" aria-label="No, dodge button" onMouseEnter={dodge} onPointerDown={(event) => { event.preventDefault(); dodge(); }} animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }} transition={{ type: "spring", stiffness: 520, damping: 24 }} className="rounded-md border border-foreground/30 bg-night/80 px-7 py-4 text-sm font-extrabold text-foreground backdrop-blur-sm sm:text-base">😈 NO</motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 110 }} className="relative z-10 w-full max-w-2xl lg:ml-[4vw]">
              <p className="font-bold uppercase text-love-soft">Our running date is officially booked</p>
              <h1 className="mt-2 font-display text-7xl uppercase leading-none text-foreground sm:text-9xl">Yeeeees! <span className="text-love">♥</span></h1>
              <p className="mt-4 text-xl font-black sm:text-3xl">I knew you couldn't resist running with your favorite trainer 😎</p>
              <p className="mt-2 text-foreground/75">Tomorrow = You + Me + Running + Good vibes ❤️</p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.5 }} className="mt-7 max-w-lg border-l-4 border-love bg-night/75 p-5 backdrop-blur-md">
                <h2 className="font-display text-3xl uppercase">Tomorrow's mission</h2>
                <ul className="mt-3 grid gap-2 text-sm font-bold sm:grid-cols-2 sm:text-base">
                  <li>🏃‍♀️ Run together</li><li>😂 Laugh together</li><li>💪 Get stronger together</li><li>❤️ Make memories together</li>
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 1.1 }} className="mt-7 max-w-xl">
                <p className="text-lg font-bold">Honestly, I don't care how fast we run…</p>
                <p className="mt-1 text-2xl font-black text-love-soft">I just want to run beside you. ❤️</p>
                <p className="mt-5 text-sm text-foreground/70">Thank you for saying yes, Aicha. Every little thing is better when I get to do it with you.</p>
                <p className="mt-4 font-display text-3xl uppercase leading-tight sm:text-4xl">See you tomorrow, my running partner 🏃‍♀️❤️🏃‍♂️</p>
                <p className="mt-2 text-sm font-bold text-love-soft">Your favorite trainer 😎</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
