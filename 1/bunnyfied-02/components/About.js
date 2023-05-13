import React from "react";
import { Box } from "@mui/material";
import pine from "../public/img/pine.png";
import BulletEmoji from "./BulletEmoji";
import { bullet_emoji } from "../constants/details";

export default function About(props) {
  const { name, description } = props;

  return (
    <Box
      component={"main"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"calc(114vh - 175px)"}
      bgcolor={"blue"}
      sx={{
        ":hover": {
          bgcolor: "darkblue",
        },
      }}
    >
      <Box
        style={{ background: "red" }}
        component={"img"}
        src={pine.src}
        width={{ xs: "35vh", md: "40vh" }}
        height={{ xs: "35vh", md: "40vh" }}
        borderRadius={"50%"}
        p={"0.75rem"}
        mb={{ xs: "1rem", sm: 0 }}
        mr={{ xs: 0, md: "2rem" }}
        alt={"Image of Trainer"}
      />
      <Box>
        <h1>
          Hi, I'm{" "}
          <span
            style={{
              background: "red",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </span>
          <span>🤚</span>
        </h1>
        <h2>I'm a {description}.</h2>
        <Box component={"ul"} p={"0.8rem"}>
          {bullet_emoji.map((object, index) => (
            <BulletEmoji key={index} emoji={object.emoji} text={object.text} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
