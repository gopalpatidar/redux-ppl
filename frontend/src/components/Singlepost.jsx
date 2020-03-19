import React, { useEffect,useState } from "react";
import axios from "axios";

function Singlepost(props) {
  const [datas, setData] = useState({
    picpath: "/uploads/",
    Postid: props.location.state._id,
    UserName: localStorage.getItem("Email"),
    postArray: [],
    Comments: "",
    likes: props.location.state.likes.length
  });

  const uselikeCommentForm = () => {
    const addComments = e => {
      if (localStorage.getItem("Email")) {
      } else {
        props.history.push("/loginpage");
      }
      e.preventDefault();
      let comments={
        Postid:datas.Postid,
        UserName:datas.UserName,
        Comments:datas.Comments
      }
      if (localStorage.getItem("UserName")) {
        axios
          .post("http://192.168.100.111:9000/comment/auth/comment", comments)
          .then(response => {
            if (response.data) {
              setData(datas=>({...datas, postArray: response.data[0].comments.reverse() }));
              resetData();
            } else {
            }
          })
          .catch(err => {
            alert(err);
            console.log(err);
          });
      } else {
        localStorage.clear();
      }
    };

    const likePost = e => {
      let users = {
        postId: datas.Postid,
        userName: datas.UserName
      };
      axios
        .post("http://192.168.100.111:9000/post/auth/likepost", users)
        .then(response => {
          if (response.data) {
            console.log("likepost", response.data);
            setData(datas=>({ ...datas,likes: response.data.like }));
          } else {
            alert("false");
          }
        })
        .catch(err => {
          alert(err);
          console.log(err);
        });
    };

    const handleChange = e => {
      e.persist();
      setData(datas=>({...datas, [e.target.name]: e.target.value }));
    };
    return {
      likePost,
      addComments,
      handleChange
    };
  };
  const { likePost, addComments,handleChange } = uselikeCommentForm();
  const resetData = () => {
    document.getElementById("coment").reset();
  };
  useEffect(()=>{
    axios
      .post("http://192.168.100.111:9000/comment/auth/showcomment", {
        Postid: datas.Postid
      })
      .then(response => {
        if (response.data) {
          console.log(response.data[0].comments,'***************')
          setData(datas=>({ ...datas,postArray: response.data[0].comments.reverse() }));
        } else {
        }
      })
      .catch(err => {
        alert(err);
        console.log(err);
      });
  },[]);

  return (
    <>
      <div className="content_lft">
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">
              User Interface PSD Source files Web Designing for web
            </div>
            <div className="btm_rgt">
              <div className="btm_arc">
                {props.location.state.Category}
              </div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="/images/img_6.png" alt="img_6" />
                {props.location.state.UserName}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">
                  {props.location.state.Date}
                </span>
                <span className="span_time">11:15am</span>
              </div>
            </div>
            <div className="div_image">
              <img
                src={datas.picpath + props.location.state.Post}
                alt="pet"
              />
            </div>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li>
                    <a href>
                      <span className="btn_icon">
                        <img src="/images/icon_001.png" alt="share" />
                      </span>
                      Share
                    </a>
                  </li>
                  <li>
                    <a href>
                      <span className="btn_icon">
                        <img src="/images/icon_002.png" alt="share" />
                      </span>
                      Flag
                    </a>
                  </li>
                  <li>
                    <a onClick={likePost}>
                      <span className="btn_icon">
                        <img src="/images/icon_003.png" alt="share" />
                      </span>
                      {datas.likes} Likes
                    </a>
                  </li>
                  <li>
                    <a href>
                      <span className="btn_icon">
                        <img src="/images/icon_004.png" alt="share" />
                      </span>
                      {datas.postArray.length} Comments
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="contnt_3">
          <ul>
            {datas.postArray.map((data, id) => {
              return (
                <li>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" alt="post_img" />
                    </div>
                    <div className="image_name">{data.UserName}</div>
                  </div>
                  <div className="list_info">{data.Comments}</div>
                  <input
                    type="button"
                    defaultValue="Reply"
                    className="orng_btn"
                  />
                </li>
              );
            })}

            <li>
              <div className="cmnt_div1">
                <form id="coment" onSubmit={addComments}>
                  <input
                    type="text"
                    placeholder="Enter your Comment"
                    name="Comments"
                    className="cmnt_bx1"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="submit"
                    className="sub_bttn1"
                    defaultValue="Submit Comment"
                  />
                </form>
              </div>
            </li>
          </ul>
          <div className="view_div">
            <a href>View more</a>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}

export default Singlepost;
