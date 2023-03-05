import { Box, ClickAwayListener, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { StyledButton } from "../styles";

type EditIssueField = {
  id: string;
  handleClose: () => void;
  handleSave: (textFieldValue: string) => void;
  fieldValue: string;
};

const EditIssueField: React.FC<EditIssueField> = ({
  id,
  handleClose,
  handleSave,
  fieldValue,
}) => {
  const [textFieldValue, setTextFieldValue] = useState(fieldValue);

  const handleChangeField = useCallback((textField: string) => {
    setTextFieldValue(textField);
  }, []);

  const handleSaveTextField = useCallback(() => {
    if (textFieldValue.trim().length < 1) return;

    handleSave(textFieldValue.trim());
    handleClose();
  }, [textFieldValue]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        id={id}
        sx={{
          marginTop: 2.4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          onKeyDown={(e) =>
            e.key.toLowerCase() === "enter" && handleSaveTextField()
          }
          onChange={(e) => handleChangeField(e.target.value)}
          autoFocus
          multiline={id !== "editLink"}
          value={textFieldValue}
          sx={{
            padding: "2px 6px",
            backgroundColor: "#fff",
            flexGrow: 1,
            borderRadius: 1.5,
            minHeight: id === "editLink" ? 50 : 150,
            border: "2px solid #d1d1d1",
            "& fieldset": {
              border: "none",
            },
            "& .MuiInputBase-root": {
              display: "flex",
              alignItems: "flex-start",
              minHeight: id === "editLink" ? 50 : 150,
              fontSize: id === "editTitle" ? 28 : "inherit",
              fontWeight: id === "editTitle" ? 700 : "inherit",
              color: "inherit",
            },
            "& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input": {
              minHeight: 150,
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 2, marginTop: 2.5 }}>
          <StyledButton
            onClick={handleClose}
            variant="outlined"
            sx={{
              margin: 0,
              textWrap: "no-wrap",
              border: "2px solid #f1f1f1",
              width: "100%",
              padding: "0.4rem 1.2rem !important",
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: "#fff",
              ":hover": {
                border: "2px solid #f1f1f1",
                transition: "all 0.3s",
                backgroundColor: "#ebf4ff",
              },
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleSaveTextField}
            variant="contained"
            disabled={textFieldValue.trim().length < 1}
            color="primary"
            sx={{
              margin: 0,
              textWrap: "no-wrap",
              width: "100%",
              padding: "0.4rem 1.2rem",
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: "#3993ff",
            }}
          >
            Save
          </StyledButton>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default EditIssueField;
