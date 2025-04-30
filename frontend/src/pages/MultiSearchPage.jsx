import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { multiSearch } from "../services/api";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";

function MultiSearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await multiSearch(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Typography align="center" mt={5}>
        No results found for <b>{query}</b>.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", my: 4, px: 2 }}>
      <Typography variant="h4" mb={4} textAlign="center">
        Search Results for "<i>{query}</i>"
      </Typography>
      <Grid container spacing={3}>
        {results.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper
              component={Link}
              to={
                item.media_type === "movie"
                  ? `/movie/${item.id}`
                  : item.media_type === "person"
                  ? `/person/${item.id}`
                  : "#"
              }
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                {item.poster_path || item.profile_path ? (
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w185${
                      item.poster_path || item.profile_path
                    }`}
                    alt={item.title || item.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                ) : (
                  <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                    {item.title ? item.title.charAt(0) : item.name.charAt(0)}
                  </Avatar>
                )}
                <Typography variant="h6" noWrap>
                  {item.title || item.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" noWrap>
                {item.overview
                  ? item.overview.slice(0, 100) + "..."
                  : "No description available."}
              </Typography>
              <Box mt="auto" pt={2}>
                <Chip
                  label={item.media_type.toUpperCase()}
                  color="primary"
                  size="small"
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MultiSearchPage;
