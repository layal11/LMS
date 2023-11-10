import { useEffect, useState } from "react";
import "./featuredInfo.css";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { URL } from "../../../components/URL";


export default function FeaturedInfo() {
  const [data, setData] = useState({
    Class: 0,
    Section: 0,
    Student: 0,
  });

  const getCountAll = () => {
    fetch(URL + "/count-all")
      .then((res) => res.json())
      .catch((error) => console.log("Fetch error"))
      .then(
        (result) => {
          if (result && result.Data) {
            setData(result.Data);
            // console.log("hello" +result.Data);
          }
        },
        (error) => {}
      )
      .catch((error) => {});
  };
  useEffect(() => {
      try {
        getCountAll();
      } catch (e) {}
    
  },[]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Students</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.Student}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Classes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.Class}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sections</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.Section}</span>
        </div>
      </div>
    </div>
  );
}
