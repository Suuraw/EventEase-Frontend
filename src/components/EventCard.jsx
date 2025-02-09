import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CalendarIcon, MapPin, Trash2, Edit2, Save } from "lucide-react";
import { format } from "date-fns";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Adjust based on your backend URL

const statusOptions = ["upcoming", "ongoing", "completed", "cancelled"];

const EventCard = ({ event, eventStatus, handleDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  useEffect(() => {
    socket.on("eventUpdated", (updatedEvent) => {
      if (updatedEvent._id === event._id) {
        setEditedEvent(updatedEvent);
      }
    });
    return () => {
      socket.off("eventUpdated");
    };
  }, [event._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSave = () => {
    socket.emit("eventUpdate", editedEvent);
    setIsEditing(false);
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      handleDeleteEvent(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={editedEvent.bannerImage || "/placeholder.svg"}
          alt={editedEvent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">
          {isEditing ? (
            <select
              name="status"
              value={editedEvent.status}
              onChange={handleChange}
              className="border px-2 py-1 rounded-lg"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            editedEvent.status
          )}
        </div>
      </div>

      {isEditing ? (
        <input
          type="text"
          name="name"
          value={editedEvent.name}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded-lg mb-2"
        />
      ) : (
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {editedEvent.name}
        </h3>
      )}

      <div className="flex items-center text-gray-600 mb-2">
        <CalendarIcon size={16} className="mr-2" />
        {isEditing ? (
          <input
            type="datetime-local"
            name="date"
            value={editedEvent.date}
            onChange={handleChange}
            className="border px-2 py-1 rounded-lg"
          />
        ) : (
          <span className="text-sm">
            {format(new Date(editedEvent.date), "MMM dd, yyyy - HH:mm")}
          </span>
        )}
      </div>

      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-2" />
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={editedEvent.location}
            onChange={handleChange}
            className="border px-2 py-1 rounded-lg"
          />
        ) : (
          <span className="text-sm">{editedEvent.location}</span>
        )}
      </div>

      {isEditing ? (
        <textarea
          name="description"
          value={editedEvent.description}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded-lg mb-4"
        />
      ) : (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {editedEvent.description}
        </p>
      )}

      <div className="flex items-center text-gray-600 mb-2">
        <Users size={16} className="mr-1" />
        {isEditing ? (
          <input
            type="number"
            name="attendeeCount"
            value={editedEvent.attendeeCount}
            onChange={handleChange}
            className="border px-2 py-1 rounded-lg w-16"
          />
        ) : (
          <span className="text-sm">{editedEvent.attendeeCount} attending</span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {eventStatus && (
            <>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                onClick={() => confirmDelete(event._id)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            {editedEvent.status === "upcoming" ? "Join Event" : "View Details"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
