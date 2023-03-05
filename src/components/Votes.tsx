import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { User } from "../types/User";

type Votes = {
  users: User[] | undefined;
  reveal: boolean;
};

const Votes: React.FC<Votes> = ({ users, reveal }) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const validateUsers = () => {
    if (users) {
      if (users.length % 2 === 0) {
        return users.length / 2;
      } else {
        return Math.ceil(users.length / 2);
      }
    } else {
      return 60;
    }
  };

  return (
    <Box
      sx={{
        position: users && users.length > 1 ? "absolute" : "unset",
        display: "flex",
        justifyContent: "center",
        marginTop: users && users.length > 1 ? 0 : "25px",
        alignItems: "center",
        userSelect: "none",
        flexDirection: "row",
        flexWrap: "wrap",
        width:
          users && matchesMd
            ? validateUsers() * 80
            : users && validateUsers() * 100,
        columnGap: matchesMd ? 3 : 5,
        rowGap: matchesMd ? 21 : 22,
      }}
    >
      {users?.length &&
        users.map((user) => (
          <Box
            key={user.clientId}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 60,
            }}
          >
            <Box
              id="flip-card"
              sx={{
                backgroundColor: "transparent",
                height: matchesMd ? 77 : 90,
                width: matchesMd ? 46 : 54,
                perspective: "1000px",
                color: "#3993ff",
                fontSize: matchesMd ? 21 : 22,
                fontWeight: 700,
                borderRadius: "10px",
                marginBottom: 0.3,
              }}
            >
              <Box
                id="flip-card-inner"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  transition: "transform 0.6s",
                  transformStyle: "preserve-3d",
                  transform: user.card && reveal ? "rotateY(180deg)" : "",
                  borderRadius: "10px",
                }}
              >
                <Box
                  id="back"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    webkitBackfaceVisibility: "hidden" /* Safari */,
                    backfaceVisibility: "hidden",
                    background: user.card ? "url(/logo.png)" : "#e8e9ea",
                    boxShadow:
                      user.card && !reveal ? "2px 2px 5px #00000095" : "",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    backgroundSize: 40,
                    borderRadius: "10px",
                    transition: reveal ? "box-shadow .3s" : "",
                  }}
                ></Box>
                <Box
                  id="front"
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #3993ff",
                    width: "100%",
                    height: "100%",
                    webkitBackfaceVisibility: "hidden" /* Safari */,
                    backfaceVisibility: "hidden",
                    backgroundColor: "#fff",
                    transform: "rotateY(180deg)",
                    borderRadius: "10px",
                  }}
                >
                  {reveal ? user.card : ""}
                </Box>
              </Box>
            </Box>

            <Tooltip
              title={user.username}
              TransitionProps={{ timeout: 0 }}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              }}
              componentsProps={{
                tooltip: {
                  sx: {
                    color: "#ededed",
                    fontSize: 19,
                    paddingY: 0.5,
                    paddingX: 1,
                    backgroundColor: "#303e49",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: matchesMd ? 19 : 22,
                  fontWeight: matchesMd ? 600 : 700,
                  width: 75,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {user.username}
              </Typography>
            </Tooltip>
          </Box>
        ))}
    </Box>
  );
};

export default Votes;
