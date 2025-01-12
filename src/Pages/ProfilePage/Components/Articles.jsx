import { Box } from "@mui/material";
import LikedArticle from "./LikedArticle";
import MyArticle from "./MyArticle";
import MyComment from "./MyComment";

const Articles = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <LikedArticle />
      <hr style={{ height: "36px" }} />
      <MyArticle />
      <hr style={{ height: "36px" }} />
      <MyComment />
    </Box>
  );
};

export default Articles;
