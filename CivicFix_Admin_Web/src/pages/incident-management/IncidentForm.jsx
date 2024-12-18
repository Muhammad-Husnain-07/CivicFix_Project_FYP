// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   MenuItem,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import {
//   DatePicker,
//   DateTimePicker,
//   LocalizationProvider,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { X } from "lucide-react";

// const validationSchema = Yup.object({
//   referenceNumber: Yup.string().required("Reference Number is required"),
//   date: Yup.date().required("Date is required"),
//   time: Yup.date().required("Time is required"),
//   channel: Yup.string().required("Channel is required"),
//   customerId: Yup.string().required("Customer ID is required"),
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   email: Yup.string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   mobile: Yup.string().required("Mobile is required"),
//   serviceProvider: Yup.string().required("Service Provider is required"),
//   disputeCategory: Yup.string().required("Dispute Category is required"),
//   subCategory: Yup.string().required("Sub Category is required"),
//   transactionRef: Yup.string().required("Transaction Ref# is required"),
//   amountTxn: Yup.number().required("Amount (Txn CCY) is required"),
//   amountCard: Yup.number().required("Amount (Card CCY) is required"),
//   txnDate: Yup.date().required("Transaction Date is required"),
//   remarks: Yup.string().required("Remarks are required"),
//   criticality: Yup.string().required("Criticality is required"),
//   merchantName: Yup.string().required("Merchant Name is required"),
//   merchantCity: Yup.string().required("Merchant City is required"),
//   merchantLocation: Yup.string().required("Merchant Location is required"),
//   status: Yup.string().required("Status is required"),
// });

// export const IncidentForm = ({ theme, open, handleClose }) => {
//   const generateRefNumber = () => {
//     const prefix = "XFR";
//     const part1 = Math.floor(100 + Math.random() * 900); // generates a number between 100 and 999
//     const part2 = Math.floor(10000 + Math.random() * 90000); // generates a number between 10000 and 99999
//     const ref = `${prefix}-${part1}-${part2}`;
//     return ref;
//   };

//   const formik = useFormik({
//     initialValues: {
//       referenceNumber: generateRefNumber(),
//       date: new Date(),
//       time: "",
//       channel: "",
//       customerId: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       mobile: "",
//       serviceProvider: "",
//       disputeCategory: "",
//       subCategory: "",
//       transactionRef: "",
//       amountTxn: "",
//       amountCard: "",
//       txnDate: null,
//       remarks: "",
//       criticality: "",
//       merchantName: "",
//       merchantCity: "",
//       merchantLocation: "",
//       status: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       handleClose();
//     },
//   });

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md">
//       <DialogTitle>
//         <Grid
//           container
//           display={"flex"}
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <Grid item>Add New Incident</Grid>
//           <Grid item>
//             <IconButton aria-label="close" onClick={handleClose}>
//               <X />
//             </IconButton>
//           </Grid>
//         </Grid>
//       </DialogTitle>
//       <DialogContent dividers>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Reference Number"
//                 name="referenceNumber"
//                 value={formik.values.referenceNumber}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.referenceNumber &&
//                   Boolean(formik.errors.referenceNumber)
//                 }
//                 helperText={
//                   formik.touched.referenceNumber &&
//                   formik.errors.referenceNumber
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                  <DatePicker
//                   label="Select Date"
//                   value={formik.values.date}
//                   onChange={(date) => formik.setFieldValue("date", date)}
//                   slotProps={{ textField: { fullWidth: true } }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       error={
//                         formik.touched.date && Boolean(formik.errors.date)
//                       }
//                       helperText={
//                         formik.touched.date && formik.errors.date
//                       }
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>

