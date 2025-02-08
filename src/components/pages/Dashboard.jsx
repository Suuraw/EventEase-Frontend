import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Menu, X, User, Calendar } from "lucide-react";
import EventCard from "../EventCard";
import CreateEventModal from "../CreateEventModal";
import { io } from "socket.io-client";
import Navbar from "../NavBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
let i=0;
const Dashboard = ({setEventStatus,eventStatus}) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const socket = io("https://event-management-y4ds.onrender.com", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });
    setEventStatus(false);
    console.log("Socket instance connected:", socket.id);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected: ", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error: ", error);
    });

    socket.on("initialEvents", (data) => {
      console.log("Received initial events:", data);
      setEvents(data);
    });

    socket.on("newEvent", (eventData) => {
      console.log("New event received:", eventData);
      setEvents((prev) => [eventData, ...prev]);
    });

    socket.on("attendeeUpdate", (data) => {
      console.log("Attendee update received:", data);
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === data.eventId
            ? { ...event, attendeeCount: data.count }
            : event
        )
      );
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      attendeeCount: 0,
      status: "upcoming",
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sidebar Component
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
          className="p-2 hover:bg-gray-100 rounded-full border-4 border-blue-500"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar />

      <Navbar />
      <div className="flex-grow mt-20 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-black-700 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select
              className="px-4 py-2 rounded-lg border border-black focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Event</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={i++} event={event} eventStatus={eventStatus}/>
          ))}
        </div>

        <CreateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateEvent}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
