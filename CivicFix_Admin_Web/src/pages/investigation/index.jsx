import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Box as MuiBox,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Helmet } from "react-helmet-async";
import StepperComponent from "./StepperComponent";
import {
  ChevronLeft,
  ChevronRight,
  Clock10Icon,
  LockIcon as Lock,
} from "lucide-react";
import {
  Check,
  Groups,
  PendingActions,
  Troubleshoot,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GetAppIcon from "@mui/icons-material/GetApp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Typography = styled(MuiTypography)(spacing);
const Section = styled(MuiBox)(
  spacing,
  ({ theme }) => `
padding: ${theme.spacing(2)};
border: 1px solid ${theme.palette.divider};
border-radius: 8px;
margin-block: ${theme.spacing(3)};
-webkit-box-shadow: 1px 1px 5px 0px ${theme.palette.divider};
-moz-box-shadow: 1px 1px 5px 0px ${theme.palette.divider};
box-shadow: 1px 1px 5px 0px ${theme.palette.divider};
`
);
const Box = styled(MuiBox)(spacing);
const ListTypography = styled(MuiTypography)(
  ({ theme }) => `
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: ${theme.palette.primary.main};
    }
`
);
const Divider = styled(MuiDivider)(spacing);
const VerticalDivider = styled(MuiDivider)(
  spacing,
  ({ theme }) => `
    flex-grow: 1;
    flex-shrink: unset;
    -webkit-flex-shrink: unset;
`
);
function CollapseButton({ isSidebarOpen, toggleSidebar }) {
  return (
    <IconButton onClick={toggleSidebar}>
      {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );
}

const documents = [
  {
    title: "Sample Document 1",
    url: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    fileName: "sample1.pdf",
  },
  {
    title: "Sample Document 2",
    url: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    fileName: "sample2.pdf",
  },
  {
    title: "Sample Document 3",
    url: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    fileName: "sample3.pdf",
  },
  {
    title: "Sample Document 4",
    url: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf",
    fileName: "sample4.pdf",
  },
];

function Investigation({ theme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  const handleOpenDialog = (doc) => {
    setCurrentDoc(doc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDoc(null);
  };

  const handleDownload = (docUrl, fileName) => {
    const link = document.createElement("a");
    link.href = docUrl;
    link.download = fileName || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <React.Fragment>
      <Helmet title="Investigation" />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={2}>
          <FormControl variant="outlined" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Dispute Ref.#
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={"ATC-012-2909-90"}
              label="Dispute Ref.#"
            >
              <MenuItem value={"ATC-012-2909-90"}>ATC-012-2909-90</MenuItem>
              <MenuItem value={"ATC-012-2909-91"}>ATC-012-2909-91</MenuItem>
              <MenuItem value={"ATC-012-2909-92"}>ATC-012-2909-92</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <StepperComponent />
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container>
        {isSidebarOpen && (
          <Grid item xs={3} spacing={2}>
            <Section>
              <Grid container px={4} py={2} spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">Case Information</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="body1"
                      color={"primary.main"}
                      fontWeight={500}
                    >
                      Amit Kumar
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">Case No:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight={500}>
                      ATC-012-2909-90
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="body1"
                      color={"primary.main"}
                      fontWeight={500}
                    >
                      anu.raj@example.com
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">Created date:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight={500}>
                      2024-01-24
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">SLAs:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="body1"
                      color={"primary.main"}
                      fontWeight={500}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Clock10Icon size={15} style={{ marginRight: 5 }} />
                      11:24:30
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={4}>
                    <Typography variant="body1">Type:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight={500}>
                      Cash Jam Account Debited
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Section>
            <Section>
              <Typography variant="h5">Approval Note</Typography>
              <Box m={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      name="transactionReversal"
                      color="primary"
                    />
                  }
                  label="Transaction Reversal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      name="cashNotDispensed"
                      color="primary"
                    />
                  }
                  label="Cash Not Dispensed"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      name="accountDebited"
                      color="primary"
                    />
                  }
                  label="Account Debited"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      name="logsHaveTraces"
                      color="primary"
                    />
                  }
                  label="Logs have traces"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      name="correctionDone"
                      color="primary"
                    />
                  }
                  label="Correction Done"
                />
              </Box>
            </Section>
            <Section>
              <Box m={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      onChange={(event) => {}}
                      name="evidenceReviewed"
                      color="primary"
                    />
                  }
                  label="All Evidence reviewed"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      onChange={(event) => {}}
                      name="resolutionNoteVerified"
                      color="primary"
                    />
                  }
                  label="Resolution Note verified"
                />
              </Box>
              <Box mt={4} display="flex" justifyContent="space-evenly">
                <Button variant="contained" color="primary" onClick={() => {}}>
                  Approve
                </Button>
                <Button variant="outlined" color="primary">
                  Reject
                </Button>
              </Box>
            </Section>
          </Grid>
        )}
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VerticalDivider orientation="vertical" />
          <CollapseButton
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <VerticalDivider orientation="vertical" />
        </Grid>
        <Grid item xs={4}>
          <Section>
            <ListItemButton
              role="menuitem"
              style={{
                justifyContent: "center",
                borderRadius: 8,
                cursor: "default",
              }}
            >
              <Typography variant="h5" marginRight={2}>
                Case Team
              </Typography>
              <Groups fontSize={"medium"} />
            </ListItemButton>
            <List>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <Check
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    ATM Team
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <Check
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Switch Team
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Core Team
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Cards Team
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Audit Team
                  </ListTypography>
                </ListItemText>
              </ListItem>
            </List>
          </Section>
          <Section>
            <ListItemButton
              role="menuitem"
              style={{
                justifyContent: "center",
                borderRadius: 8,
                cursor: "default",
              }}
            >
              <Typography variant="h5" marginRight={2}>
                Investigation
              </Typography>
              <Troubleshoot fontSize={"medium"} />
            </ListItemButton>
            <List>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <Check
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Case received
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <Check
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Attachments delivered
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Review
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Data Analysis
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Result extract
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Response prepared
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Sent for approval
                  </ListTypography>
                </ListItemText>
              </ListItem>
              <ListItem component="div">
                <ListItemText>
                  <ListTypography variant="body1">
                    <PendingActions
                      style={{ marginRight: 5 }}
                      color="primary"
                      fontSize="medium"
                    />
                    Investigation close
                  </ListTypography>
                </ListItemText>
              </ListItem>
            </List>
          </Section>
        </Grid>
        <Grid item xs={isSidebarOpen ? 4 : 7}>
          {/*Document Viewer Section*/}
          <Box sx={{ ml: 8, mt: 4, borderRadius: 2, p: 2 }}>
            <Typography variant="h5">Documents</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            {documents.map((doc, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{doc.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mt: 2 }}>
                    <embed src={doc.url} width="100%" height="200px" />
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<OpenInNewIcon />}
                        onClick={() => handleOpenDialog(doc)}
                      >
                        Open in New Window
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<GetAppIcon />}
                        onClick={() => handleDownload(doc.url, doc.fileName)}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>{currentDoc?.fileName}</DialogTitle>
        <DialogContent>
          {currentDoc && (
            <embed src={currentDoc.url} width="100%" height="500px" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Investigation;
