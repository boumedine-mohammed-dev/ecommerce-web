import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setItems } from "../../state";
import { Margin } from "@mui/icons-material";
import Item from '../components/Item'
const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('all');
    const stateItems = useSelector((state) => state.cart.items)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleChange = ((event, newValue) => {
        setValue(newValue)
    })
    async function getItems() {
        const items = await fetch(process.env.REACT_APP_API_URL + "/api/items?populate=image",
            { method: "GET" }
        )
        const itemsJSON = await items.json()
        dispatch(setItems(itemsJSON.data))
    }
    useEffect(() => {
        getItems();
    }, [])
    const topRatedItems = stateItems.filter(
        (item) => item.category === "topRated"
    )
    const newArrivalsItems = stateItems.filter(
        (item) => item.category === "newArrivals"
    )
    const bestSellersItems = stateItems.filter(
        (item) => item.category === "bestSallers"
    )
    return (
        <Box width="80%" margin='80px auto'>
            <p style={{ textAlign: "center", fontSize: "25px" }}>
                Our Featured <b>Prouducts</b>
            </p>
            <Tabs textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : "none" } }}
                sx={{
                    m: '25px',
                    '&.MuiTabs-flexContainer': {
                        flexWrap: 'wrap'
                    }
                }}
            >
                <Tab label="ALL" value='all' />
                <Tab label="NEW ARRIVALS" value='newArrivals' />
                <Tab label="BEST SALLERS" value='bestSallers' />
                <Tab label="TOP RATED" value='topRated' />
            </Tabs>
            <Box
                margin='0 auto'
                display='grid'
                gridTemplateColumns="repeat(auto-fill,300px)"
                justifyContent="space-around"
                rowGap='20px'
                columnGap='1.33%'
            >
                {value === "all" && stateItems.map((item, index) => {
                    return (
                        <Item key={index} item={item} />
                    )
                })}
                {value === "newArrivals" && newArrivalsItems.map((item, index) => {
                    return (
                        <Item key={index} item={item} />
                    )
                })}
                {value === "bestSallers" && bestSellersItems.map((item, index) => {
                    return (
                        <Item key={index} item={item} />
                    )
                })}
                {value === "topRated" && topRatedItems.map((item, index) => {
                    return (
                        <Item key={index} item={item} />
                    )
                })}
            </Box>
        </Box >
    )
}
export default ShoppingList