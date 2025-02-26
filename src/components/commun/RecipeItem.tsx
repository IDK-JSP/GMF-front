import React, {FC} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import {Box, Card, CardContent, CardMedia, Rating, Typography} from '@mui/material';
import FavoriteButton from "../button/FavoriteButton";
import {useNavigate} from "react-router";

const RecipeItem: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                margin: "1rem",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {transform: "scale(1.1)"},
            }}
        >
            <Card key={recipe.id}
                  title={recipe.title}
                  onClick={() => navigate("../RecipeDetails/" + recipe.id)}
                  sx={{display: "flex", position: "relative", width: "90%", maxWidth: 1600, padding: 2, boxShadow: 2}}>
                <CardMedia
                    component="img"
                    image={/*recipe.image ?
                            recipe.image
                            :*/
                        "https://placehold.co/200x220?text=No\nImage"
                    }
                    alt={recipe.title}
                    sx={{width: "20vh", height: "20vh"}}
                />
                <Box component={"span"} sx={{position: "absolute", top: 21, left: 21}}>
                    <FavoriteButton/>
                </Box>
                {/*{recipe.diet === "vege" && (*/}
                <Box
                    sx={{
                        position: "absolute",
                        top: 21,
                        left: 141,
                        width: 20,
                        height: 20,
                        backgroundColor: "green",
                        borderRadius: "50%",
                    }}
                />

                <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                        {recipe.title}
                        <Typography component="span" color="gray"
                                    fontSize={14}> 60min{/*{recipe.time} min*/}
                        </Typography>
                    </Typography>
                    <Rating sx={{
                        "& .MuiRating-iconFilled": {color: "orange"},
                        "& .MuiRating-iconEmpty": {color: "orange"}
                    }}
                            name="recipe-rating" defaultValue={recipe.rate} precision={0.01} readOnly/>
                    <Typography variant="body2" color="text.secondary">
                        {recipe.content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RecipeItem;
