import React from "react";
import me from "./img/pine.png"; //Image of your self
import { Box } from "@mui/material";
import { info } from "../../info/Info";
import EmojiBullet from "./EmojiBullet";

export default function About() {
  console.log("me", me);
  return (
    <Box
      component={"main"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"calc(100vh - 175px)"}
      bgcolor={"blue"}
      sx={{
        ":hover": {
          bgcolor: "darkblue",
        },
      }}
    >
      <Box
        style={{ background: info.gradient }}
        component={"img"}
        src={me.src}
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
              background: info.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {info.firstName}
          </span>
          <span>🤚</span>
        </h1>
        <h2>I'm {info.position}.</h2>
        <Box component={"ul"} p={"0.8rem"}>
          {info.miniBio.map((bio, index) => (
            <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// export default function About() {
//   console.log("me", me);
//   return (
//     <Box
//       component={"main"}
//       display={"flex"}
//       alignItems={"center"}
//       justifyContent={"center"}
//       minHeight={"calc(100vh - 175px)"}
//       bgcolor={"blue"}
//       sx={{
//         ":hover": {
//           bgcolor: "darkblue",
//         },
//       }}
//     >
//       <Box
//         alt={"Image of Trainer"}
//         style={{ background: info.gradient }}
//         component={"img"}
//         src={me.src}
//         width={{ xs: "35vh", md: "40vh" }}
//         height={{ xs: "35vh", md: "40vh" }}
//         borderRadius={"50%"}
//         p={"0.75rem"}
//         mb={{ xs: "1rem", sm: 0 }}
//         mr={{ xs: 0, md: "2rem" }}
//       />
//       <Box>
//         <h1>
//           Hi, I'm{" "}
//           <span
//             style={{
//               background: info.gradient,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             {info.firstName}
//           </span>
//           <span>🤚</span>
//         </h1>
//         <h2>I'm {info.position}.</h2>
//         <Box component={"ul"} p={"0.8rem"}>
//           {info.miniBio.map((bio, index) => (
//             <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// }
