// src/components/CastCard.jsx
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CastCard = ({ name, character, profilePath }) => {
  return (
    <Card
      sx={{
        width: 160,
        borderRadius: 4,
        boxShadow: 5,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
        bgcolor: "background.paper",
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={
          profilePath
            ? `https://image.tmdb.org/t/p/w300${profilePath}`
            : "/default-profile.png"
        }
        alt={name}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          as {character || "Unknown"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CastCard;
