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
                key={recipe.id_recipe}
                title={recipe.title}
                sx={{position: "relative", boxShadow: 2}}
                onClick={() => navigate("../RecipeDetails/" + recipe.id_recipe)}
            >
                <CardMedia
                    component="img"
                    image={/*recipe.image ?
                            recipe.image
                            :*/
                        "https://placehold.co/500x500?text=No\nImage"
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
                                top: 7,
                                right: 7,
                                width: 24,
                                height: 24,
                                backgroundColor: "green",
                                borderRadius: "50%",
                            }}
                        />

                <CardContent
                    sx={{
                        padding: "5% !important",
                        height: "100%",
                        width: "90%",
                        display: "flex",
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