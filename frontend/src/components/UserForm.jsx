import { useState } from "react";

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    zodiac: "",
    profession: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
      />

      <select name="zodiac" onChange={handleChange}>
        <option value="">Select Zodiac Sign</option>
        <option>Aries</option>
        <option>Taurus</option>
        <option>Gemini</option>
        <option>Cancer</option>
        <option>Leo</option>
        <option>Virgo</option>
        <option>Libra</option>
        <option>Scorpio</option>
        <option>Sagittarius</option>
        <option>Capricorn</option>
        <option>Aquarius</option>
        <option>Pisces</option>
      </select>

      <select name="profession" onChange={handleChange}>
        <option value="">Select Profession</option>
        <option>Student</option>
        <option>Software Engineer</option>
        <option>Teacher</option>
        <option>Business Owner</option>
      </select>

      <select name="goal" onChange={handleChange}>
        <option value="">Select Goal</option>
        <option>Career Growth</option>
        <option>Education</option>
        <option>Health</option>
        <option>Wealth</option>
        <option>Confidence</option>
      </select>

      <button type="submit">Get Recommendation</button>

    </form>
  );
}

export default UserForm;