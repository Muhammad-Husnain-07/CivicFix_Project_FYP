import React, { useState } from "react";
import {
  FormControl,
  Grid,
  IconButton as MuiIconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography as MuiTypography,
  styled,
} from "@mui/material";
import { spacing } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const Typography = styled(MuiTypography)(spacing);
const IconButton = styled(MuiIconButton)(({ theme }) => ({
  height: "80%",
  alignSelf: "center",
  marginLeft: "10px",
}));

const SecurityAndComplianceConfigurator = () => {
  const [dropdowns, setDropdowns] = useState([
    {
      label: "Ref # Format",
      name: "refNoFormat",
      value: ["Numeric", "Alphanumeric", "Date-based"],
    },
    {
      label: "Name Types",
      name: "nameTypes",
      value: ["Personal", "Company", "Organization"],
    },
    {
      label: "Channels",
      name: "channels",
      value: ["POS", "Web", "ATM", "App", "IVR", "Others"],
    },
    {
      label: "Category",
      name: "category",
      value: [
        "Card transactions",
        "International Funds Transfers",
        "Domestic Funds Transfers",
        "Bill Payments",
        "Cash Deposits",
        "Cash Withdrawals",
      ],
    },
    {
      label: "Sub Category",
      name: "subCategory",
      value: [
        "Unauthorized",
        "Duplicate / multiple",
        "Amount different",
        "Fraudulent (lost / stolen)",
        "Product not received",
        "Returns / refunds",
        "Credit not processed",
        "Cancelled",
        "Logs errors",
        "Paid by other means",
        "Undispensed cash",
        "Miscellaneous",
      ],
    },
    {
      label: "Source",
      name: "source",
      value: ["API", "Database", "File Import"],
    },
    {
      label: "Data Sources",
      name: "dataSources",
      value: ["Internal Database", "External API", "CSV Files"],
    },
    {
      label: "Database Type",
      name: "databaseType",
      value: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Report",
      name: "report",
      value: ["Monthly Report", "Quarterly Report", "Annual Report"],
    },
    {
      label: "Time Zone",
      name: "timeZone",
      value: ["UTC-08:00", "UTC+01:00", "UTC+09:00"],
    },
    {
      label: "Calendar",
      name: "calendar",
      value: ["Gregorian", "Islamic", "Chinese Lunar"],
    },
    {
      label: "Currency1",
      name: "currency1",
      value: ["USD", "EUR", "JPY"],
    },
    {
      label: "Currency2",
      name: "currency2",
      value: ["GBP", "CNY", "AUD"],
    },
    {
      label: "Currency3",
      name: "currency3",
      value: ["CAD", "CHF", "INR"],
    },
  ]);
  const [configuration, setConfiguration] = useState({
    refNoFormat: "",
    nameTypes: "",
    channels: "",
    category: "",
    subCategory: "",
    source: "",
    dataSources: "",
    databaseType: "",
    report: "",
    timeZone: "",
    calendar: "",
    currency1: "",
    currency2: "",
    currency3: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfiguration({
      ...configuration,
      [name]: value,
    });
  };

  const renderDropdown = (label, name, value) => (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          value={configuration[name]}
          onChange={handleChange}
          inputProps={{ name }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {value.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton>
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Configure the Security and Compliance
        </Typography>
      </Grid>
      {dropdowns?.map((item) => (
        <Grid item xs={12} display={"flex"} alignContent={"center"}>
          {renderDropdown(item.label, item.name, item.value)}
        </Grid>
      ))}
    </Grid>
  );
};

export default SecurityAndComplianceConfigurator;
