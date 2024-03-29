import { Box, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardVotes } from "../types/CardVotes";

type VotingResults = {
  cards: CardVotes[] | undefined;
  average: number | undefined;
  mate: boolean;
  openDrawer: boolean;
  revealingTime: number;
};

const VotingResult: React.FC<VotingResults> = ({
  cards,
  average,
  mate,
  openDrawer,
  revealingTime,
}) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: matchesXs ? "flex-start" : "center",
        userSelect: "none",
        position: "fixed",
        height: matchesMd ? 260 : 200,
        flexDirection: matchesMd ? "column-reverse" : "row",
        bottom: revealingTime > 0 ? "-100%" : 0,
        zIndex: 1,
        backgroundColor: "#f9f9f9",
        padding: 1.5,
        overflowY: "hidden",
        overflowX: matchesMd ? "auto" : "hidden",
        width: openDrawer ? "calc(100vw - 600px)" : "100%",
        transition: "all .2s, bottom .25s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {cards &&
          cards.map((card) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: 0.5,
              }}
              key={card.card}
            >
              <Box
                sx={{
                  fontSize: 21.5,
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #000",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  height: 80,
                  width: 50,
                  color: "black",
                  userSelect: "none",
                  cursor: "default",
                  margin: "0 15px 10px",
                }}
              >
                {card.card}
              </Box>
              <Box
                sx={{
                  color: "#717171",
                  fontSize: 19.5,
                  fontWeight: 500,
                }}
              >
                {card.quantity} {card.quantity > 1 ? "Votes" : "Vote"}
              </Box>
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          width: matchesXs ? "100%" : "fit-content",
          display: "flex",
          flexDirection: matchesMd ? "row" : "column",
          justifyContent: "center",
          gap: matchesMd ? 5 : 0,
          marginLeft: matchesMd ? 0 : 5,
          marginBottom: 1,
        }}
      >
        {average !== undefined && average !== null && (
          <Box>
            <Typography sx={{ fontSize: 22, color: "#a8aeb2" }}>
              Average:
            </Typography>
            <Typography
              sx={{
                fontSize: 43,
                fontWeight: 700,
                color: "black",
                lineHeight: 1.2,
              }}
            >
              {average}
            </Typography>
          </Box>
        )}

        {mate && (
          <Box
            sx={{
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 22, color: "#a8aeb2", marginBottom: 1 }}
            >
              Mate time!
            </Typography>
            <Box
              sx={{
                fontSize: 40,
              }}
            >
              🧉
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VotingResult;
