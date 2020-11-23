import React, { useEffect, useState } from "react";
import MenuBar from "./components/MenuBar";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "./components/Comment";
import Camera from "./components/Camera";
import { useDispatch, useSelector } from "react-redux";
import { PostRequest } from "../src/redux/actions/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
    border: "none",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
  postdata: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    border: "1px soild red",
    padding: "6px",
  },
}));

const Home = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [source, setSource] = useState();
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [saveComment, setSaveComment] = useState("");
  const [postData, setPostData] = useState([]);


  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(gotMedia)
      .catch((error) => 
      console.error("getUserMedia() error:"
      , error));

    function gotMedia(mediaStream) {
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
    }
  }, []);

  useEffect(() => {
    if (postData.length > 0) {
      localStorage.setItem("post", JSON.stringify(postData));
    }
  }, [postData]);
  useEffect(() => {
    if (source) {
      setOpenCommentModal(true);
    }
  }, [source]);

  const uploadImage = (blob) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      setSource(base64data);
    };
    var newImg = document.createElement("img"),
      url = URL.createObjectURL(blob);
    setSource(url);
    newImg.onload = function () {
      // no longer need to read the blob so it's revoked
      URL.revokeObjectURL(url);
    };
    newImg.src = url;
  };

  const handleCancelComment = () => {
    setOpenCommentModal(!openCommentModal);
  };
  const handleChange = (e) => {
    setSaveComment(e.target.value);
  };
  const handleAddPost = async () => {
    if (saveComment !== "") {
      let postData = {
        file: source,
        comment: saveComment,
      };
      await dispatch(PostRequest(postData));
      const allPostData = await JSON.parse(localStorage.getItem("post"));
      const newPostData = await allPostData?.length > 0 ? [...allPostData] : [];
      await newPostData.push(postData);
      await setPostData(newPostData);
      await localStorage.setItem('post',JSON.stringify(newPostData))
      await setOpenCommentModal(!openCommentModal);
     await props.history.push("/");
    }
  };
  return (
    <div>
      <Comment
        open={openCommentModal}
        handleCancelComment={handleCancelComment}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />
      <MenuBar />
      <div>
        <div className={classes.root}>
          <Camera sendFile={uploadImage} />
        </div>
      </div>
      {/* <canvas id='image_canvas'></canvas> */}
    </div>
  );
};

export default Home;
