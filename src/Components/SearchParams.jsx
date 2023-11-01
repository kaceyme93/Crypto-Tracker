import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchParams.css";

const SearchParams = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/coin/${name.toLowerCase()}`);
        }}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          value={name}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchParams;
