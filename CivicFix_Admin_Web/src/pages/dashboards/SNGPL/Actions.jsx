// import React from "react";
// import styled from "@emotion/styled";

// import { Button as MuiButton, Menu, MenuItem } from "@mui/material";
// import {
//   Loop as LoopIcon,
//   FilterList as FilterListIcon,
// } from "@mui/icons-material";
// import { spacing } from "@mui/system";

// const Button = styled(MuiButton)(spacing);

// const SmallButton = styled(Button)`
//   padding: 4px;
//   min-width: 0;

//   svg {
//     width: 0.9em;
//     height: 0.9em;
//   }
// `;

// function Actions() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <React.Fragment>
//       <SmallButton size="small" mr={2}>
//         <LoopIcon />
//       </SmallButton>
//       <SmallButton size="small" mr={2}>
//         <FilterListIcon />
//       </SmallButton>
//       <Button
//         variant="contained"
//         color="secondary"
//         aria-owns={anchorEl ? "simple-menu" : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         Today: April 29
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Today</MenuItem>
//         <MenuItem onClick={handleClose}>Yesterday</MenuItem>
//         <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
//         <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
//         <MenuItem onClick={handleClose}>This month</MenuItem>
//         <MenuItem onClick={handleClose}>Last month</MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// }

// export default Actions;

import React from "react";
import styled from "@emotion/styled";
import { Button as MuiButton, Menu, MenuItem } from "@mui/material";
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);
const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;
  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

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
      <SmallButton size="small" mr={2}>
        <LoopIcon />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <FilterListIcon />
      </SmallButton>
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
