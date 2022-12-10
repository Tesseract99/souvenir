import { TextField, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { formStyle, buttonSubmitSx, paperSx, paperMsgSx } from "./styles";
import { createPost, updatePost } from "../../store/slice/postActions";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  // const user = JSON.parse(localStorage.getItem("profile"));
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  // const [currentId, setCurrentId] = useState(null);
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clearForm();
      return;
    }

    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clearForm();
  };

  const creatorChangeHandler = (event) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        creator: event.target.value,
      };
    });
  };

  const titleChangeHandler = (event) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      };
    });
  };

  const messageChangeHandler = (event) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        message: event.target.value,
      };
    });
  };

  const tagsChangeHandler = (event) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        tags: event.target.value.split(","),
      };
    });
  };

  const selectedFileChangeHandler = (base64) => {
    setPostData((prevState) => {
      return {
        ...prevState,
        selectedFile: base64,
      };
    });
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={paperMsgSx}>
        <Typography variant="h6" align="center">
          Please Sign In to share your Souvenir 💛
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper sx={paperSx}>
        <form
          style={formStyle}
          autoComplete="off"
          noValidate
          onSubmit={handleOnSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing a Memory" : "Creating a Memory"}
          </Typography>
          {/* <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={creatorChangeHandler}
          /> */}

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={titleChangeHandler}
          />

          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={messageChangeHandler}
          />

          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={tagsChangeHandler}
          />

          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                selectedFileChangeHandler(base64);
              }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            sx={buttonSubmitSx}
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clearForm}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
