import "./Components.css/Footer.css";

/**
 * Footer component displaying copyright information and project creator details.
 *
 * @returns {JSX.Element} - A React component representing the Footer section.
 */
export default function Footer() {
  return (
    <div className="footer">
      {/* Copyright information for the project */}
      <h4>@2023 RC Studio Capstone project</h4>
      {/* Logo image */}
      <img src="/rcstudiologo.jpg" alt="Logo" />
      {/* Information about the project creator */}
      <h5>Created By Renier Coetzer</h5>
    </div>
  );
}
