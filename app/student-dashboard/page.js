"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// Dynamically import Lottie player
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500"></div>
    ),
  }
);

// Loading Screen Component
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    // Progress timer
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0; // Reset for demo
        return prev + 2;
      });
    }, 50);

    // Smooth animation frame timer
    const animationTimer = setInterval(() => {
      setAnimationFrame((prev) => prev + 0.1);
    }, 16); // ~60fps

    return () => {
      clearInterval(progressTimer);
      clearInterval(animationTimer);
    };
  }, []);

  // Calculate smooth scale using sine wave
  const logoScale = 1 + 0.2 * Math.sin(animationFrame); // Oscillates between 0.8 and 1.2

  const circumference = 2 * Math.PI * 28; // radius = 28
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Animated Logo with Sine Wave Scale */}
        <div className="relative">
          <div className="w-36 h-36 mx-auto relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full blur opacity-60 animate-pulse"></div>
            {/* Logo container */}
            <div className="relative w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Logo with smooth sine wave scale */}
              <Image
                src="/logo.png"
                alt="EcoLearn Logo"
                width={112}
                height={112}
                className="rounded-full object-cover transition-transform duration-75 ease-out"
                style={{
                  transform: `scale(${logoScale})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white animate-pulse">
            EcoLearn
          </h1>
          <p className="text-white/80 text-lg">Loading your dashboard...</p>
        </div>

        {/* Animated Progress Circle */}
        <div className="relative w-20 h-20 mx-auto">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 60 60">
            {/* Background circle */}
            <circle
              cx="30"
              cy="30"
              r="28"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="30"
              cy="30"
              r="28"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-32 right-24 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-60"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample data
  const studentData = {
    name: "Damera Vijay Kumar",
    level: 7,
    ecoPoints: 2450,
    streak: 12,
    treesPlanted: 18,
    rank: 3,
    nextLevelPoints: 2800,
    completedLessons: 24,
    badges: ["🌱", "♻️", "🌍", "💧", "⚡"],
    currentModule: "Ocean Conservation",
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setMounted(true);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 w-full overflow-x-hidden">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Welcome Section */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg">
                  AC
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {studentData.level}
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  Welcome back, {studentData.name}! 👋
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 hidden sm:block">
                  Ready to save the planet today?
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6">
                <Link href="/">
                  <div className="text-black font-medium cursor-pointer hover:underline">Main-Page</div>
                </Link>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-emerald-600">
                  {studentData.ecoPoints}
                </div>
                <div className="text-xs text-gray-500">Eco Points</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-orange-600">
                  {studentData.streak}
                </div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
              <div className="relative flex-shrink-0">
                <button className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <span className="text-lg sm:text-xl">🔔</span>
                </button>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Eco Points Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">🌟</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +50
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {studentData.ecoPoints.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Eco Points</div>
            <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div
                className="bg-emerald-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (studentData.ecoPoints / studentData.nextLevelPoints) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 sm:mt-2">
              {studentData.nextLevelPoints - studentData.ecoPoints} to Level{" "}
              {studentData.level + 1}
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">🔥</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-orange-600 bg-orange-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Hot!
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {studentData.streak} Days
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Learning Streak
            </div>
            <div className="mt-2 sm:mt-3 flex gap-0.5 sm:gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
                    i < studentData.streak % 7 ? "bg-orange-400" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Trees Planted */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">🌳</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Real
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {studentData.treesPlanted}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Trees Planted
            </div>
            <div className="mt-2 sm:mt-3 text-xs text-gray-500">
              ~{studentData.treesPlanted * 22}kg CO₂ offset!
            </div>
          </div>

          {/* Rank */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">🏆</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Top 5
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              #{studentData.rank}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Class Rank</div>
            <div className="mt-2 sm:mt-3 text-xs text-gray-500">
              Up 2 spots!
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Left Column - Learning Progress */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Current Learning Module */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    Continue Learning
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Current Module: {studentData.currentModule}
                  </p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base self-start sm:self-auto whitespace-nowrap">
                  Resume Lesson
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                    {mounted && (
                      <Player
                        autoplay
                        loop
                        src="https://assets5.lottiefiles.com/packages/lf20_DMgKk1.json"
                        style={{ height: "100%", width: "100%" }}
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                    Ocean Pollution
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
                    Learn about plastic waste in oceans
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2">
                    <div
                      className="bg-blue-500 h-1.5 sm:h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    75% Complete
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl">🌊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                    Marine Life Protection
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
                    Next: Protecting sea creatures
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2">
                    <div
                      className="bg-green-500 h-1.5 sm:h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Coming Next
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Challenges */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Today&apos;s Eco-Challenges
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    task: "Complete Ocean Quiz",
                    points: 50,
                    completed: true,
                    icon: "📚",
                  },
                  {
                    task: "Watch Marine Video",
                    points: 30,
                    completed: true,
                    icon: "📺",
                  },
                  {
                    task: "Plant a Virtual Tree",
                    points: 100,
                    completed: false,
                    icon: "🌱",
                  },
                  {
                    task: "Share Learning with Friend",
                    points: 75,
                    completed: false,
                    icon: "👥",
                  },
                ].map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          challenge.completed ? "bg-green-100" : "bg-gray-200"
                        }`}
                      >
                        <span className="text-sm sm:text-base">
                          {challenge.completed ? "✅" : challenge.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`font-medium text-sm sm:text-base ${
                            challenge.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {challenge.task}
                        </div>
                        <div className="text-xs sm:text-sm text-emerald-600">
                          +{challenge.points} points
                        </div>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0">
                        Start
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Achievements */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Recent Achievements
              </h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {studentData.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className="text-xl sm:text-2xl mb-1">{badge}</div>
                    <div className="text-xs text-gray-600">
                      Badge {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs sm:text-sm">
                  View All Badges →
                </button>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Class Leaderboard
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Sarah Kim", points: 2890, rank: 1, avatar: "SK" },
                  { name: "Mike Johnson", points: 2670, rank: 2, avatar: "MJ" },
                  {
                    name: "Alex Chen",
                    points: 2450,
                    rank: 3,
                    avatar: "AC",
                    isMe: true,
                  },
                  { name: "Emma Davis", points: 2340, rank: 4, avatar: "ED" },
                  { name: "Ryan Liu", points: 2180, rank: 5, avatar: "RL" },
                ].map((student, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                      student.isMe
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 ${
                        student.rank === 1
                          ? "bg-yellow-500"
                          : student.rank === 2
                          ? "bg-gray-400"
                          : student.rank === 3
                          ? "bg-orange-500"
                          : "bg-gray-600"
                      }`}
                    >
                      {student.rank}
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium truncate text-xs sm:text-sm ${
                          student.isMe ? "text-emerald-700" : "text-gray-900"
                        }`}
                      >
                        {student.name} {student.isMe && "(You)"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.points.toLocaleString()} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  🎯 Take Daily Quiz
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  🌍 Join Live Session
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  👥 Challenge Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

