import React from "react";

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h3 className="text-xl font-bold mb-4">FunChat</h3>
                    <div className="flex justify-center space-x-6 mb-4">
                        <a href="#" className="hover:text-green-400">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-green-400">
                            Terms
                        </a>
                        <a href="#" className="hover:text-green-400">
                            Contact
                        </a>
                    </div>
                    <p className="text-gray-400">© 2025 FunChat. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
