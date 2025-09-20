"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Lottie player with no SSR
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    ),
  }
);

export default function MainSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animationError, setAnimationError] = useState(false);

  // Hero section rotating features
  const heroFeatures = [
    {
      title: "Interactive Learning",
      description: "Fun games, quizzes, and challenges that make environmental education exciting!",
      emoji: "🎮"
    },
    {
      title: "Real Eco-Tasks",
      description: "Plant trees, clean up, and take real actions that help our planet!",
      emoji: "🌱"
    },
    {
      title: "Earn Rewards",
      description: "Collect badges, climb leaderboards, and show off your eco-achievements!",
      emoji: "🏆"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % heroFeatures.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section id="about" className="w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    Learn.{" "}
                    <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                      Play.
                    </span>{" "}
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      Save Earth!
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Join thousands of young eco-heroes learning about our planet through fun games, exciting challenges, and real-world actions! 🌍
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:from-emerald-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto"
                    suppressHydrationWarning={true}
                  >
                    Start Learning! 🚀
                  </button>
                  <button 
                    className="border-2 border-emerald-500 text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-emerald-50 transition-all duration-300 w-full sm:w-auto"
                    suppressHydrationWarning={true}
                  >
                    Watch Demo 📺
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 pt-4">
                  <div className="text-center min-w-0">
                    <div className="text-xl sm:text-2xl font-black text-emerald-600">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Young Learners</div>
                  </div>
                  <div className="text-center min-w-0">
                    <div className="text-xl sm:text-2xl font-black text-cyan-600">50K+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Trees Planted</div>
                  </div>
                  <div className="text-center min-w-0">
                    <div className="text-xl sm:text-2xl font-black text-blue-600">100+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Schools</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Animation Showcase */}
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-3xl p-6 sm:p-8 shadow-2xl w-full">
                  <div className="text-center space-y-4 sm:space-y-6">
                    {/* Animation with Fallback */}
                    <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
                      {mounted && !animationError ? (
                        <Player
                          autoplay
                          loop
                          src="https://assets5.lottiefiles.com/packages/lf20_DMgKk1.json"
                          style={{ height: '100%', width: '100%' }}
                          onError={() => setAnimationError(true)}
                        />
                      ) : (
                        <div className="text-6xl sm:text-8xl animate-bounce">
                          {heroFeatures[currentFeature].emoji}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {heroFeatures[currentFeature].title}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {heroFeatures[currentFeature].description}
                    </p>
                  </div>
                  
                  {/* Feature indicators */}
                  <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
                    {heroFeatures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentFeature 
                            ? 'bg-emerald-500 scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        suppressHydrationWarning={true}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating decorative elements - positioned to avoid overflow */}
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 sm:w-6 sm:h-6 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-1/2 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section id="features" className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Platform Features
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Everything you need for an amazing environmental learning experience!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {[
                {
                  emoji: "🎮",
                  title: "Gamified Challenges",
                  description: "Complete missions, solve puzzles, and unlock new levels as you learn about environmental conservation.",
                  lottie: "https://assets5.lottiefiles.com/packages/lf20_DMgKk1.json"
                },
                {
                  emoji: "📊",
                  title: "Progress Tracking",
                  description: "Monitor your learning journey with detailed analytics, streaks, and personalized insights.",
                  lottie: "https://assets5.lottiefiles.com/packages/lf20_1a8dx7zj.json"
                },
                {
                  emoji: "👥",
                  title: "Team Competitions",
                  description: "Join school teams, compete with friends, and participate in nationwide environmental challenges.",
                  lottie: "https://assets5.lottiefiles.com/packages/lf20_touohxv0.json"
                },
                {
                  emoji: "🌿",
                  title: "Local Impact Map",
                  description: "See real environmental projects in your area and track your community&apos;s collective impact."
                },
                {
                  emoji: "📱",
                  title: "Mobile Learning",
                  description: "Learn anywhere, anytime with our responsive platform that works on all devices."
                },
                {
                  emoji: "🎓",
                  title: "Expert Content",
                  description: "Curriculum designed by environmental scientists and education experts for maximum impact."
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group w-full"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {mounted && feature.lottie ? (
                      <Player
                        autoplay
                        loop
                        src={feature.lottie}
                        style={{ height: '100%', width: '100%' }}
                        onError={() => {}}
                        rendererSettings={{
                          preserveAspectRatio: 'xMidYMid slice'
                        }}
                      />
                    ) : (
                      <div className="text-3xl sm:text-4xl animate-bounce">{feature.emoji}</div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-16 sm:py-20 relative overflow-hidden">
          {/* Background pattern - contained within viewport */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-4 h-full rotate-12 scale-150 origin-center">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full w-2 h-2 sm:w-4 sm:h-4 ${
                      i % 3 === 0 ? 'bg-yellow-300' : i % 3 === 1 ? 'bg-green-300' : 'bg-blue-300'
                    } animate-pulse`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${2 + (i % 3)}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {/* Hero Animation with Fallback */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                {mounted ? (
                  <Player
                    autoplay
                    loop
                    src="https://assets5.lottiefiles.com/packages/lf20_puciaact.json"
                    style={{ height: '100%', width: '100%' }}
                    onError={() => {}}
                  />
                ) : (
                  <div className="text-6xl sm:text-8xl animate-bounce">🌟</div>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight px-4">
                Transform Learning Into Adventure! 🌟
              </h2>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto px-4">
                Where education meets excitement! Join the revolution of environmental learning that&apos;s changing how kids connect with nature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4">
                <button 
                  className="bg-white text-purple-600 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto"
                  suppressHydrationWarning={true}
                >
                  Begin Adventure! ✨
                </button>
                <button 
                  className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                  suppressHydrationWarning={true}
                >
                  Explore Features 🔍
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-white/90 px-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl">🚀</span>
                  <span className="text-sm sm:text-base">Fast & Fun</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl">🎯</span>
                  <span className="text-sm sm:text-base">Goal-Oriented</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl">💡</span>
                  <span className="text-sm sm:text-base">Smart Learning</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
