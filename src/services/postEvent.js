import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_API+"/api"||"http://localhost:5000/api";
console.log(SERVER_URL)
export const addEvents = async (eventData) => {
  try {
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("category", eventData.category);
    formData.append("attendeeCount", eventData.attendeeCount);
    formData.append("status", eventData.status);
    formData.append("location",eventData.location);
    formData.append("creator",eventData.creator);

    // Handle image upload
    if (eventData.bannerImage) {
      // If it's a File object (from file input)
      if (eventData.bannerImage instanceof File) {
        formData.append("bannerImage", eventData.bannerImage);
      } 
      // If it's a base64 string (from FileReader)
      else if (eventData.bannerImage.startsWith('data:image')) {
        // Convert base64 to blob
        const response = await fetch(eventData.bannerImage);
        const blob = await response.blob();
        formData.append("bannerImage", blob, "image.jpg");
      }
      // If it's a URL string
      else if (typeof eventData.bannerImage === "string") {
        formData.append("bannerImage", eventData.bannerImage);
      }
    }

    const response = await axios.post(SERVER_URL+"/postEvent", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding event:", error.response?.data || error.message);
    throw error;
  }
};