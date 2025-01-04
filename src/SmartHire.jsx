import React, { useEffect, useRef, useState } from "react";
import Logo from "./assets/logo.png";
import down from "./assets/down.png";
import whatsapp from "./assets/whatsapp.png";
import messenger from "./assets/messenger.png";
import { useNavigate } from 'react-router-dom';



function SmartHire() {
  const [active ,setActive] =useState(false)
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const logoutRef = useRef(null)
  const navigate = useNavigate();


  const item = [
    {
      img: "https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg",
      name: "Smart Hire1",
      logoimg: Logo,
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fugit perferendis autem quisquam, facere veniam.",
      second: "5m",
      fontAwesome: <i class="fa-solid fa-check"></i>,
    },
    {
      img: "https://www.alpha.gr/-/media/AlphaGr/Images/myAlpha-idioton-neo/Banking-from-home/myalpha-web/tiles-new/eksipni-apotamieusi_480x526.png?h=1052&iar=0&w=960&hash=F6805EEFF2D187BAACDBE567A37817D1",
      name: "Smart Hire2",
      logoimg: whatsapp,
      second: "1h54m",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fugit perferendis autem quisquam, facere veniam.",
      fontAwesome: <i class="fa-solid fa-check-double"></i>,
    },
    {
      img: "https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg",
      name: "Smart Hire3",
      logoimg: messenger,
      second: "6h35m",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fugit perferendis autem quisquam, facere veniam.",
      fontAwesome: <i class="fa-solid fa-check-double"></i>,
    },
  ];

  
  useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch user data
          const response = await fetch("https://smart-hire-backend.vercel.app/api/smarthireUserget", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
            },
            credentials: "include", 
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
  
          const data = await response.json();
          setUserData(data.user); 
        } catch (err) {
          console.error("Error:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); 


  const barsClick =()=>{
    setActive(true)
  }
  const closebars =()=>{
    setActive(false)
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const SettingBtn =()=>{
    logoutRef.current.classList.toggle("active");
  }
  const Logout   =()=>{
    localStorage.removeItem("accessToken");
    navigate("/")
  }
  const updateAccount =()=>{
    navigate("/updateAccount")
  }
  return (
    <div>
      <div className="three">
        <div className="three__item">
          <div className="box1">
            <div className="topdetails">
              <div className="logo-img-name">
                <i class="fa-solid fa-arrow-left-long"></i>
                <div className="logoimg">
                  <img src={Logo} alt="" id="img-logo" />
                  <div className="logo">
                    <p>Smart hire</p>
                    <p>InBox</p>
                  </div>
                </div>
                <div className="plus-search">
                  <i class="fa-solid fa-magnifying-glass" id="glass"></i>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div className="topdetails1">
                <div className="message">Message</div>
                <div className="seeting">Segment</div>
              </div>
              <div className="allPerson">
                <div className="user-details">
                  <i class="fa-solid fa-users"></i>
                  <p className="allUser">All</p>
                  <p className="number-green">232</p>
                  <img src={down} alt="" id="down" />
                </div>
                <div className="oldest">
                  <i class="fa-solid fa-filter"></i>
                  <p className="odlest-para">Oldest</p>
                  <img src={down} alt="" id="down" />
                </div>
              </div>

              <div className="comment">
                {item.map((item, index) => {
                  return (
                    <div key={index} className="comment-map">
                      <div className="para-user">
                        <div className="comment-item">
                          <img src={item.img} alt="" id="person-img" />
                          <p className="name-para">{item.name}</p>
                          <img src={item.logoimg} alt="" id="messageType" />
                        </div>
                        <p className="item-para">{item.para}</p>
                      </div>
                      <div className="min">
                        <div className="dot-flex">
                          <div className="dot"></div>
                          <div className="sencond">{item.second}</div>
                        </div>
                        <p
                          className="check"
                          style={
                            index === 1
                              ? { color: "rgb(39, 245, 3)" }
                              : index === 2
                              ? { color: "rgb(172, 172, 172)" }
                              : {}
                          }
                        >
                          {item.fontAwesome}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="box2">
            <div className="message-flex">
              <div className="messengerName">
                <div className="imgbox2">
                  <img
                    src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                    alt=""
                    id="imgbox2"
                  />
                </div>
                <div className="name-gamil">
                <p className="box2Name">{userData?.name || "User not found"}</p>

                <p className="box2gmail">{userData?.email || "Email not available"}</p>
                </div>
              </div>

              <div className="icons-logo">
                <div className="messenger-down">
                  <img src={messenger} alt="" id="boxmessenger-img" />
                  <img src={down} alt="" id="boxDown-img" />
                </div>
                <div className="check-logoThreeDot">
                  <p className="box2-check">
                    {" "}
                    <i class="fa-solid fa-check"></i>
                  </p>
                  <p className="threeDot">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </p>
                  <img
                    src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                    alt=""
                    className="imgbox2 hide-img"
                  />
                  <img src={down} alt="" id="boxDown-img" />
                  <button className="bars" onClick={barsClick}>
                    <i class="fa-solid fa-bars-staggered"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mid-box">
              <div className="padding">
                <div className="messengerName">
                  <div className="imgbox2">
                    <img
                      src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                      alt=""
                      id="imgbox2"
                    />
                  </div>
                  <div className="name-gamil">
                    <p className="box2Name">{userData?.name || "User not found"}</p>
                    <p className="box2gmail">{userData?.email || "Email not available"}</p>
                  </div>
                </div>
                <p className="mid-box-message">
                  Certified developer creating efficient web applications
                  delivering experiences.<span>@ amarjeet sharma</span>
                </p>
              </div>
            </div>

            <div className="mid-bottom">
              <div className="padding2">
                <div className="today">
                  <p className="today-text">Today</p>
                </div>
                <div className="mid-bottom-message">
                  <div className="mid-bottom-img">
                    <img
                      src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                      alt=""
                      id="imgbox2Mid"
                    />
                  </div>
                  <div className="message-para">
                    <p className="message-para-1">
                      I specialize in the MERN stack (MongoDB, Express, React,
                      Node.js), allowing me to build full-fledged applications
                      from the ground up.
                    </p>

                    <div className="response-detcted">
                      <img src={Logo} alt="" id="response-img" />
                      <p className="response-detcted-text">Response detected</p>
                      <div className="cancel-select">
                        <button className="cancel">Cancel</button>
                        <button className="seleted">Select</button>
                      </div>
                    </div>
                  </div>
                  <div className="mid-boxmessenger">
                    <img src={messenger} alt="" id="mid-bottom-img" />
                  </div>
                </div>
                <div className="time">5:39pm</div>

                <div className="mid-bottomResponse">
                  <div className="respose-para">
                    <p>
                      You have good skills. I am giving you a task to create a
                      messenger UI, and you need to submit it{" "}
                      <span>within 5 days.</span>
                    </p>
                  </div>
                  <div className="owner">
                    <img
                      src="https://www.alpha.gr/-/media/AlphaGr/Images/myAlpha-idioton-neo/Banking-from-home/myalpha-web/tiles-new/eksipni-apotamieusi_480x526.png?h=1052&iar=0&w=960&hash=F6805EEFF2D187BAACDBE567A37817D1"
                      alt=""
                      id="owner"
                    />
                  </div>
                <div className="time2">6:00 pm</div>
                </div>

                <div className="chat-input">
                  <div className="input">
                    <input type="text" placeholder="Message" id="input-text" />
                  </div>
                  <div className="smile">
                    <div className="message-svg">
                      <i class="fa-regular fa-face-smile"></i>
                      <i class="fa-regular fa-address-book" id="book"></i>
                      <i class="fa-regular fa-image"></i>
                    </div>
                    <div className="send">
                    <p> <i class="fa-brands fa-telegram" id="send"></i></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`box3 ${active ? 'active' : ""}`}>
            <div className="seeting-icon" onClick={SettingBtn}>⚙️</div>
            <div className="setting-detials" ref={logoutRef}>
              <div className="setting-name" onClick={updateAccount}>Update Account</div>
              <div className="setting-name" onClick={Logout}>Logout</div>
            </div>
            <button className="close" onClick={closebars}><i class="fa-solid fa-x"></i></button>
            <div className="prosonal-details">
              <div className="personal-logo">
                <div className="centerthird-box">
                <img src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg" alt="" id="Logo" />
                <p className="box2Name-1">{userData?.name || "User not found"}</p>
                <p className="box-3State">6:00pm in Delhi India </p>
                </div>
              </div>

              <div className="class-video">
                <div className="call same">
                <i class="fa-solid fa-phone" id="thir-box-personal"></i>
                  <p className="class-video-call" >Call</p>
                </div>
                <div className="video same">
                  <i class="fa-solid fa-video" id="thir-box-personal"></i>
                  <p className="class-video-call">Video</p>
                </div>
                <div className="threeDot1 same">
                <i class="fa-solid fa-ellipsis" id="thir-box-personal"></i>
                  <p className="class-video-call">More</p>
                </div>

              </div>
              
              <div className="revenue">
                <div className="revenue-doller">
                  <div className="doller-sign">
                  <p className="doller-sign-para"><i class="fa-solid fa-dollar-sign"></i>Revenue</p>
                  <p className="money">$ 3,552</p>
                  <p className="other">3 other</p>
                  </div>
                </div>
                <div className="visit">
                  <p className="eyes"><i class="fa-solid fa-eye"></i>Web visit</p>
                  <p>42</p>
                  <p>Link clicks</p>
                </div>
              </div>

              <div className="user-clock">
                <div className=" one">
                  <p><i class="fa-regular fa-user"></i></p>
                </div>
                <div className="one-user">
                  <p><i class="fa-solid fa-box-archive"></i></p>
                </div>
                <div className="one-user">
                  <p><i class="fa-solid fa-clock"></i></p>
                </div>
              </div>

              <div className="information">
                <div className="last-one">
                  <ul>
                    <li className="top-space"><img src={down} alt="" id="information-down" />Infomation</li>
                    <li><i class="fa-brands fa-elementor"></i>Segement</li>
                    <li><i class="fa-solid fa-envelope"></i>Email</li>
                    <li><i class="fa-solid fa-phone"></i>Phone</li>
                    <li><i class="fa-solid fa-clock"></i>last visited</li>

                  </ul>
                </div>
                <div className="last-one two">
                  <ul>
                    <li className="top-space"><i class="fa-solid fa-plus"></i>Add</li>
                    <li><i class="fa-solid fa-cart-shopping"></i> Abandoned cart</li>
                    <li>{userData?.email || "Email not available"}</li>
                    <li>{userData?.phone || "Email not available"}</li>
                    <li>6 aug 2022</li>
                  </ul>
                </div>
               
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartHire;


