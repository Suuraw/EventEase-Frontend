import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import cloud from "../../assets/placard.png"
import { Send } from "lucide-react"
import Footer from "../Footer"
import Navbar from "../NavBar"
import { AnimatePresence } from "framer-motion"
import { Menu, X, User, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Animation for each letter appearing one-by-one
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
}

// Infinite Slider Animation
const sliderVariants = {
  animate: {
    x: ["0%", "-50%"], // Moves only half the length to loop seamlessly
    transition: {
      x: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        duration: 10, // Adjust speed
        ease: "linear",
      },
    },
  },
}

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [logged, isLogged] = useState(false)
  const navigate = useNavigate()
  const text = "Plan, Manage, Experience Events Effortlessly.."
  const events = [
    { name: "Concerts", image: "https://s6.imgcdn.dev/YYnEgw.jpg" },
    { name: "Workshops", image: "https://s6.imgcdn.dev/YYngAa.jpg" },
    { name: "Sports", image: "https://s6.imgcdn.dev/YYnJNt.jpg" },
    { name: "Technology", image: "https://s6.imgcdn.dev/YYnoGT.jpg" },
    { name: "Business", image: "https://s6.imgcdn.dev/YYnpeD.jpg" },
    { name: "Webinars", image: "https://s6.imgcdn.dev/YYnHDu.jpg" },
  ]
  useEffect(() => {
    const user = localStorage.getItem("userId")
    if (user) isLogged(true)
    else isLogged(false)
  }, [])
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
  )
  return (
    <>
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
      <div className="min-h-screen flex justify-center items-center relative pt-16 md:pt-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:h-[500px] w-[90%] relative"
        >
          {/* Letter-by-letter Animated Text */}
          {/* <div className="md:absolute left-10 top-10 sm:top-2 sm:mt-20"> */}
          <motion.h1 className="text-2xl md:text-4xl font-extrabold text-blue-500 flex flex-wrap mb-4 md:mb-0">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="mr-1"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          {/* </div> */}

          {/* Cloud Image & Description */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-4 md:mt-8">
            <motion.img
              src={cloud}
              className="w-[400px] h-auto"
              initial={{ opacity: 0, y: 50 }} // Start from bottom
              animate={{ opacity: 1, y: 0 }} // Move upwards
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.div
              className="flex flex-col justify-center items-center mt-4 md:mt-0 md:absolute md:top-[50%]"
              initial={{ opacity: 0, y: 50 }} // Start from bottom
              animate={{ opacity: 1, y: 0 }} // Move upwards
              transition={{ duration: 1, delay: 0.3 }}
            >
              {!logged && (
                <div
                  className="flex items-center bg-blue-100 text-blue-500 py-2 px-4 rounded-xl shadow-md hover:bg-blue-200 cursor-pointer transition md:mt-4"
                  onClick={() => navigate("/register")}
                >
                  <h1 className="text-lg font-bold">Get Started</h1>
                  <Send size={20} className="ml-2 text-blue-500" />
                </div>
              )}
              <div className="w-40 h-40 flex justify-center items-center mt-4 md:mt-30">
                <h1 className="text-6xl font-bold text-blue-500">EVENTS</h1>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* EVENTS SLIDER SECTION */}
      <section className="py-6 md:py-10 overflow-hidden relative">
        <motion.div className="flex space-x-6 w-max" variants={sliderVariants} animate="animate">
          {/* Duplicate events for smooth looping */}
          {[...events, ...events].map((event, index) => (
            <motion.div
              key={index}
              className="w-48 h-32 md:w-60 md:h-40 bg-cover bg-center rounded-lg flex items-center justify-center text-base md:text-lg font-semibold text-white cursor-pointer relative shadow-lg"
              style={{ backgroundImage: `url(${event.image})` }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />
              <span className="relative z-10">{event.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  )
}

export default Home

