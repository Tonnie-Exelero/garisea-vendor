// ** React Imports
import { useState } from "react";

// ** MUI Imports
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@components/mui/chip";

// ** Others
import { currency, availablePaymentModes } from "../../config";

interface StepPriceProps {
  handlePriceData: (data: any) => void;
  nextStep: (val: boolean) => void;
}

const StepPrice: React.FC<StepPriceProps> = (props) => {
  const { handlePriceData, nextStep } = props;

  // ** State
  const [listingPrice, setListingPrice] = useState<number>();
  const [discountedPrice, setDiscountedPrice] = useState<number>();
  const [percentageDiscount, setPercentageDiscount] = useState<number>();
  const [offerType, setOfferType] = useState<string>("");
  const [paymentModes, setPaymentModes] = useState<string[]>([]);

  const priceData = {
    listingPrice,
    discountedPrice,
    offerType,
    allowedPaymentModes: [...new Set(paymentModes)].toString(),
  };

  const handlePaymentModeChange = (
    event: SelectChangeEvent<typeof paymentModes>
  ) => {
    const {
      target: { value },
    } = event;
    setPaymentModes(typeof value === "string" ? value.split(",") : value);
  };

  const handleDiscountedPriceChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let percDiscount: number;

    if (listingPrice !== undefined) {
      const prePerc = Number(value) / listingPrice;

      percDiscount = prePerc * 100;

      setPercentageDiscount(Number((100 - percDiscount).toFixed(2)));
    }

    setDiscountedPrice(Number(value));
  };

  const confirmData = () => {
    handlePriceData(priceData);
    nextStep(true);
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="listing-price"
            aria-label="listing-price"
            type="number"
            placeholder="e.g. 900,000"
            label="Listing Price"
            value={listingPrice}
            onChange={(e) => setListingPrice(Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{currency}</InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="discounted-price"
            aria-label="discounted-price"
            type="number"
            placeholder="e.g. 850,000"
            label="Discounted Price"
            value={discountedPrice}
            onChange={handleDiscountedPriceChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{currency}</InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />
          <Typography variant="body2" color="primary">
            {percentageDiscount}% discount
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="select-offer-type">Offer Type</InputLabel>
            <Select
              fullWidth
              id="offer-type"
              labelId="select-offer-type"
              label="Offer Type"
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              inputProps={{ placeholder: "Select Offer Type" }}
            >
              <MenuItem value="early-bird">Early Bird</MenuItem>
              <MenuItem value="return-client">Return Client</MenuItem>
              <MenuItem value="complete-payment">Complete Payment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="select-payment-modes">Payment Modes</InputLabel>
            <Select
              id="payment-modes"
              labelId="select-payment-modes"
              label="Payment Modes"
              multiple
              onChange={handlePaymentModeChange}
              value={paymentModes}
              input={<OutlinedInput label="Payment Modes" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <CustomChip
                      rounded
                      key={value}
                      label={value}
                      skin="light"
                    />
                  ))}
                </Box>
              )}
              sx={{ width: "100%" }}
            >
              {availablePaymentModes.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography sx={{ mb: 2 }}>
            Confirm data entered is correct by clicking below
          </Typography>
          <Box>
            <Button color="info" variant="outlined" onClick={confirmData}>
              Confirm Data
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepPrice;