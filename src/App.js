import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { COUNTRY_CODES } from "./countryCodes";

import {
  Car,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Fuel,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

/* --- MOCK DATA --- */

const CAR_DATA = [
  {
    id: 1,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    category: "SUV",
    price: 50,
    image: "hyundai-tucson.jpg",
    transmission: "Automatic",
    fuel: "Benzine",
    seats: 5,
    rating: 4.9,
    features: ["GPS Navigation", "Heated Seats", "Bluetooth", "Premium Audio"],
    description:
      "Experience the thrill of korean engineering. The 911 Carrera combines power with timeless design.",
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    brand: "Toyota",
    category: "SUV",
    price: 50,
    image: "TF.avif",
    transmission: "Automatic",
    fuel: "Benzine",
    seats: 5,
    rating: 4.9,
    features: ["4x4 Drive", "Leather Seats", "JBL Audio", "360 Camera"],
    description:
      "Built for the tough terrain without compromising on luxury. The Fortuner commands respect on any road.",
  },
  {
    id: 3,
    name: "Hyundai Creta",
    brand: "Hyundai",
    category: "SUV",
    price: 50,
    image: "OIP.webp",
    transmission: "Automatic",
    fuel: "Benzine",
    seats: 5,
    rating: 4.9,
    features: ["Autopilot", "Long Range", "Supercharging", "Glass Roof"],
    description:
      "Silence meets speed. The Model S Plaid offers futuristic tech and incredible acceleration.",
  },
  {
    id: 4,
    name: "Hyundai Accent.jpg",
    brand: "Hyundai",
    category: "Sedan",
    price: 40,
    image: "accent.jpg",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 4,
    rating: 4.8,
    features: [
      "Sport Mode",
      "Carbon Fiber Trim",
      "Apple CarPlay",
      "360 Camera",
    ],
    description:
      "A precision driving machine. Aggressive styling matches its track-ready performance.",
  },
  {
    id: 5,
    name: "Range Rover Autobiography",
    brand: "Land Rover",
    category: "SUV",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    rating: 4.9,
    features: [
      "Massage Seats",
      "Fridge",
      "Rear Entertainment",
      "Air Suspension",
    ],
    description:
      "British luxury at its finest. Perfect for business trips or family vacations in style.",
  },
  {
    id: 6,
    name: "MG5 Hybrid",
    brand: "MG",
    category: "Sedan",
    price: 40,
    image: "mg5.png",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    rating: 4.9,
    features: [
      "Executive Seating",
      "Bang & Olufsen Sound",
      "Night Vision",
      "Soft Close Doors",
    ],
    description:
      "Understated elegance. The A8 L provides a whisper-quiet ride and cutting-edge technology.",
  },
];

const SERVICES = [
  {
    icon: Shield,
    title: "Fully Insured",
    desc: "Every rental comes with comprehensive insurance coverage for peace of mind.",
  },
  {
    icon: Users,
    title: "Chauffeur Service",
    desc: "Sit back and relax. We can drive you from any pick-up point to your destination in total comfort.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    desc: "Roadside assistance and concierge support available any time of day.",
  },
  {
    icon: MapPin,
    title: "Premium Delivery",
    desc: "We deliver the car to your doorstep, airport, or hotel.",
  },
];

/* --- COMPONENTS --- */

const Navbar = ({ onNavClick, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onNavClick("home")}
        >
          <img
            src="/icon123.png"
            alt="Rakain Logo"
            className="h-10 w-10 mr-2 rounded-lg object-cover"
          />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            Rakain<span className="text-blue-600">CarRental</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {["Home", "Fleet", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => onNavClick(item.toLowerCase())}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => onNavClick("contact")}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Inquire Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Nav */}
    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-t">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {["Home", "Fleet", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                onNavClick(item.toLowerCase());
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);

const Hero = ({ onExplore }) => (
  <div className="relative pt-20 h-screen min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
    <div className="absolute inset-0 z-0">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
        alt="Luxury Car Background"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Drive the <br />
          <span className="text-blue-500">Extraordinary</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 font-light">
          Premium car rentals for those who appreciate excellence. Choose from
          our exclusive fleet of SUV, Sedan vehicles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onExplore}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            View Fleet <ChevronRight className="h-5 w-5" />
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
            How it Works
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FilterBar = ({ activeCategory, categories, onSelectCategory }) => (
  <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelectCategory(cat)}
        className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
          activeCategory === cat
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

