import {FC} from 'react';
import {Box, Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import FavoriteButton from "../button/FavoriteButton";
import {RecipeType} from "../../1_types/RecipeType";
import {useNavigate} from "react-router";

const RecipeCard: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                margin: "1rem 0.6rem",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {transform: "scale(1.1)"},
            }}
        >
            <Card
                key={recipe.id}
                title={recipe.title}
                sx={{position: "relative"}}
                onClick={() => navigate("../RecipeDetails/" + recipe.id)}
            >
                <CardMedia
                    sx={{height: "12rem", width: "17rem"}}
                    component="img"
                    image={/*recipe.image ?
                            recipe.image
                            :*/
                        "https://placehold.co/200x220?text=No\nImage"
                    }
                    alt={recipe.title}
                />

                <Box component={"span"} sx={{position: "absolute", top: 5, left: 5}}>
                    <FavoriteButton/>
                </Box>
                {/*{recipe.diet === "vege" && (*/}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                width: 20,
                                height: 20,
                                backgroundColor: "green",
                                borderRadius: "50%",
                            }}
                        />

                <CardContent
                    sx={{
                        padding: "10px !important",
                        height: 140,
                        width: 250,
                        display: "flex",
                        //justifyContent: "space-between",
                        flexDirection: "column",
                        backgroundColor: "lightgray",
                        overflow: "hidden"
                    }}>

                    {/* Nom */}
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        title={recipe.title}
                        sx={{
                            fontSize: 19,
                            textAlign: "left",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {recipe.title}
                    </Typography>

                    <Box>
                        <Typography
                            gutterBottom
                            sx={{fontSize: 14, color: "gray", display: "flex", justifyContent: "space-between"}}>
                            {/* Durée */}
                            60 min {/*{recipe.time} min*/}
                            {/* Note */}
                            <Rating sx={{
                                "& .MuiRating-iconFilled": {color: "orange"},
                                "& .MuiRating-iconEmpty": {color: "orange"}
                            }}
                                    name="recipe-rating" defaultValue={recipe.rate} precision={0.01} readOnly/>
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                        title={recipe.content}
                        gutterBottom
                        sx={{
                            fontSize: 15,
                            color: "black",
                            textAlign: "left",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                        {recipe.content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
};

export default RecipeCard;