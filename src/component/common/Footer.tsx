import  { useState } from "react";
import { IoIosContacts } from "react-icons/io";
import { GrServices } from "react-icons/gr";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import Modal from "../RouterFolder/modal/Modal";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const contactTime = "10:00 AM - 6:00 PM";
  const contactDescription = "Feel free to reach out to us during working hours.";

  return (
    <footer className="z-10 bg-blue-400 fixed bottom-0 w-full text-white text-base">
      {/* Chevron Toggle on Small Screens */}
      <div className="sm:hidden flex items-center justify-center py-2 text-black font-bold  " onClick={() => setShowContent(!showContent)}>
       
       Please click Here for Footer {showContent ? (
          <IoChevronDownOutline className="text-2xl cursor-pointer" />
        ) : (
          <IoChevronUpOutline className="text-2xl cursor-pointer" />
        )}
      </div>

      {/* Footer Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showContent ? "max-h-[500px] py-2" : "max-h-0"
        } sm:max-h-none sm:py-2`}
      >
        <div className="w-full px-5 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
          <a href="/" className="flex items-center gap-2" aria-label="Home">
            Home
          </a>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowModal(true)}
            aria-label="Contact Us"
          >
            <IoIosContacts className="text-base" />
            Contact Us
          </div>

          <a href="/services" className="flex items-center gap-2" aria-label="Service">
            <GrServices className="text-base" />
            Service
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="Facebook"
          >
            <FaFacebook className="text-base" />
            Facebook
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="Instagram"
          >
            <FaSquareInstagram className="text-base" />
            Instagram
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="Twitter"
          >
            <FaTwitter className="text-base" />
            Twitter
          </a>
        </div>
      </div>

      {/* Modal for Contact Info */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Contact Us"
        showCloseButton={true}
      >
        <p className="mb-2">You can reach us at:</p>
        <p className="mb-2">Email: example@email.com</p>
        <p>Phone: +1234567890</p>
        <p className="mt-2 text-sm text-gray-600">Time: {contactTime}</p>
        <p className="text-sm text-gray-600">{contactDescription}</p>
      </Modal>
    </footer>
  );
}
