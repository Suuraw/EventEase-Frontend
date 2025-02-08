import React, { useState } from "react";
import Navbar from "../NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Star,
  Heart,
  X,
  Link as LinkIcon,
  Menu,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

const ProfileSection = ({ myevent }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const username = localStorage.getItem("username");

  const profile = {
    name: username,
    avatar: "https://img.icons8.com/clouds/100/minecraft-addons.png",
    stats: {
      eventsCreated: JSON.stringify(localStorage.getItem("itemCount")),
      eventsAttending: 12,
      rating: 4.8,
    },
    social: {
      twitter: "@sarahevent",
      github: "sanderson",
      linkedin: "sarah-anderson",
    },
    recentEvents: myevent,
  };

  const Sidebar = () => (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>

              <div className="mt-12 space-y-6">
                <div
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <User size={20} />
                  <span className="font-medium">My Profile</span>
                </div>
                <div
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => navigate("/myevent")}
                >
                  <Calendar size={20} />
                  <span className="font-medium">My Events</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar />
      {/* Navbar wrapper with bottom margin */}
      <div className="mb-24">
        <Navbar />
      </div>

      {/* Main content with adjusted top margin */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Rest of the component remains the same */}
          {/* Header Section */}
          <div className="p-4 sm:p-8 border-b">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase mt-[7%]">
                  {profile.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {profile.role}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-4 sm:p-8 border-b">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="text-blue-500 mb-2" size={24} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {profile.stats.eventsCreated}
                </span>
                <span className="text-sm sm:text-base text-gray-600">
                  Events Created
                </span>
              </div>
            </div>
          </div>

          {/* Recent Events Section */}
          <div className="p-4 sm:p-8 border-b">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recent Events
            </h2>
            <div className="space-y-3">
              {profile.recentEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-2"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {event.name.toUpperCase()}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {event.attendeeCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="p-4 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Connect</h2>
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;