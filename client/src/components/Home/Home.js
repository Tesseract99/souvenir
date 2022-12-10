import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
} from "@mui/material";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
// import useStyles from "./styles.js";
import { appBarSx, headingSx, imageSx } from "./styles";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../store/slice/postActions";
import Paginate from "../Pagination";
import Navbar from "../Navbar/Navbar";

const App = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <>
      <Container maxWidth="lg">
        {/* <Navbar /> */}
        <Grow in timeout={300}>
          <Container>
            <Grid
              container
              justify="space-between"
              // alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />

                {/* <Paper>
                  <Paginate />
                </Paper> */}
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
};

export default App;
