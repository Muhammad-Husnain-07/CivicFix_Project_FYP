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

const LocationAndTimeConfigurator = () => {
  const [dropdowns, setDropdowns] = useState([
    {
      label: "Region",
      name: "region",
      value: ["North America", "Europe", "Asia"],
    },
    {
      label: "Country",
      name: "country",
      value: ["United States", "Germany", "Japan"],
    },
    {
      label: "Time Zone",
      name: "timeZone",
      value: ["UTC-05:00", "UTC+02:00", "UTC+08:00"],
    },
    {
      label: "Currency1",
      name: "currency",
      value: ["USD", "EUR", "JPY"],
    },
    {
      label: "Currency2",
      name: "currency",
      value: ["GBP", "CNY", "AUD"],
    },
    {
      label: "Language",
      name: "language",
      value: ["English", "German", "Japanese"],
    },
    {
      label: "Week Days",
      name: "weekDays",
      value: ["Monday", "Wednesday", "Friday"],
    },
    {
      label: "Month End",
      name: "monthEnd",
      value: ["30th", "31st", "End of lunar month"],
    },
    {
      label: "Calendar",
      name: "calendar",
      value: ["Gregorian", "Chinese", "Islamic"],
    },
    {
      label: "Local Tax",
      name: "localTax",
      value: ["7%", "10%", "15%"],
    },
    {
      label: "VAT",
      name: "vat",
      value: ["20%", "25%", "No VAT"],
    },
  ]);
  const [configuration, setConfiguration] = useState({
    region: "",
    country: "",
    timeZone: "",
    currency1: "",
    currency2: "",
    currency3: "",
    language: "",
    weekDays: "",
    monthEnd: "",
    calendar: "",
    localTax: "",
    vat: "",
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
          Configure the Location and Time Zone
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

export default LocationAndTimeConfigurator;
