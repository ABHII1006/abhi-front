import { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./image/logo1.png"; // ✅ Make sure the image exists in src/image/

const indianAirports = [
  // International Airports
  "Indira Gandhi International Airport, Delhi",
  "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
  "Kempegowda International Airport, Bengaluru",
  "Rajiv Gandhi International Airport, Hyderabad",
  "Chennai International Airport",
  "Netaji Subhas Chandra Bose International Airport, Kolkata",
  "Cochin International Airport, Kochi",
  "Sardar Vallabhbhai Patel International Airport, Ahmedabad",
  "Trivandrum International Airport, Thiruvananthapuram",
  "Jay Prakash Narayan International Airport, Patna",
  "Lal Bahadur Shastri International Airport, Varanasi",
  "Lokpriya Gopinath Bordoloi International Airport, Guwahati",
  "Sri Guru Ram Dass Jee International Airport, Amritsar",
  "Dr. Babasaheb Ambedkar International Airport, Nagpur",
  "Biju Patnaik International Airport, Bhubaneswar",
  "Bagdogra International Airport, Bagdogra",
  "Dabolim Airport (Goa International Airport), South Goa",
  "Manohar International Airport (Mopa), North Goa",
  "Veer Savarkar International Airport, Port Blair",
  "Kushinagar International Airport, Kushinagar",
  "Chaudhary Charan Singh International Airport, Lucknow",

  // Major Domestic Airports
  "Jolly Grant Airport, Dehradun",
  "Shamshabad Domestic Terminal, Hyderabad",
  "Surat Airport, Surat",
  "Visakhapatnam Airport, Visakhapatnam",
  "Jammu Airport, Jammu",
  "Gaya Airport, Gaya",
  "Jodhpur Airport, Jodhpur",
  "Vadodara Airport, Vadodara",
  "Bhopal Airport, Bhopal",
  "Ranchi Airport, Ranchi",
  "Raipur Airport, Raipur",
  "Imphal Airport, Imphal",
  "Agartala Airport, Agartala",
  "Indore Airport, Indore",
  "Aurangabad Airport, Aurangabad",
  "Madurai Airport, Madurai",
  "Tirupati Airport, Tirupati",
  "Mysore Airport, Mysuru",
  "Kanpur Airport, Kanpur",
  "Pantnagar Airport, Pantnagar",
  "Tezpur Airport, Tezpur",
  "Shillong Airport, Shillong"
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    employeeCode: "",
    returnTicketPNR: "",
    airportName: "",
    flightTimings: "",
    goodiesReceived: "No",
  });

  const [signatureImage, setSignatureImage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (PNG, JPG, etc.)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://abhi-backend-1rq9.onrender.com/submit-airport-form", {
        ...formData,
        signature: signatureImage,
      });

      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Error sending data to Flask API:", err);
      alert("Submission failed.");
    }
  };

  return (
    <div className="form-wrapper">
      <img src={logo} alt="Logo" className="form-logo" />

      <form onSubmit={handleSubmit} className="form-container">
        <h2>Travel Info Form</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="employeeCode" placeholder="Employee Code" onChange={handleChange} required />
        <input name="returnTicketPNR" placeholder="Return Ticket PNR" onChange={handleChange} required />

        <select name="airportName" onChange={handleChange} required>
          <option value="">Select Airport</option>
          {indianAirports.map((airport, index) => (
            <option key={index} value={airport}>{airport}</option>
          ))}
        </select>

        <input
          type="time"
          name="flightTimings"
          onChange={handleChange}
          required
        />

        <select name="goodiesReceived" onChange={handleChange}>
          <option value="No">Goodies Received?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <div className="signature-section">
          <label>Upload Signature Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {signatureImage && (
            <div style={{ marginTop: "10px" }}>
              <p>Signature Preview:</p>
              <img
                src={signatureImage}
                alt="Signature Preview"
                width={250}
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>

      <footer className="footer">
        <p><strong>Contact Info</strong></p>
        <p>Address: #09, Above Food World, 1st Floor Gandhi Bazar Main Road, Basavanagudi, Bengaluru-560004, Karnataka.</p>
        <p>Phone Number: +91 8048534240</p>
        <p>Email: <a href="mailto:info@r2mi.in">info@r2mi.in</a></p>
      </footer>
    </div>
  );
}

export default App;
