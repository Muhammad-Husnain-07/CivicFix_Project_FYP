import React from "react";
import styled from "@emotion/styled";
import { Button as MuiButton, Menu, MenuItem } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

function Actions({ filter, setFilter }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filterOption) => {
    setFilter(filterOption);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {filter?.label}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() =>
            handleMenuItemClick({ label: "Today", value: "today" })
          }
        >
          Today
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick({ label: "Yesterday", value: "yesterday" })
          }
        >
          Yesterday
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick({ label: "Last 7 days", value: "last7days" })
          }
        >
          Last 7 days
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleMenuItemClick({ label: "Last 30 days", value: "last30days" })
          }
        >
          Last 30 days
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Actions;
