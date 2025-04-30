import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "black",
          color: "blue",
          boxShadow: "0 0 12px rgba(0, 183, 255, 0.6)",
          animation: visible ? "pulse 2s infinite" : "none",
          "&:hover": {
            backgroundColor: "cyan",
          },
          zIndex: 1300,
          "@keyframes pulse": {
            "0%": { boxShadow: "0 0 12px rgba(0, 183, 255, 0.6)" },
            "50%": { boxShadow: "0 0 24px rgba(0, 183, 255, 1)" },
            "100%": { boxShadow: "0 0 12px rgba(0, 183, 255, 0.6)" },
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

export default ScrollToTopButton;
