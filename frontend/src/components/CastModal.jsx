import { useEffect, useState } from "react";
import { Modal, Box, Typography, Avatar, Stack, Skeleton } from "@mui/material";
import { getPersonDetails, getPersonMovies } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 700 },
  height: { xs: 600, md: 520 },
  maxHeight: "90vh",
  bgcolor: "background.paper",
  color: "text.primary",
  borderRadius: 4,
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
  outline: "none",
};

const CastModal = ({ open, onClose, personId }) => {
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [flip, setFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && personId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const personData = await getPersonDetails(personId);
          const movieData = await getPersonMovies(personId);
          setPerson(personData);
          setMovies(movieData.slice(0, 10));
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch person info", error);
          setLoading(false);
        }
      };
      fetchData();
    }
    return () => {
      setPerson(null);
      setMovies([]);
      setFlip(false);
      setLoading(true);
    };
  }, [open, personId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    if (!isMobile) {
      setFlip(!flip);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          slotProps={{
            backdrop: {
              style: {
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              },
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={style}>
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: 2, mb: 2 }}
                  />
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" height={30} />
                  <Skeleton
                    variant="text"
                    width="90%"
                    height={100}
                    sx={{ mt: 2 }}
                  />
                </>
              ) : person ? (
                <Box
                  sx={{ width: "100%", height: "100%" }}
                  onClick={handleCardClick}
                  style={{
                    perspective: 1000,
                    cursor: isMobile ? "default" : "pointer",
                  }}
                >
                  <motion.div
                    animate={{ rotateY: flip ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Front Side */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "flex-start" },
                        gap: 3,
                        overflowY: "auto",
                        p: 1,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                              : "/default-profile.png"
                          }
                          alt={person.name}
                          sx={{
                            width: { xs: 160, md: 180 },
                            height: { xs: 220, md: 240 },
                            borderRadius: 2,
                          }}
                          variant="square"
                        />
                      </motion.div>

                      <Box flex={1}>
                        <Typography variant="h4" fontWeight="bold" mb={1}>
                          {person.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          mb={2}
                          color="text.secondary"
                        >
                          {person.birthday}{" "}
                          {person.place_of_birth &&
                            `• ${person.place_of_birth}`}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{ maxHeight: 120, overflowY: "auto" }}
                        >
                          {person.biography || "No biography available."}
                        </Typography>

                        <Typography variant="h6" mt={3} mb={1}>
                          Top Movies:
                        </Typography>
                        <Stack direction="column" spacing={1}>
                          {movies.slice(0, 5).map((movie) => (
                            <motion.div
                              key={movie.id}
                              whileHover={{ scale: 1.05, rotateZ: 2 }}
                            >
                              <Link
                                to={`/movie/${movie.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <img
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                      : "/default-movie.png"
                                  }
                                  alt={movie.title}
                                  style={{
                                    width: 40,
                                    height: 60,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                  }}
                                />
                                <Typography fontWeight="bold" fontSize="0.9rem">
                                  {movie.title}
                                </Typography>
                              </Link>
                            </motion.div>
                          ))}
                        </Stack>
                      </Box>
                    </Box>

                    {/* Back Side */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        p: 3,
                        transform: "rotateY(180deg)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        overflowY: "auto",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        More About {person.name}
                      </Typography>
                      <Typography variant="body1">
                        Gender: {person.gender === 1 ? "Female" : "Male"}
                      </Typography>
                      <Typography variant="body1">
                        Age:{" "}
                        {person.birthday
                          ? new Date().getFullYear() -
                            parseInt(person.birthday.slice(0, 4))
                          : "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Popularity: {Math.floor(person.popularity)}
                      </Typography>

                      <Typography variant="h6" mt={2}>
                        Known For:
                      </Typography>
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={isMobile ? 2 : 4}
                        style={{ marginTop: 10 }}
                      >
                        {movies.map((movie) => (
                          <SwiperSlide key={movie.id}>
                            <motion.div whileHover={{ rotateZ: 5, scale: 1.1 }}>
                              <img
                                src={
                                  movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                                    : "/default-movie.png"
                                }
                                alt={movie.title}
                                style={{
                                  width: "100%",
                                  height: 150,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                }}
                              />
                            </motion.div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  </motion.div>
                </Box>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CastModal;
