import React, { useState } from "react";
import {
  Box as MuiBox,
  Box,
  styled,
  Button as MuiButton,
  Typography,
  Card as MuiCard,
  CardContent,
  Stack,
  Divider as MuiDivider,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { spacing } from "@mui/system";
import { Plus } from "lucide-react";
import WorkflowModal from "./WorkflowModal";
import UserModal from "./UserModal";
import LogicalBranchModal from "./LogicalBranchModal";
import IntegrationModal from "./IntegrationModal";
import workflowStepsJSON from "./workflowSteps.json";

const Divider = styled(MuiDivider)(spacing);

const WorkflowContainer = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

const PlusIcon = styled(AddCircleOutlineIcon)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CustomCard = styled(MuiCard)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  minWidth: 300,
}));

const CustomButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomCardHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: "bold",
}));

const CustomCardContent = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const EditButton = styled(CustomButton)(({ theme }) => ({
  alignSelf: "flex-end",
}));

const ActionButton = styled(CustomButton)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const CustomStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StartingCard = ({ title, description }) => {
  return (
    <CustomCard>
      <CardContent>
        <CustomCardHeader variant="h6">{title}</CustomCardHeader>
        <CustomCardContent>{description}</CustomCardContent>
        <Divider my={2} />
        <EditButton variant="contained" size="small" sx={{ float: "right" }}>
          Edit
        </EditButton>
      </CardContent>
    </CustomCard>
  );
};

const LogicalCard = ({ title, description }) => {
  return (
    <CustomCard>
      <CardContent>
        <CustomCardHeader variant="h6">{title}</CustomCardHeader>
        <CustomCardContent>{description}</CustomCardContent>
        <Typography fontWeight={"bold"} color={"primary.main"}>
          Always
        </Typography>
        <Divider my={2} />
        <EditButton variant="contained" size="small" sx={{ float: "right" }}>
          Change
        </EditButton>
      </CardContent>
    </CustomCard>
  );
};

