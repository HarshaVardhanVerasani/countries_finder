import React, { useEffect, useRef } from "react";
import { SiGooglemaps } from "react-icons/si";
import NO_SRC from "../../Images/No_coat_of_arms.png";
import MAPS_LOGO from "../../Images/maps_logo.png";
function Modal({ data }) {
  const obj = data.currencies;
  const { name, symbol } = destructuringCurrencyObj(obj);
  function destructuringCurrencyObj(obj) {
    for (let key in obj) {
      return obj[key];
    }
  }

  const ref = useRef();
  useEffect(() => {
    setTimeout(ref.current.click(), 1000);
  }, [data]);

  console.log(data);
  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#countryDetails"
        style={{ visibility: "hidden" }}
      ></button>
      <div
        className="modal fade"
        id="countryDetails"
        tabIndex="-1"
        aria-labelledby="countryDetailsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header gap-2">
              <h1 className="modal-title fs-3" id="countryDetailsLabel">
                {data.name?.common}
              </h1>
              <img
                src={data.coatOfArms.png ? data.coatOfArms.png : NO_SRC}
                alt="coat of arms"
                className="img-fluid"
                width={35}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body overflow-auto">
              <div className="text-end">
                {data.unMember && (
                  <p className="badge m-0 rounded-pill bg-info text-end text-capitalize">
                    Member In UN
                  </p>
                )}
              </div>

              <p className="text-capitalize">
                <span className="badge text-dark bg-warning opacity-75">
                  Official Name:
                </span>
                <span className="badge fs-6 opacity-75 text-dark">
                  {data.name.official}
                </span>
              </p>

              <p className="text-capitalize d-flex align-items-center">
                <span className="badge text-dark opacity-75 bg-warning">
                  Currency:
                </span>
                <span className="badge fs-6 opacity-75 text-dark">{name}</span>
                <span className="badge bg-info text-dark" type="button">
                  {symbol}
                </span>
              </p>

              <p className="text-capitalize">
                <span className="badge text-dark opacity-75 bg-warning">
                  Capital City :
                </span>
                <span className="badge fs-6 opacity-75 text-dark">
                  {data.capital[0]}
                </span>
              </p>
              <p className="text-capitalize">
                <span className="badge text-dark opacity-75 bg-warning">
                  Regional Languages :
                </span>
                {Object.values(data.languages).map((item) => (
                  <span className="badge text-dark" key={item}>
                    {item}
                  </span>
                ))}
              </p>
              <p className="text-capitalize">
                <span className="badge text-dark opacity-75 bg-warning">
                  population :
                </span>
                <span className="badge fs-6 opacity-75 text-dark">
                  {data.population}
                </span>
              </p>
              <p className="text-capitalize">
                <span className="badge text-dark opacity-75 bg-warning">
                  Region :
                </span>
                <span className="badge fs-6 opacity-75 text-dark">
                  {data.region}
                </span>
              </p>
              <p className="text-capitalize">
                <span className="badge text-dark opacity-75 bg-warning">
                  Google Maps :
                </span>
                <a
                  href={data.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="ms-1  rounded-5 p-1"
                >
                  <img src={MAPS_LOGO} alt="googl maps location" width={40}/>
                </a>
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
