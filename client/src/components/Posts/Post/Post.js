import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";
import {
  cardSx,
  mediaSx,
  overlay,
  overlay2,
  details,
  cardActionsSx,
  postTitleSx,
} from "./styles";
import { useEffect } from "react";
import { deletePost, likePost } from "../../../store/slice/postActions";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, setCurrentId }) => {
  console.log(post);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const user = useSelector((state) => state.auth.authData);
  // console.log(user?.result._id);
  const dispatch = useDispatch();
  const updatePostHandler = () => {
    setCurrentId(post._id);
  };

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const likeHandler = (id) => {
    dispatch(likePost(id));
  };

  const Likes = () => {
    // console.log(post);
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card sx={cardSx}>
      <CardMedia sx={mediaSx} image={post.selectedFile} title={post.title} />
      <div style={overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creatorId ||
        user?.result?._id === post?.creatorId) && (
        <div style={overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={updatePostHandler}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div style={details}>
        {post.tags.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        )}
      </div>
      <Typography variant="h5" gutterBottom sx={postTitleSx}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={cardActionsSx}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {/* <Button
          size="small"
          color="primary"
          onClick={() => deletePostHandler(post._id)}
        >
          <DeleteIcon />
          delete
        </Button> */}
        {(user?.result?.googleId === post?.creatorId ||
          user?.result?._id === post?.creatorId) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              console.log(post);
              dispatch(
                deletePost({ _id: post._id, creatorId: post.creatorId })
              );
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
