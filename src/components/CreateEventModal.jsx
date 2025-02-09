import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { format } from "date-fns";
import { addEvents } from "../services/postEvent.js";

const CreateEventModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    category: "Music",
    attendeeCount: 0,
    bannerImage: "",
    status: "upcoming",
    location: "",
    creator: localStorage.getItem("userId"),
  });

  const [bannerPreview, setBannerPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Music",
    "Sports",
    "Conference",
    "Exhibition",
    "Workshop",
    "Other",
  ];

  const statusOptions = ["upcoming", "ongoing", "completed", "cancelled"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date and time are required";
    if (!formData.bannerImage)
      newErrors.bannerImage = "Banner image is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const submissionData = {
          ...formData,
          attendeeCount: Number(formData.attendeeCount),
        };
        await addEvents(submissionData);
        setFormData({
          name: "",
          description: "",
          date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
          category: "Music",
          attendeeCount: 0,
          bannerImage: "",
          status: "upcoming",
          location: "",
          creator: localStorage.getItem("userId"),
        });
        setBannerPreview("");
        onClose();
      } catch (error) {
        console.error("Failed to submit event:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to create event. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "bannerImage" && type === "url") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setBannerPreview(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          bannerImage: "File size should be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        bannerImage: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      bannerImage: "",
    }));
    setBannerPreview("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={onClose}
                className="absolute right-2 top-2 sm:right-4 sm:top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pr-8">
                Create New Event
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter event name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Describe your event"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Date & Category */}
                <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                        errors.date ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event location or online link"
                  />
                </div>

                {/* Attendee Count & Status */}
                <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attendee Count
                    </label>
                    <input
                      type="number"
                      name="attendeeCount"
                      value={formData.attendeeCount}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Banner Image *
                  </label>

                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 items-start sm:items-center relative">
                    <input
                      type="url"
                      name="bannerImage"
                      value={
                        typeof formData.bannerImage === "string"
                          ? formData.bannerImage
                          : ""
                      }
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${
                        errors.bannerImage
                          ? "border-red-500"
                          : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter image URL"
                    />

                    {!bannerPreview && !formData.bannerImage && (
                      <label
                        htmlFor="upload-banner"
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors space-x-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5V19.5A2.5 2.5 0 005.5 22h13a2.5 2.5 0 002.5-2.5v-3m-15-5.5L12 3m0 0l6 8m-6-8v12"
                          />
                        </svg>
                        <span>Upload</span>
                      </label>
                    )}

                    <input
                      type="file"
                      id="upload-banner"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {bannerPreview && (
                    <div className="mt-4 relative">
                      <img
                        src={bannerPreview}
                        alt="Event Banner Preview"
                        className="w-full rounded-lg shadow-lg max-h-48 object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {errors.bannerImage && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bannerImage}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm">{errors.submit}</p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateEventModal;
