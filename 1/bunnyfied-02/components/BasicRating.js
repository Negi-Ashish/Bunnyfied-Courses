import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

export default function BasicRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {/* User will be able to set a rating */}
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      {/* User will not be able to set a rating */}
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />

      {/* User will not be able to set a rating and will appear disabled*/}
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />

      {/* User will be able to set a rating with a increment of half star*/}
      <Typography component="legend">Half Rating</Typography>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

      {/* User will not be able to set a rating */}
      <Typography component="legend">Read only Half Rating </Typography>
      <Rating
        name="half-rating-read"
        defaultValue={2.5}
        precision={0.5}
        readOnly
      />

      {/* User will  be able to set a rating and see the feedback*/}
      <Typography component="legend">Feedback display</Typography>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}

      {/* User will be able to see rating of small size */}
      <Typography component="legend">Small Size</Typography>
      <Rating name="size-small" defaultValue={2} size="small" />

      {/* User will be able to see rating of medium size */}
      <Typography component="legend">Medium Size</Typography>
      <Rating name="size-medium" defaultValue={2} />

      {/* User will be able to see rating of large size */}
      <Typography component="legend">Large Size</Typography>
      <Rating name="size-large" defaultValue={2} size="large" />
    </Box>
  );
}
