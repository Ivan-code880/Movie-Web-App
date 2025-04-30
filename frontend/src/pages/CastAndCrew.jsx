import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../services/api";
import { Grid, Typography, Container, CircularProgress } from "@mui/material";
import CastCard from "../components/CastCard";
import CastModal from "../components/CastModal"; // <-- import modal

const CastAndCrew = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPersonId, setSelectedPersonId] = useState(null); // <-- for modal
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCredits(data);
      } catch (error) {
        console.error("Failed to fetch credits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  const handleCardClick = (personId) => {
    setSelectedPersonId(personId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!credits) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">No cast or crew found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Cast
      </Typography>
      <Grid container spacing={3}>
        {credits.cast.slice(0, 20).map((member) => (
          <Grid item key={member.id}>
            <div
              onClick={() => handleCardClick(member.id)}
              style={{ cursor: "pointer" }}
            >
              <CastCard
                name={member.name}
                character={member.character}
                profilePath={member.profile_path}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" fontWeight="bold" mt={6} mb={4}>
        Crew
      </Typography>
      <Grid container spacing={3}>
        {credits.crew.slice(0, 20).map((member) => (
          <Grid item key={member.id}>
            <div
              onClick={() => handleCardClick(member.id)}
              style={{ cursor: "pointer" }}
            >
              <CastCard
                name={member.name}
                character={member.job}
                profilePath={member.profile_path}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <CastModal
        open={openModal}
        onClose={handleCloseModal}
        personId={selectedPersonId}
      />
    </Container>
  );
};

export default CastAndCrew;
