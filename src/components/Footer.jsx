import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold">EventEase</h1>
          <p className="mt-2 text-gray-300">
            Plan, Manage, and Experience events effortlessly. From small meetups to large-scale conferences, we've got you covered!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/events" className="hover:text-gray-300">Events</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="flex items-center gap-2"><Mail size={18} /> sujayraw13@gmail.com</p>
          <p className="flex items-center gap-2 mt-1"><Phone size={18} /> 8252007918</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300"><Facebook size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Twitter size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Instagram size={24} /></a>
            <a href="#" className="hover:text-gray-300"><Linkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-400">
        © {new Date().getFullYear()} EventEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
