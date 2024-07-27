import React, { useEffect, useState } from "react";
import "./Covid.css";
import Sppiner from "./Sppiner";

function Covid() {
  const [covidData, setCovidData] = useState([]);
  const [filterval, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    $.ajax({
      method: "GET",
      url: "https://restfulcountries.com/api/v1/covid19?",
      headers: {
        Authorization: "Bearer 1304|WkQyMWHLd1OS797YL5ja8ZxB08pUE68iWOLol69K",
      },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
        setLoading(true);
        setCovidData(result.data);
        setSearchApiData(result.data);
        setLoading(false);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }, []);


  const handlefilter = (e) => {
    if (e.target.value === "") {
      setCovidData(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) =>
        item.country_name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filterResult.length > 0) {
        setCovidData(filterResult);
      } else {
        setCovidData([{ country_name: "Reocrd not found" }]);
      }
    }
    setFilterVal(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="container">
        <input
          type="text"
          value={filterval}
          onInput={handlefilter}
          placeholder="search country"
        />

        {loading === true ? (
          <Sppiner />
        ) : (
          covidData.map((covid, id) => {
            const { country_name, last_updated, total_case, total_deaths } =
              covid;
            return (
              <div key={id} className="card">
               
                <div className="card_content">
                  <h2 className="country">{country_name}</h2>
                  <p>last-updated : {new Date(last_updated).toGMTString()}</p>
                  <p>total-case : {total_case}</p>
                  <p>total-deaths : {total_deaths}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </React.Fragment>
  );
}

export default Covid;