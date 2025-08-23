import { Box } from "@mui/material"
import { getIn } from "formik";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange, }) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const FormattedName = (field) => `${type}.${field}`
    const FormattedError = (field) =>
        Boolean(
            getIn(touched, FormattedName(field)) &&
            getIn(errors, FormattedName(field))
        )
    const formattedHelper = (field) =>
        getIn(touched, FormattedName(field)) && getIn(errors, FormattedName(field))
    return (
        <Box
            display="grid"
            gap="15px "
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
            <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={FormattedName("firstName")}
                error={FormattedError("firstName")}
                helperText={formattedHelper("firstName")}
                sx={{ gridColumn: "span 2" }}

            />
            <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name={FormattedName("lastName")}
                error={FormattedError("lastName")}
                helperText={formattedHelper("lastName")}
                sx={{ gridColumn: "span 2" }}

            />
            <TextField
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name={FormattedName("country")}
                error={FormattedError("country")}
                helperText={formattedHelper("country")}
                sx={{ gridColumn: "span 4" }}

            />
            <TextField
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street1}
                name={FormattedName("street1")}
                error={FormattedError("street1")}
                helperText={formattedHelper("street1")}
                sx={{ gridColumn: "span 2" }}

            />
            <TextField
                fullWidth
                type="text"
                label="Street Address 2 (optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street2}
                name={FormattedName("street2")}
                error={FormattedError("street2")}
                helperText={formattedHelper("street2")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name={FormattedName("city")}
                error={FormattedError("city")}
                helperText={formattedHelper("city")}
                sx={{ gridColumn: "span 2" }}
            />
            <TextField
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name={FormattedName("state")}
                error={FormattedError("state")}
                helperText={formattedHelper("state")}
                sx={{ gridColumn: "1fr" }}
            />
            <TextField
                fullWidth
                type="text"
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name={FormattedName("zipCode")}
                error={FormattedError("zipCode")}
                helperText={formattedHelper("zipCode")}
                sx={{ gridColumn: "1fr" }}
            />


        </Box>

    )
}
export default AddressForm