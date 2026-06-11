import { useState } from "react";

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    zodiac: "",
    profession: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
      />

      <select
        name="zodiac"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
      >
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

      <select
        name="profession"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
      >
        <option value="">Select Profession</option>
        <option>Student</option>
        <option>Software Engineer</option>
        <option>Teacher</option>
        <option>Business Owner</option>
      </select>

      <select
        name="goal"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
      >
        <option value="">Select Goal</option>
        <option>Career Growth</option>
        <option>Education</option>
        <option>Health</option>
        <option>Wealth</option>
        <option>Confidence</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
      >
        Get Recommendation
      </button>
    </form>
  );
}

export default UserForm;