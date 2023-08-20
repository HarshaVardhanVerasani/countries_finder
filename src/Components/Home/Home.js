import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_COUNTRIES, GET_COUNTRY } from "../../apis/apis";
import Modal from "../Modal/Modal";
import "./Home.css";
function Home() {
  const [countries, setCountries] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [singleCountry, setSingleCountry] = useState([]);

  //runs only on component mount
  useEffect(() => {
    const fetchingCountries = async () => {
      try {
        const { data } = await axios.get(`${GET_COUNTRIES}`);
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingCountries();
  }, []);

  //Filtering algo
  const search = (e) => {
    setIsSearching(true);
    setSearchTxt(e.target.value.toLowerCase());

    // eslint-disable-next-line array-callback-return
    let result = countries.filter((item) => {
      if (item.name.common.toLowerCase().includes(searchTxt)) {
        return item;
      }
      if (item.name.official.toLowerCase().includes(searchTxt)) {
        return item;
      }
      if (
        Object.values(item.languages)
          .map((item) => item.toLowerCase())
          .some((lan) => lan.includes(searchTxt))
      ) {
        return item;
      }
    });

    setTimeout(() => {
      setSearchValues(result);
      setIsSearching(false);
    }, 500);
  };

  //getting total information of single country when user clicks on particular country
  const handleCountry = (e, value) => {
    console.log(value);
    e.stopPropagation();
    const getSingleCountry = async () => {
      try {
        const { data } = await axios.get(`${GET_COUNTRY}${value}`);
        setSingleCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCountry();
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col">
          {singleCountry.length ? <Modal data={singleCountry[0]} /> : null}
        </div>
      </div>
      <div className="row">
        <div className="col">
        
          <div className="search-bar">
            <input
              type="text"
              className="search"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={search}
            />
            {(isSearching || !countries.length) && (
              <div
                className="spinner-border spinner-border-sm pe-2 text-danger"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {!searchValues.length && searchTxt && (
              <span className="badge text-danger">No Results Found</span>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mt-5">
          {(searchValues.length ? searchValues : countries).map((item, idx) => {
            return (
              <div
                className="country d-flex gap-5 flex-column flex-lg-row align-items-center"
                key={idx}
                onClick={(e) => handleCountry(e, item.name.common)}
              >
                <span className="align-self-start align-self-sm-center">
                  {" "}
                  {idx + 1}
                </span>
                <img
                  src={item.flags.png}
                  alt={item.flags.alt}
                  width={200}
                  style={{ borderRadius: "0.5rem", aspectRatio: 1 / 0.6 }}
                />
                <div className="country_info">
                  <h2 className="mb-0">
                    <span className="fs-4 opacity-75">Common Name : </span>
                    <span className="text-primary fs-4">
                      {item.name.common}
                    </span>
                  </h2>
                  <h3>
                    <span className="fs-4 opacity-75">Official Name : </span>
                    <span className="text-success fs-4">
                      {item.name.official}
                    </span>
                  </h3>

                  <div>
                    <span className="fs-6">Languages :</span>
                    {Object.values(item.languages).map((item) => (
                      <span key={item} className="badge text-dark bg-info m-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
