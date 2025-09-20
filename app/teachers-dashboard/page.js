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

// Loading Screen Component for Teachers
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    // Progress timer
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);

    // Animation timer
    const animationTimer = setInterval(() => {
      setAnimationFrame((prev) => prev + 0.1);
    }, 16);

    return () => {
      clearInterval(progressTimer);
      clearInterval(animationTimer);
    };
  }, []);

  const logoScale = 1 + 0.2 * Math.sin(animationFrame);
  const circumference = 2 * Math.PI * 28;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-36 h-36 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-60 animate-pulse"></div>
            <div className="relative w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="EcoLearn Logo"
                width={112}
                height={112}
                className="rounded-full object-cover transition-transform duration-75 ease-out"
                style={{ transform: `scale(${logoScale})` }}
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white animate-pulse">
            EcoLearn Teacher Portal
          </h1>
          <p className="text-white/80 text-lg">Preparing your classroom...</p>
        </div>

        {/* Progress Circle */}
        <div className="relative w-20 h-20 mx-auto">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
            <circle
              cx="30" cy="30" r="28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"
              strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-24 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: "0.5s" }}></div>
      </div>
    </div>
  );
};

export default function TeacherDashboard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("Class 7A");

  // Sample teacher data
  const teacherData = {
    name: "Ms. Sarah Johnson",
    subject: "Environmental Science",
    school: "Green Valley High School",
    totalStudents: 125,
    activeToday: 89,
    pendingAssignments: 12,
    averageProgress: 78,
    classes: ["Class 7A", "Class 7B", "Class 8A"],
    notifications: 5
  };

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full overflow-x-hidden">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Welcome Section */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg">
                  SJ
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  Welcome, {teacherData.name} 👩‍🏫
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  {teacherData.subject} • {teacherData.school}
                </p>
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6">
              <Link href="/">
                <div className="text-gray-700 font-medium cursor-pointer hover:text-indigo-600 transition-colors text-sm">
                  Main Page
                </div>
              </Link>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-indigo-600">
                  {teacherData.totalStudents}
                </div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-lg md:text-xl font-bold text-green-600">
                  {teacherData.activeToday}
                </div>
                <div className="text-xs text-gray-500">Active Today</div>
              </div>
              <div className="relative flex-shrink-0">
                <button className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <span className="text-lg sm:text-xl">🔔</span>
                </button>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{teacherData.notifications}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {/* Total Students */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">👥</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                All Classes
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {teacherData.totalStudents}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Total Students</div>
            <div className="mt-2 sm:mt-3 text-xs text-gray-500">
              Across {teacherData.classes.length} classes
            </div>
          </div>

          {/* Active Today */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">📈</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +12 today
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {teacherData.activeToday}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Active Today</div>
            <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${(teacherData.activeToday / teacherData.totalStudents) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">📋</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-orange-600 bg-orange-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Review
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {teacherData.pendingAssignments}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Pending Reviews</div>
            <div className="mt-2 sm:mt-3 text-xs text-gray-500">
              Need attention
            </div>
          </div>

          {/* Average Progress */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-lg sm:text-xl md:text-2xl">📊</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Great!
              </span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {teacherData.averageProgress}%
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Progress</div>
            <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${teacherData.averageProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Left Column - Class Management */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Class Selection & Overview */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Class Management</h2>
                  <p className="text-sm sm:text-base text-gray-600">Monitor and manage your classes</p>
                </div>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base self-start sm:self-auto"
                >
                  {teacherData.classes.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
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
                    {selectedClass} Performance
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
                    42 students, 85% completion rate
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2">
                    <div className="bg-indigo-500 h-1.5 sm:h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">Excellent Progress</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl">🌍</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center text-sm sm:text-base">
                    Environmental Impact
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
                    Class contributed to 156 trees planted
                  </p>
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-bold text-green-600">3,432 kg</span>
                    <p className="text-xs text-gray-500">CO₂ Offset This Month</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Student Activity */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Recent Student Activity</h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { student: "Emma Davis", activity: "Completed Ocean Conservation Quiz", score: "95%", time: "10 mins ago", status: "excellent" },
                  { student: "Ryan Liu", activity: "Submitted Tree Planting Project", score: "88%", time: "25 mins ago", status: "good" },
                  { student: "Alex Chen", activity: "Completed Daily Eco-Challenge", score: "100%", time: "45 mins ago", status: "excellent" },
                  { student: "Sarah Kim", activity: "Needs help with Climate Module", score: "65%", time: "1 hour ago", status: "needs-help" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.status === 'excellent' ? 'bg-green-100' : 
                        activity.status === 'good' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        <span className="text-sm sm:text-base">
                          {activity.status === 'excellent' ? '⭐' : 
                           activity.status === 'good' ? '✅' : '⚠️'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base text-gray-900 truncate">
                          {activity.student} - {activity.activity}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Score: {activity.score} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  📝 Create Assignment
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  📊 View Analytics
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  👨‍👩‍👧‍👦 Message Parents
                </button>
              </div>
            </div>

            {/* Top Students */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Top Performers This Week</h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Emma Davis", points: 2890, rank: 1, avatar: "ED", improvement: "+15%" },
                  { name: "Alex Chen", points: 2450, rank: 2, avatar: "AC", improvement: "+12%" },
                  { name: "Sarah Kim", points: 2340, rank: 3, avatar: "SK", improvement: "+8%" },
                  { name: "Ryan Liu", points: 2180, rank: 4, avatar: "RL", improvement: "+5%" }
                ].map((student, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 ${
                      student.rank === 1 ? 'bg-yellow-500' : 
                      student.rank === 2 ? 'bg-gray-400' : 
                      student.rank === 3 ? 'bg-orange-500' : 'bg-indigo-500'
                    }`}>
                      {student.rank}
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-xs sm:text-sm text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.points.toLocaleString()} pts • {student.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Pending Reviews</h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { assignment: "Climate Change Essay", submissions: 15, dueDate: "Today" },
                  { assignment: "Recycling Project", submissions: 8, dueDate: "Tomorrow" },
                  { assignment: "Ocean Quiz", submissions: 23, dueDate: "2 days ago" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                        {item.assignment}
                      </div>
                      <div className="text-xs text-orange-600">
                        {item.submissions} submissions • Due: {item.dueDate}
                      </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-medium transition-colors flex-shrink-0">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
