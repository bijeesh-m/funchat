// LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto pt-24 pb-24 px-4  flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Connect with FunChat</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Experience seamless messaging with your friends and family. Fast, secure, and fun - just like
                        WhatsApp but with a twist!
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Link to={'/login'}>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                                Get Started
                            </button>
                        </Link>
                        <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <video
                        src="https://res.cloudinary.com/dunf6rko6/video/upload/v1744193384/Screen_Recording_2025-04-09_152612_arnttf.mp4"
                        className="rounded-lg shadow-xl"
                        controls
                        autoPlay
                        muted
                    ></video>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose FunChat?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="text-green-600 text-4xl mb-4">⚡</div>
                            <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                            <p className="text-gray-600">Instant message delivery with no delays</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-green-600 text-4xl mb-4">🔒</div>
                            <h4 className="text-xl font-semibold mb-2">Secure Chats</h4>
                            <p className="text-gray-600">End-to-end encryption for your privacy</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-green-600 text-4xl mb-4">🎉</div>
                            <h4 className="text-xl font-semibold mb-2">Fun Features</h4>
                            <p className="text-gray-600">Stickers, GIFs, and more to spice up chats</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