const UserCard = ({ title, description, users }) => {
  return (
    <CustomCard>
      <CardContent>
        <CustomCardHeader variant="h6">{title}</CustomCardHeader>
        <CustomCardContent>{description}</CustomCardContent>
        <CustomStack direction="row" spacing={1}>
          {users.map((user, index) => (
            <Avatar
              title={user.name}
              key={index}
              alt={user.avatar.alt}
              src={user.avatar.src}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </CustomStack>
        <Box my={2} sx={{ display: "flex" }}>
          <Typography mr={1}>Action:</Typography>
          <Typography fontWeight={"bold"}>Review</Typography>
        </Box>
        <Divider my={2} />
        <ActionButton variant="contained" size="small" sx={{ float: "right" }}>
          Change
        </ActionButton>
      </CardContent>
    </CustomCard>
  );
};

const IntegrationCard = ({ title, description, system, stepType, params }) => {
  return (
    <CustomCard>
      <CardContent>
        <CustomCardHeader variant="h6">{title}</CustomCardHeader>
        <CustomCardContent>{description}</CustomCardContent>
        <Box my={2} sx={{ display: "flex" }}>
          <Typography mr={1}>System:</Typography>
          <Typography fontWeight={"bold"} color={"primary.main"}>
            {system}
          </Typography>
        </Box>
        <Box my={2} sx={{ display: "flex" }}>
          <Typography mr={1}>Step Type:</Typography>
          <Typography fontWeight={"bold"} color={"primary.main"}>
            {stepType}
          </Typography>
        </Box>
        <Box my={2} sx={{ display: "flex" }}>
          <Typography mr={1}>Params:</Typography>
          <Typography fontWeight={"bold"} color={"primary.main"}>
            {params?.join(", ")}
          </Typography>
        </Box>
        <Divider my={2} />
        <ActionButton variant="contained" size="small" sx={{ float: "right" }}>
          Change
        </ActionButton>
      </CardContent>
    </CustomCard>
  );
};

function Workflow() {
  const [openWorkflow, setWorkflowOpen] = useState(false);
  const [openUserStep, setOpenUserStep] = useState(false);
  const [openLogicalStep, setOpenLogicalStep] = useState(false);
  const [openIntegrationStep, setOpenIntegrationStep] = useState(false);
  const [workflowJSON, setWorkflowJSON] = useState(workflowStepsJSON);

  const WorkflowPlusIcon = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
      setOpen(false);
    };

    const handleListItemClick = (value) => {
      handleClose();
      switch (value) {
        case "Add User Step":
          setOpenUserStep(true);
          break;
        case "Add Integration Step":
          setOpenIntegrationStep(true);
          break;
        case "Add Logical Branch":
          setOpenLogicalStep(true);
          break;
        default:
          break;
      }
    };

    return (
      <>
        <IconButton
          aria-controls="workflow-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setOpen(true);
          }}
          sx={{ color: "primary.main" }}
        >
          <PlusIcon />
        </IconButton>
        <Menu
          id="workflow-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          {["Add User Step", "Add Integration Step", "Add Logical Branch"].map(
            (option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={() => handleListItemClick(option)}
              >
                <ListItemIcon>
                  <Plus />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            )
          )}
        </Menu>
      </>
    );
  };

  const WorkflowVisualizer = ({ item, index }) => {
    if (item?.childNode?.length === 2) {
      return (
        <>
          <WorkflowVisualizer
            key={index}
            item={{ ...item, childNode: [] }}
            index={index}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {item.childNode?.map((childItem, childIndex) => (
              <WorkflowContainer key={childIndex}>
                <WorkflowVisualizer
                  key={childIndex}
                  item={childItem}
                  index={childIndex}
                />
              </WorkflowContainer>
            ))}
          </Box>
        </>
      );
    } else if (item.node === "main-node") {
      return (
        <>
          <StartingCard
            key={index}
            title={item.title}
            description={item.description}
          />
          <WorkflowPlusIcon />
          {item.childNode?.map((childItem, childIndex) => (
            <WorkflowVisualizer
              key={childIndex}
              item={childItem}
              index={childIndex}
            />
          ))}
        </>
      );
    } else if (item.node === "logical-node") {
      return (
        <>
          <LogicalCard
            key={index}
            title={item.title}
            description={item.description}
          />
          <WorkflowPlusIcon />
          {item.childNode?.map((childItem, childIndex) => (
            <WorkflowVisualizer
              key={childIndex}
              item={childItem}
              index={childIndex}
            />
          ))}
        </>
      );
    } else if (item.node === "user-node") {
      return (
        <>
          <UserCard
            key={index}
            title={item.title}
            description={item.description}
            users={item.users}
          />
          <WorkflowPlusIcon />
          {item.childNode?.map((childItem, childIndex) => (
            <WorkflowVisualizer
              key={childIndex}
              item={childItem}
              index={childIndex}
            />
          ))}
        </>
      );
    } else if (item.node === "integration-node") {
      return (
        <>
          <IntegrationCard
            key={index}
            title={item.title}
            description={item.description}
            system={item.system}
            stepType={item.stepType}
            params={item.params}
          />
          <WorkflowPlusIcon />
          {item.childNode?.map((childItem, childIndex) => (
            <WorkflowVisualizer
              key={childIndex}
              item={childItem}
              index={childIndex}
            />
          ))}
        </>
      );
    }
  };

  return (
    <React.Fragment>
      {workflowJSON && workflowJSON?.length > 0 ? (
        <WorkflowContainer>
          {workflowJSON?.map((item, index) => {
            return <WorkflowVisualizer key={index} item={item} />;
          })}
        </WorkflowContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ paddingBlock: 20 }}>
            <Typography variant="body1" color="textSecondary">
              Create Your Workflow Here
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus />}
              sx={{ mt: 2 }}
              onClick={() => setWorkflowOpen(true)}
            >
              Create New
            </Button>
          </Box>
        </Box>
      )}
      <WorkflowModal show={openWorkflow} setShow={setWorkflowOpen} />
      <UserModal show={openUserStep} setShow={setOpenUserStep} />
      <LogicalBranchModal show={openLogicalStep} setShow={setOpenLogicalStep} />
      <IntegrationModal
        show={openIntegrationStep}
        setShow={setOpenIntegrationStep}
      />
    </React.Fragment>
  );
}
export default Workflow;
