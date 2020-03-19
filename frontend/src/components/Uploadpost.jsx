import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Uploadpost(props) {
  const [uploadData, setUpload] = useState({
    Category: "cat",
    UserName: localStorage.getItem("UserName")
  });

  const useCommentForm = () => {
    const postPic = e => {
      e.preventDefault();
      console.log(uploadData, "**********");

      var formData = new FormData();
      formData.append("Title", uploadData.Title);
      formData.append("Category", uploadData.Category);
      formData.append("Post", uploadData.Post);
      formData.append("UserName", uploadData.UserName);

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
        axios
          .post("http://192.168.100.111:9000/post/auth/post", formData, config)
          .then(response => {
            if (response.data) {
              props.history.push("/timeline", { obj: response.data });
            } else {
              alert("not upload");
            }
          })
          .catch(err => {
            alert(err);
            console.log(err);
          });
    };

    const handleChange = e => {
      e.persist();
      setUpload(uploadData => ({
        ...uploadData,
        [e.target.name]: e.target.value
      }));
    };
    const handleUploade = e => {
      e.persist();
      setUpload(uploadData => ({ ...uploadData, Post: e.target.files[0] }));
    };
    return {
      postPic,
      handleChange,
      handleUploade
    };
  };
  const { handleChange, handleUploade, postPic } = useCommentForm();

  return (
    <>
      <div className="content_lft">
        <div className="login_sec">
          <h1>Upload New Post</h1>
          <form onSubmit={postPic}>
            <ul>
              <li>
                <span>Title</span>
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="Title"
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                <span>Category</span>

                <select
                  onChange={handleChange}
                  name="Category"
                  required
                >
                  <option value={uploadData.Category}>CATS </option>
                  <option value={uploadData.Category}>DOGS </option>
                  <option value={uploadData.Category}>RABBIT </option>
                  <option value={uploadData.Category}>BIRDS </option>
                  <option value={uploadData.Category}>OTHERS </option>
                </select>
              </li>
              <li>
                <input type="file" name="Post" onChange={handleUploade} />
              </li>
              <li>
                <input type="submit" defaultValue="Log In" />
                <Link
                  style={{ padding: "10px", backgroundColor: "#f58c20" }}
                  to="/timeline"
                >
                  Back
                </Link>
              </li>
            </ul>
          </form>
          <div className="addtnal_acnt"></div>
        </div>
      </div>
    </>
  );
}

export default Uploadpost;
