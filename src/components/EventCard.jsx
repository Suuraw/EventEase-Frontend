
import { motion } from "framer-motion"
import { Users, CalendarIcon, MapPin, Trash2 } from "lucide-react"
import { format } from "date-fns"

const EventCard = ({ event,eventStatus,handleDeleteEvent }) => {
  console.log(eventStatus)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img src={event.bannerImage || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">{event.status}</div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <CalendarIcon size={16} className="mr-2" />
        <span className="text-sm">{format(new Date(event.date), "MMM dd, yyyy - HH:mm")}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-2" />
        <span className="text-sm">{event.location}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <Users size={16} className="mr-1" />
          <span className="text-sm">{event.attendeeCount} attending</span>
        </div>
        <div className="flex space-x-2">
          {eventStatus && (
            <button
              onClick={() => handleDeleteEvent(event._id)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            {event.status === "upcoming" ? "Join Event" : "View Details"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard

