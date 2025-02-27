import React, {FC} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import {Box, Card, CardContent, CardMedia, Divider, Rating, Typography} from '@mui/material';
import FavoriteButton from "../button/FavoriteButton";
import {useNavigate} from "react-router";

const RecipeItem: FC<{ recipe: RecipeType }> = ({recipe}) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": {transform: "scale(1.05)"},
            }}
        >
            <Card
                key={recipe.id}
                title={recipe.title}
                onClick={() => navigate("../RecipeDetails/" + recipe.id)}
                sx={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "left",
                    width: "100%",
                    boxShadow: 2
                }}
            >
                <CardMedia
                    component="img"
                    image={recipe.image ?
                            recipe.image
                            :
                        "https://placehold.co/200x220?text=No\nImage"
                    }
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.7)"
                    }}
                />
                <Box component={"span"} sx={{position: "absolute", top: 21, left: 21}}>
                    <FavoriteButton/>
                </Box>
                {/*{recipe.diet === "vege" && (*/}
                <Box
                    sx={{
                        position: "absolute",
                        top: 21,
                        left: "13%",
                        width: 24,
                        height: 24,
                        backgroundColor: "green",
                        borderRadius: "50%",
                    }}
                />

                <CardContent sx={{
                    flexGrow: 1,
                    maxWidth: "30%",
                    position: "relative",
                    zIndex: 1,
                    padding: 2,
                    background: "linear-gradient(to right, rgba(240,240,240,0.9),rgba(240,240,240,0.8), transparent)"
                }}>
                    <Typography
                        title={recipe.title}
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            fontSize: 19,
                            textAlign: "left",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
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
                    <Typography
                        variant="body2"
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
                {/* Barre verticale */}
                <Divider orientation="vertical" flexItem sx={{
                    zIndex: 1
                    }}/>

                <CardContent sx={{
                    zIndex: 1,
                    flexBasis: "10%", flexShrink: 0}}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Allergènes
                    </Typography>
                    <Typography variant="body2">
                        vege<br/>
                        vege<br/>
                        noix
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RecipeItem;