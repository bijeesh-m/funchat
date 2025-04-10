import React from "react";

const Header = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="bg-white shadow-lg p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-600">FunChat</h1>
                    <div className="space-x-4">
                        <button className="text-gray-600 hover:text-green-600">Features</button>
                        <button className="text-gray-600 hover:text-green-600">About</button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Download Now
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
