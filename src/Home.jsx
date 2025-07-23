import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [result, setResult] = useState([]);

  const fetchWebsiteData = async () => {
    try {
      const id = localStorage.getItem("user_id");
      if (!id) {
        console.warn("User ID not found in localStorage");
        return;
      }

      const response = await axios.post(
        "http://lockify.infinityfreeapp.com/home.php",
        {
          user_id: id,
        }
      );

      console.log("Response:", response.data);
      setResult(response.data.website);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchWebsiteData();
  }, []);

  return (
    <>
      <br />
      <br />
      <a href="/add_website" style={{ float: "right", fontSize: "20px" }}>
        Add Website Information
      </a>
      <br />
      <br />

      {result.length === 0 ? (
        <p
          style={{
            fontSize: "24px",
            color: "darkred",
            height: "200px",
            width: "500px",
            border: "1px solid black",
            textAlign: "center",
            paddingTop: "80px",
            margin: "0 auto",
          }}
        >
          No Record Found
        </p>
      ) : (
        result.map((w) => (
          <div className="hcontent" key={w.web_id}>
            <h3>{w.web_name}</h3>
            <a
              href={`/profile/${w.web_id}/${w.reg_id}`}
              style={{ position: "relative", top: "10px" }}
            >
              View details
            </a>
          </div>
        ))
      )}
    </>
  );
}

export default Home;
