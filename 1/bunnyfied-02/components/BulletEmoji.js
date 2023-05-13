import React from "react";
import { Box } from "@mui/material";

function BulletEmoji(props) {
  const { emoji, text } = props;

  return (
    <Box
      component={"li"}
      fontSize={"1rem"}
      lineHeight={2}
      style={{ cursor: "default" }}
    >
      <Box
        component={"span"}
        aria-label="cheese"
        role="img"
        mr={{ xs: "0.5rem", md: "1rem" }}
        fontSize={"1.5rem"}
      >
        {emoji}
      </Box>{" "}
      <b>{text}</b>
    </Box>
  );
}

export default BulletEmoji;
