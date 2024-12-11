import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function GenericSnackbar({ status, message, visibility }) {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (visibility) {
      setOpen(true);
    }
  }, [visibility]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={status === "success" ? "success" : "error"}
        variant="filled"
        action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

GenericSnackbar.propTypes = {
  status: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default GenericSnackbar;
