import React, { useEffect, useState } from "react";
import MenuBar from "../src/components/MenuBar";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostsList from "../src/components/Posts";
import Fab from "@material-ui/core/Fab";
import Alert from "@material-ui/lab/Alert";
import {
  PostListRequest,
  ImageRequest,
  PostRequest,
} from "../src/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
  },
  postdata: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "6px",
    // margin: "16px",
    width: "90%",
    marginTop: "16px",
    minHeight: "100px",
  },
  addNewImage: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "16px",
    marginRight: "16px",
  },
  Pagination: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "8px",
    marginRight: "8px",
  },
}));

const Home = (props) => {
  const dispatch = useDispatch();
  const allPostList = useSelector((state) => state.PostListstatus);
  const imageUrl = useSelector((state) => state.Imagestatus);
  const postDataStatus = useSelector((state) => state.AddPoststatus);
  const [offlineError, setOfflineError] = useState("");
  const [data, setData] = useState();

  const [page, setPage] = useState(1);
  const classes = useStyles();

  const handleAddPicture = () => {
    // const offlinePosts = JSON.parse(localStorage.getItem("newPost"));
    // console.log(!offlinePosts || offlinePosts?.length > 3);
    // if (!offlinePosts || offlinePosts?.length > 3) {
      props.history.push("/addpicture");
    // }
    // if (offlinePosts?.length < 3) {
    //   setOfflineError("No more posts can be added");
    // }
  };
  const isOnline = navigator.onLine;

  useEffect(() => {
    let newPosts = JSON.parse(localStorage.getItem("newPost"));
    newPosts?.map(async(val) => {
      await dispatch(PostRequest(val));
    });

    if (localStorage.getItem("post")) {
      const allPosts = JSON.parse(localStorage.getItem("post"));
      setData(allPosts);
    }
    dispatch(PostListRequest(page));

  }, []);

  useEffect(async () => {
    if (imageUrl?.data && allPostList&&allPostList?.data?.length && isOnline) {
      const filteredArray = await Promise.all(
        allPostList.data.map((val) => {
          const imageArray = imageUrl?.data.find((el) => {
            return el._id == val._id;
          });
          val["image"] = imageArray?.imageName ? imageArray.imageName : "";
          return val;
        })
      );

      if (filteredArray.length) {
        setData(filteredArray);
        localStorage.setItem("post", JSON.stringify(filteredArray));
      }
    }
  }, [imageUrl?.data.length]);

  useEffect(async () => {
    if (allPostList&&allPostList?.data && isOnline && !postDataStatus.isLoading) {
      if(allPostList&& allPostList?.data?.length){
     allPostList.data.map(async (allpost) => {
        await dispatch(ImageRequest(allpost._id));
      });
      }
  
    }
  }, [allPostList.data]);

  const handlePagination = (event, val) => {
    dispatch(PostListRequest(val));
    setPage(val);
  };

  return (
    <div>
      <MenuBar />
      {!navigator.onLine ? (
        <div>
          <Alert severity='warning'>
            You are in offline mode!! {offlineError}
          </Alert>
        </div>
      ) : null}
      <Grid
        direction='row'
        justify='space-around'
        alignItems='center'
        container
      >
        {data?.map((post, i) => {
          return (
            <Grid
              item
              className={classes.postdata}
              xs={12}
              sm={5}
              md={5}
              key={i}
            >
              <PostsList
                key={i}
                source={post.image || post.file}
                comment={post.comment}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.Pagination}>
        <Pagination
          count={allPostList?.totalpages}
          color='primary'
          page={page}
          onChange={handlePagination}
        />
      </div>
      <div className={classes.addNewImage}>
        <Fab color='primary'>
          <AddIcon fontSize='large' onClick={handleAddPicture} />
        </Fab>
      </div>
    </div>
  );
};

export default Home;