const CarCard = ({ car, onClick }) => (
  <div
    onClick={() => onClick(car)}
    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider">
        {car.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-blue-600 font-semibold mb-1">
            {car.brand}
          </p>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {car.name}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">${car.price}</span>
          <span className="text-sm text-gray-500">/day</span>
        </div>
      </div>

      <div className="flex items-center space-x-1 text-amber-400 text-sm mb-4">
        <Star className="h-4 w-4 fill-current" />
        <span className="font-medium text-gray-700">{car.rating}</span>
        <span className="text-gray-400">(24 reviews)</span>
      </div>

      <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 mt-auto">
        <div className="flex flex-col items-center text-center">
          <Settings className="h-5 w-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-500">{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center text-center border-l border-r border-gray-100">
          <Users className="h-5 w-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-500">{car.seats} Seats</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Fuel className="h-5 w-5 text-gray-400 mb-1" />
          <span className="text-xs text-gray-500">{car.fuel}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-gray-50 text-blue-600 py-3 rounded-xl font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
        View Details
      </button>
    </div>
  </div>
);

const CarModal = ({ car, onClose, onInquire }) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-900" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-full bg-gray-100 relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6">
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                {car.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">
                {car.name}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${car.price}
                  <span className="text-sm font-normal text-gray-500">
                    /day
                  </span>
                </span>
                <span className="flex items-center text-amber-400 text-sm font-medium">
                  <Star className="h-4 w-4 fill-current mr-1" /> {car.rating}{" "}
                  Rating
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {car.description}
            </p>

            <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {car.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <button
                onClick={() => onInquire(car)}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Request Availability
              </button>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  No payment required instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN APP --- */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+968");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      firstName,
      lastName,
      phone: `${countryCode} ${phone}`,
      vehicle,
      message,
    };

    emailjs
      .send(
        "service_y3ex0e6", // e.g. service_awvcw0s
        "template_fz2aumx", // e.g. template_abcd123
        templateParams,
        "C2KhU4seUfpQtRGue" // e.g. i7HjfX2jA9BlaB_3d
      )
      .then(() => {
        alert("Thank you! Your inquiry has been sent.");
        setFirstName("");
        setLastName("");
        setVehicle("");
        setMessage("");
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const categories = ["All", "Sports", "SUV", "Luxury", "Electric", "Sedan"];

  const filteredCars = CAR_DATA.filter((car) => {
    const matchesCategory =
      activeCategory === "All" || car.category === activeCategory;
    const matchesSearch = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (section) => {
    if (section === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else scrollToSection(section);
  };

  const handleInquire = (car) => {
    setSelectedCar(null); // Close modal
    scrollToSection("contact");
    // In a real app, we might pre-fill the form state here
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar
        onNavClick={handleNavClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Hero onExplore={() => scrollToSection("fleet")} />

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Rakain?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide more than just a car. We provide a premium experience
              tailored to your specific needs.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Fleet
              </h2>
              <p className="text-gray-500 text-lg">
                Choose from our diverse collection of premium vehicles.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-6 md:mt-0 relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <FilterBar
            activeCategory={activeCategory}
            categories={categories}
            onSelectCategory={setActiveCategory}
          />

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} onClick={setSelectedCar} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                No vehicles found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-10 md:p-16 md:w-1/2 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to hit the road?
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Contact our concierge team to reserve your vehicle or ask any
                questions about our services. We are available 24/7.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Call Us</p>
                    <p className="font-bold text-xl">+968 9471 1711</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Email Us</p>
                    <p className="font-bold text-xl">
                      rakain.company@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Visit HQ</p>
                    <p className="font-bold text-xl">
                      Hilton Garden Inn Muscat Al Khuwair, Oman
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-gray-50 p-10 md:p-16">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send a Message
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      {}
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-28 px-2 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      {/* Phone number */}
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interested Vehicle
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  >
                    <option value="">Select a car...</option>
                    {CAR_DATA.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  />
                </div>

                <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src="/icon123.png"
                  alt="Rakain Car Rental Logo"
                  className="h-10 w-10 mr-2 object-contain"
                />
                <span className="text-2xl font-bold">
                  Rakain<span className="text-blue-500">CarRental</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Premium car rental services for those who refuse to compromise
                on quality, comfort, and style.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("fleet")}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Fleet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2025 Rakain Agency. All rights reserved. This is a viewer website.
          </div>
        </div>
      </footer>

      {/* Detail Modal Overlay */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onInquire={handleInquire}
        />
      )}
    </div>
  );
}
