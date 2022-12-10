import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import "./Pagination.css";

const Paginate = () => {
  return (
    <Pagination
      count={10}
      age={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          components={{ Link }}
          {...item}
          to={`/posts?page=${1}`}
        />
      )}
    />
  );
};

export default Paginate;
