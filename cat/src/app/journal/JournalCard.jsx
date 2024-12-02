import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function JournalCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          bgcolor: "red", // Dynamic background color
          color: "white", // Dynamic text color
        }}
        title="September 14, 2016"
        titleTypographyProps={{
          sx: { fontSize: "1.5rem", fontWeight: "bold" }, // Customize title size and weight
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
