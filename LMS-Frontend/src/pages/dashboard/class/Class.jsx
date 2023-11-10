import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./section.css";

export default function Section() {

  //get data from url
  let { sectionId } = useParams();
  console.log(sectionId)
  
  return (
    <div className="section">
      <div className="sectionTitleContainer">
        <h1 className="sectionTitle">Edit Section</h1>
        <Link to="/newSection">
          <button className="sectionAddButton">Create</button>
        </Link>
      </div>
      <div className="sectionContainer">
        <div className="sectionShow">
          <div className="sectionShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="sectionShowImg"
            />
            <div className="sectionShowTopTitle">
              <span className="sectionShowSectionname">Anna Becker</span>
              <span className="sectionShowSectionTitle">Software Engineer</span>
            </div>
          </div>
          <div className="sectionShowBottom">
            <span className="sectionShowTitle">Account Details</span>
            <div className="sectionShowInfo">
              <PermIdentity className="sectionShowIcon" />
              <span className="sectionShowInfoTitle">annabeck99</span>
            </div>
            <div className="sectionShowInfo">
              <CalendarToday className="sectionShowIcon" />
              <span className="sectionShowInfoTitle">10.12.1999</span>
            </div>
            <span className="sectionShowTitle">Contact Details</span>
            <div className="sectionShowInfo">
              <PhoneAndroid className="sectionShowIcon" />
              <span className="sectionShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="sectionShowInfo">
              <MailOutline className="sectionShowIcon" />
              <span className="sectionShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="sectionShowInfo">
              <LocationSearching className="sectionShowIcon" />
              <span className="sectionShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="sectionUpdate">
          <span className="sectionUpdateTitle">Edit</span>
          <form className="sectionUpdateForm">
            <div className="sectionUpdateLeft">
              <div className="sectionUpdateItem">
                <label>Section Name</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="sectionUpdateInput"
                />
              </div>
              <div className="sectionUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="sectionUpdateInput"
                />
              </div>
              <div className="sectionUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="sectionUpdateInput"
                />
              </div>
              <div className="sectionUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="sectionUpdateInput"
                />
              </div>
              <div className="sectionUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="sectionUpdateInput"
                />
              </div>
            </div>
            <div className="sectionUpdateRight">
              <div className="sectionUpdateUpload">
                <img
                  className="sectionUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="sectionUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="sectionUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
