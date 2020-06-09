// url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716'
import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=77b97e84c25f9955b254ccbee13838f9`
      )
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);
  console.log(results);
  return (
    <div>
      <input type="text" onChange={handleChange} value={searchTerm} />
      {results
        .filter((result) =>
          result.original_title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((result) => (
          <li key={result.id}>{result.original_title}</li>
        ))}
    </div>
  );
};

export default Filter;
