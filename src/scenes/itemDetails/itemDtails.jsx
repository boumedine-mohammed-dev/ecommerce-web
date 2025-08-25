import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { shades } from "../../theme";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToCart } from "../../state";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Item from "../components/Item";

const ItemDtails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    console.log(itemId)
    async function getItem() {
        const item = await fetch(`${process.env.REACT_APP_API_URL}/api/items/${itemId}?populate=image`,
            { method: "GET" }
        );
        const itemJson = await item.json()
        setItem(itemJson.data)
    }
    async function getItems() {
        const items = await fetch(process.env.REACT_APP_API_URL + "/api/items?populate=image",
            { method: "GET" }
        )
        const itemsJSON = await items.json()
        setItems(itemsJSON.data)
    }
    useEffect(() => {
        getItem()
        getItems()
    }, [itemId])

    return (
        <Box width="80%" m="80px auto">
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                <Box flex="1 1 40%" mb="40px">
                    <img
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        src={`${item?.image?.url}`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>
                <Box flex="1 1 50%" mb="40px">
                    <Box display="flex" justifyContent="space-between">
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>
                    <Box m="65px 25px 0">
                        <Typography variant="h3">{item?.name}</Typography>
                        <Typography>${item?.price}</Typography>
                        <Typography sx={{ mt: "40px" }}>{item?.longDescription[0]?.children[0]?.text}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" minHeight="50px" mt="40px">
                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.natural[300]}`}
                            mr="20px"
                            p="2px 5px "
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button sx={{
                            backgroundColor: "#222222",
                            color: "white",
                            borderRadius: 0,
                            minWidth: "150px",
                            padding: "10px 40px"
                        }}
                            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}>
                            ADD TO CART
                        </Button>
                    </Box>
                    <Box>
                        <Box m="20px 0 5px 0" display="flex">
                            <FavoriteBorderOutlined />
                            <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                        </Box>
                        <Typography> CATEGORIES: {item?.category}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
            </Box>
            <Box display='flex' flexWrap="wrap" gap="15px">
                {value === 'reviews' && <div>reviews</div>}
            </Box>
            <Box mt='50px' width="100%">
                <Typography variant="h3" fontWeight="bold">
                    Related Products

                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {items.slice(0, 4).map((item, i) => {
                        return (
                            <Item key={i} item={item} />
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}
export default ItemDtails