//             <Grid item xs={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                  <TimePicker
//                   label="Select Time"
//                   value={formik.values.time}
//                   onChange={(time) => formik.setFieldValue("date", time)}
//                   slotProps={{ textField: { fullWidth: true } }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       error={
//                         formik.touched.time && Boolean(formik.errors.time)
//                       }
//                       helperText={
//                         formik.touched.time && formik.errors.time
//                       }
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Channel"
//                 name="channel"
//                 value={formik.values.channel}
//                 onChange={formik.handleChange}
//                 error={formik.touched.channel && Boolean(formik.errors.channel)}
//                 helperText={formik.touched.channel && formik.errors.channel}
//               >
//                 <MenuItem value="POS">POS</MenuItem>
//                 <MenuItem value="Web">Web</MenuItem>
//                 <MenuItem value="ATM">ATM</MenuItem>
//                 <MenuItem value="App">App</MenuItem>
//                 <MenuItem value="Others">Others</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Customer ID"
//                 name="customerId"
//                 value={formik.values.customerId}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.customerId && Boolean(formik.errors.customerId)
//                 }
//                 helperText={
//                   formik.touched.customerId && formik.errors.customerId
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 name="firstName"
//                 value={formik.values.firstName}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.firstName && Boolean(formik.errors.firstName)
//                 }
//                 helperText={formik.touched.firstName && formik.errors.firstName}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 name="lastName"
//                 value={formik.values.lastName}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.lastName && Boolean(formik.errors.lastName)
//                 }
//                 helperText={formik.touched.lastName && formik.errors.lastName}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Mobile"
//                 name="mobile"
//                 value={formik.values.mobile}
//                 onChange={formik.handleChange}
//                 error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//                 helperText={formik.touched.mobile && formik.errors.mobile}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Service Provider"
//                 name="serviceProvider"
//                 value={formik.values.serviceProvider}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.serviceProvider &&
//                   Boolean(formik.errors.serviceProvider)
//                 }
//                 helperText={
//                   formik.touched.serviceProvider &&
//                   formik.errors.serviceProvider
//                 }
//               >
//                 <MenuItem value="Visa">Visa</MenuItem>
//                 <MenuItem value="Master">Master</MenuItem>
//                 <MenuItem value="Bank">Bank</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Dispute Category"
//                 name="disputeCategory"
//                 value={formik.values.disputeCategory}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.disputeCategory &&
//                   Boolean(formik.errors.disputeCategory)
//                 }
//                 helperText={
//                   formik.touched.disputeCategory &&
//                   formik.errors.disputeCategory
//                 }
//               >
//                 <MenuItem value="Card transactions">Card transactions</MenuItem>
//                 <MenuItem value="International Funds Transfers">
//                   International Funds Transfers
//                 </MenuItem>
//                 <MenuItem value="Domestic Funds Transfers">
//                   Domestic Funds Transfers
//                 </MenuItem>
//                 <MenuItem value="Bill Payments">Bill Payments</MenuItem>
//                 <MenuItem value="Cash Deposits">Cash Deposits</MenuItem>
//                 <MenuItem value="Cash Withdrawals">Cash Withdrawals</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Sub Category"
//                 name="subCategory"
//                 value={formik.values.subCategory}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.subCategory &&
//                   Boolean(formik.errors.subCategory)
//                 }
//                 helperText={
//                   formik.touched.subCategory && formik.errors.subCategory
//                 }
//               >
//                 <MenuItem value="Unauthorized">Unauthorized</MenuItem>
//                 <MenuItem value="Duplicate / multiple">
//                   Duplicate / multiple
//                 </MenuItem>
//                 <MenuItem value="Amount different">Amount different</MenuItem>
//                 <MenuItem value="Fraudulent (lost / stolen)">
//                   Fraudulent (lost / stolen)
//                 </MenuItem>
//                 <MenuItem value="Product not received">
//                   Product not received
//                 </MenuItem>
//                 <MenuItem value="Returns / refunds">Returns / refunds</MenuItem>
//                 <MenuItem value="Credit not processed">
//                   Credit not processed
//                 </MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//                 <MenuItem value="Billing errors">Billing errors</MenuItem>
//                 <MenuItem value="Paid by other means">
//                   Paid by other means
//                 </MenuItem>
//                 <MenuItem value="Undispensed cash">Undispensed cash</MenuItem>
//                 <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Transaction Ref#"
//                 name="transactionRef"
//                 value={formik.values.transactionRef}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.transactionRef &&
//                   Boolean(formik.errors.transactionRef)
//                 }
//                 helperText={
//                   formik.touched.transactionRef && formik.errors.transactionRef
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Amount (Txn CCY)"
//                 name="amountTxn"
//                 value={formik.values.amountTxn}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.amountTxn && Boolean(formik.errors.amountTxn)
//                 }
//                 helperText={formik.touched.amountTxn && formik.errors.amountTxn}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Amount (Card CCY)"
//                 name="amountCard"
//                 value={formik.values.amountCard}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.amountCard && Boolean(formik.errors.amountCard)
//                 }
//                 helperText={
//                   formik.touched.amountCard && formik.errors.amountCard
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   label="Transaction Date"
//                   value={formik.values.txnDate}
//                   onChange={(date) => formik.setFieldValue("txnDate", date)}
//                   slotProps={{ textField: { fullWidth: true } }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       error={
//                         formik.touched.txnDate && Boolean(formik.errors.txnDate)
//                       }
//                       helperText={
//                         formik.touched.txnDate && formik.errors.txnDate
//                       }
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Remarks"
//                 name="remarks"
//                 value={formik.values.remarks}
//                 onChange={formik.handleChange}
//                 error={formik.touched.remarks && Boolean(formik.errors.remarks)}
//                 helperText={formik.touched.remarks && formik.errors.remarks}
//                 multiline
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Criticality"
//                 name="criticality"
//                 value={formik.values.criticality}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.criticality &&
//                   Boolean(formik.errors.criticality)
//                 }
//                 helperText={
//                   formik.touched.criticality && formik.errors.criticality
//                 }
//               >
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Merchant Name"
//                 name="merchantName"
//                 value={formik.values.merchantName}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.merchantName &&
//                   Boolean(formik.errors.merchantName)
//                 }
//                 helperText={
//                   formik.touched.merchantName && formik.errors.merchantName
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Merchant City"
//                 name="merchantCity"
//                 value={formik.values.merchantCity}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.merchantCity &&
//                   Boolean(formik.errors.merchantCity)
//                 }
//                 helperText={
//                   formik.touched.merchantCity && formik.errors.merchantCity
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Merchant Location"
//                 name="merchantLocation"
//                 value={formik.values.merchantLocation}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.merchantLocation &&
//                   Boolean(formik.errors.merchantLocation)
//                 }
//                 helperText={
//                   formik.touched.merchantLocation &&
//                   formik.errors.merchantLocation
//                 }
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Status"
//                 name="status"
//                 value={formik.values.status}
//                 onChange={formik.handleChange}
//                 error={formik.touched.status && Boolean(formik.errors.status)}
//                 helperText={formik.touched.status && formik.errors.status}
//               />
//             </Grid>
//           </Grid>
//           <DialogActions>
//             <Button variant="contained" onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button variant="contained" type="submit" color="primary">
//               Submit
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { X } from "lucide-react";

