import { Badge, Box, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { shades } from "../../theme"
import { MenuOutlined, PersonOutline, SearchOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpen } from "../../state"
const Navbar = () => {
    const dispatsh = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(((state) => state.cart.cart))
    return (
        <Box display='flex' alignItems='center' width="100%" height="60px" backgroundColor="rgba(255,255,255,0.95)" color="black"
            position="fixed" top='0' left="0" zIndex='1'>
            <Box display="flex" justifyContent={"space-between"} width="80%" margin={"auto"} alignItems={"center"}>
                <Box onClick={() => { navigate("/") }} sx={{ '&:hover': { cursor: "pointer" } }} color={shades.secondary[500]}  >Ecommerce</Box>
                <Box display={'flex'} justifyContent={'space-between'} columnGap={'20px'} zIndex={"2"}>

                    <IconButton sx={{ color: "black" }}>
                        <PersonOutline />
                    </IconButton>
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px"
                            }
                        }}
                    >
                        <IconButton sx={{ color: "black" }} onClick={() => dispatsh(setIsCartOpen({}))}>
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>

                </Box>
            </Box>
        </Box >
    )
}
export default Navbar