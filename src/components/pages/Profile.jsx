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

const ProfileSection = ({myevent}) => {
    const navigate=useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const username=localStorage.getItem("username");
  // Dummy data
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
    recentEvents: myevent
  };
  //sidebar
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
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar />
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm mt-[10%]">
        {/* Header Section */}
        <div className="p-8 border-b">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-gray-600 mt-1">{profile.role}</p>

              {/* <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              </div> */}

              <p className="mt-4 text-gray-700">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col-1 md:grid-cols-3 gap-4 p-8 border-b justify-center items-center w-100">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="text-blue-500 mb-2" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {profile.stats.eventsCreated}
            </span>
            <span className="text-gray-600">Events Created</span>
          </div>
          {/* <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
            <Heart className="text-purple-500 mb-2" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {profile.stats.eventsAttending}
            </span>
            <span className="text-gray-600">Events Attending</span>
          </div> */}
          {/* <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
            <Star className="text-yellow-500 mb-2" size={24} />
            <span className="text-2xl font-bold text-gray-900">
              {profile.stats.rating}
            </span>
            <span className="text-gray-600">Average Rating</span>
          </div> */}
        </div>

        {/* Recent Events Section */}
        <div className="p-8 border-b">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <div className="space-y-4">
            {profile.recentEvents.map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-600">{event.attendeeCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4">Connect</h2>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