const validationSchema = Yup.object({
  referenceNumber: Yup.string().required("Reference Number is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.date().required("Time is required"),
  channel: Yup.string().required("Channel is required"),
  source: Yup.string().required("Source is required"),
  customerId: Yup.string().required("Customer ID is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile is required"),
  serviceProvider: Yup.string().required("Service Provider is required"),
  disputeCategory: Yup.string().required("Dispute Category is required"),
  subCategory: Yup.string().required("Sub Category is required"),
  transactionRef: Yup.string().required("Transaction Ref# is required"),
  amountTxn: Yup.number().required("Amount (Txn CCY) is required"),
  amountCard: Yup.number().required("Amount (Card CCY) is required"),
  txnDate: Yup.date().required("Transaction Date is required"),
  remarks: Yup.string().required("Remarks are required"),
  criticality: Yup.string().required("Criticality is required"),
  merchantName: Yup.string().required("Merchant Name is required"),
  merchantCity: Yup.string().required("Merchant City is required"),
  merchantLocation: Yup.string().required("Merchant Location is required"),
  status: Yup.string().required("Status is required"),
});

export const IncidentForm = ({ theme, open, handleClose }) => {
  const generateRefNumber = () => {
    const prefix = "XFR";
    const part1 = Math.floor(100 + Math.random() * 900); // generates a number between 100 and 999
    const part2 = Math.floor(10000 + Math.random() * 90000); // generates a number between 10000 and 99999
    const ref = `${prefix}-${part1}-${part2}`;
    return ref;
  };

  const formik = useFormik({
    initialValues: {
      referenceNumber: generateRefNumber(),
      date: new Date(),
      time: new Date(),
      channel: "",
      source: "",
      customerId: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      serviceProvider: "",
      disputeCategory: "",
      subCategory: "",
      transactionRef: "",
      amountTxn: "",
      amountCard: "",
      txnDate: new Date(),
      remarks: "",
      criticality: "",
      merchantName: "",
      merchantCity: "",
      merchantLocation: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        referenceNumber: values.referenceNumber,
        time: values.time.toTimeString().split(" ")[0],
        date: values.date.toISOString(),
        channel: values.channel,
        source: values.source,
        disputeCategory: values.disputeCategory,
        customer: values.customerId,
        first: values.firstName,
        last: values.lastName,
        email: values.email,
        contact: values.mobile,
        subcategory: values.subCategory,
        transactionRef: values.transactionRef,
        amountTXCCY: values.amountTxn,
        amountCardCCY: values.amountCard,
        txDate: values.txnDate.toISOString(),
        criticality: values.criticality,
        merchant: values.merchantName,
        merchantCity: values.merchantCity,
        merchantLocation: values.merchantLocation,
        remarks: values.remarks,
        status: values.status,
        disputeRepositories: [
          {
            channel: values.channel,
            disputeCategory: values.disputeCategory,
            subcategory: values.subCategory,
            serviceProvider: values.serviceProvider,
            date: values.date.toISOString(),
          },
        ],
      };

      try {
        const response = await axios.post(
          "https://resolvex-api.graymushroom-01823765.uksouth.azurecontainerapps.io/api/Incidents",
          payload
        );
        console.log("API response:", response.data);
        // Reset the form
        formik.resetForm();
        handleClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        <Grid
          container
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>Add New Incident</Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={handleClose}>
              <X />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reference Number"
                name="referenceNumber"
                value={formik.values.referenceNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.referenceNumber &&
                  Boolean(formik.errors.referenceNumber)
                }
                helperText={
                  formik.touched.referenceNumber &&
                  formik.errors.referenceNumber
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={formik.values.date}
                  onChange={(date) => formik.setFieldValue("date", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  value={formik.values.time}  
                  onChange={(time) => formik.setFieldValue("time", time)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.time && Boolean(formik.errors.time)}
                      helperText={formik.touched.time && formik.errors.time}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Source"
                name="source"
                value={formik.values.source}
                onChange={formik.handleChange}
                error={formik.touched.source && Boolean(formik.errors.source)}
                helperText={formik.touched.source && formik.errors.source}
              >
                <MenuItem value="POS">POS</MenuItem>
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="ATM">ATM</MenuItem>
                <MenuItem value="App">App</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Channel"
                name="channel"
                value={formik.values.channel}
                onChange={formik.handleChange}
                error={formik.touched.channel && Boolean(formik.errors.channel)}
                helperText={formik.touched.channel && formik.errors.channel}
              >
                <MenuItem value="POS">POS</MenuItem>
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="ATM">ATM</MenuItem>
                <MenuItem value="App">App</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Customer ID"
                name="customerId"
                value={formik.values.customerId}
                onChange={formik.handleChange}
                error={
                  formik.touched.customerId && Boolean(formik.errors.customerId)
                }
                helperText={
                  formik.touched.customerId && formik.errors.customerId
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Service Provider"
                name="serviceProvider"
                value={formik.values.serviceProvider}
                onChange={formik.handleChange}
                error={
                  formik.touched.serviceProvider &&
                  Boolean(formik.errors.serviceProvider)
                }
                helperText={
                  formik.touched.serviceProvider &&
                  formik.errors.serviceProvider
                }
              >
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
                <MenuItem value="American Express">American Express</MenuItem>
                <MenuItem value="Diners Club">Diners Club</MenuItem>
                <MenuItem value="Bank">Bank</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Dispute Category"
                name="disputeCategory"
                value={formik.values.disputeCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.disputeCategory &&
                  Boolean(formik.errors.disputeCategory)
                }
                helperText={
                  formik.touched.disputeCategory &&
                  formik.errors.disputeCategory
                }
              >
                <MenuItem value="Card transactions">Card transactions</MenuItem>
                <MenuItem value="International Funds Transfers">
                  International Funds Transfers
                </MenuItem>
                <MenuItem value="Domestic Funds Transfers">
                  Domestic Funds Transfers
                </MenuItem>
                <MenuItem value="Bill Payments">Bill Payments</MenuItem>
                <MenuItem value="Cash Deposits">Cash Deposits</MenuItem>
                <MenuItem value="Cash Withdrawals">Cash Withdrawals</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Sub Category"
                name="subCategory"
                value={formik.values.subCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.subCategory &&
                  Boolean(formik.errors.subCategory)
                }
                helperText={
                  formik.touched.subCategory && formik.errors.subCategory
                }
              >
                <MenuItem value="Unauthorized">Unauthorized</MenuItem>
                <MenuItem value="Duplicate">Duplicate</MenuItem>
                <MenuItem value="Amount different">Amount different</MenuItem>
                <MenuItem value="Fraudulent">Fraudulent</MenuItem>
                <MenuItem value="Product not received">
                  Product not received
                </MenuItem>
                <MenuItem value="Refunds">Refunds</MenuItem>
                <MenuItem value="Credit not processed">
                  Credit not processed
                </MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Billing errors">Billing errors</MenuItem>
                <MenuItem value="Paid by other means">
                  Paid by other means
                </MenuItem>
                <MenuItem value="Undispensed cash">Undispensed cash</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Transaction Ref#"
                name="transactionRef"
                value={formik.values.transactionRef}
                onChange={formik.handleChange}
                error={
                  formik.touched.transactionRef &&
                  Boolean(formik.errors.transactionRef)
                }
                helperText={
                  formik.touched.transactionRef && formik.errors.transactionRef
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Amount (Txn CCY)"
                name="amountTxn"
                value={formik.values.amountTxn}
                onChange={formik.handleChange}
                error={
                  formik.touched.amountTxn && Boolean(formik.errors.amountTxn)
                }
                helperText={formik.touched.amountTxn && formik.errors.amountTxn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Amount (Card CCY)"
                name="amountCard"
                value={formik.values.amountCard}
                onChange={formik.handleChange}
                error={
                  formik.touched.amountCard && Boolean(formik.errors.amountCard)
                }
                helperText={
                  formik.touched.amountCard && formik.errors.amountCard
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction Date"
                  value={formik.values.txnDate}
                  onChange={(date) => formik.setFieldValue("txnDate", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        formik.touched.txnDate && Boolean(formik.errors.txnDate)
                      }
                      helperText={
                        formik.touched.txnDate && formik.errors.txnDate
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={formik.touched.remarks && formik.errors.remarks}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Criticality"
                name="criticality"
                value={formik.values.criticality}
                onChange={formik.handleChange}
                error={
                  formik.touched.criticality &&
                  Boolean(formik.errors.criticality)
                }
                helperText={
                  formik.touched.criticality && formik.errors.criticality
                }
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Merchant Name"
                name="merchantName"
                value={formik.values.merchantName}
                onChange={formik.handleChange}
                error={
                  formik.touched.merchantName &&
                  Boolean(formik.errors.merchantName)
                }
                helperText={
                  formik.touched.merchantName && formik.errors.merchantName
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Merchant City"
                name="merchantCity"
                value={formik.values.merchantCity}
                onChange={formik.handleChange}
                error={
                  formik.touched.merchantCity &&
                  Boolean(formik.errors.merchantCity)
                }
                helperText={
                  formik.touched.merchantCity && formik.errors.merchantCity
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Merchant Location"
                name="merchantLocation"
                value={formik.values.merchantLocation}
                onChange={formik.handleChange}
                error={
                  formik.touched.merchantLocation &&
                  Boolean(formik.errors.merchantLocation)
                }
                helperText={
                  formik.touched.merchantLocation &&
                  formik.errors.merchantLocation
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
