import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { shades } from "../../theme";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToCart } from "../../state";

const Item = (item, width) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    (item)
    const {
        palette: { natural },
    } = useTheme();
    const { category, price, name, image } = item.item;
    ("dddddd", category, price, name, image)

    const {
        formats: {
            medium: { url },
        }
    } = image;
    ("wwwww", `$${url}`)
    return (
        <Box width={width}>
            <Box
                position={'relative'}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img alt={item.name}
                    width={"300px"}
                    height={'400px'}
                    src={`${url}`}
                    onClick={() => navigate(`/item/${item.item.documentId}`)}
                    style={{ cursor: 'pointer' }}
                />
                <Box
                    display={isHovered ? "blocked" : "none"}
                    position={"absolute"}
                    bottom={"10%"}
                    left={'0'}
                    width={'100%'}
                    padding={'0 5%'}
                >
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'}
                            alignItems={'center'}
                            backgroundColor={shades.natural[100]}
                            borderRadius={"3px"}
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button onClick={() => dispatch(addToCart({ item: { ...item.item, count } }))}
                            sx={{ backgroundColor: shades.primary[300], color: "white" }}
                        >
                            Add to Cart
                        </Button>

                    </Box>

                </Box>
            </Box>
            <Box mt='3px'>
                <Typography variant="subtitle2" color={natural.dark}>
                    {category.replace(/([A-Z])/g, "$1").replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight={'bold'} >$ {price} </Typography>
            </Box>
        </Box >
    )
}
export default Item