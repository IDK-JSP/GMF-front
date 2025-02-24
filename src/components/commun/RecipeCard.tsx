import {FC} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import FavoriteButton from "../button/FavoriteButton";

const recipe = {
    "id": 1,
    "email": "user1@example.com",
    "title": "Pâtes Carbonara",
    "content": "Une recette italienne classique avec des œufs, du parmesan et du lard.",
    "image": "",
    "person": "Alice Dupont",
    "state": "published",
    "rate": 3.2,
    "nb_rate": 120,
    "create": "2025-01-10",
    "update": "2025-02-15"
}

const RecipeCard: FC<{/*recipe : RecipeType*/ }> = ({}) => {
    //const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: 250,
                width: 200,
                margin: "15px 10px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {transform: "scale(1.1)"},
            }}
        >
            <Button /* onClick={() => navigate("../RecipeDetails/" + recipe.id)} */>
                <Card sx={{position: "relative"}}>
                    <CardMedia
                        sx={{height: 106, width: 200}}
                        component="img"
                        image={recipe.image ?
                            recipe.image
                            :
                            "https://placehold.co/100x150?text=No\nImage"
                        }
                        alt={recipe.title}
                    />
                    <Box sx={{position: "absolute", top: 5, left: 5}}>
                        <FavoriteButton/>
                    </Box>
                    {/*{recipe.diet === "vege" && (
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
                    )}*/}

                    <CardContent
                        sx={{
                            padding: "10px !important",
                            height: 130,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "lightgray",
                        }}>
                        <Box sx={{display: "flex", flexDirection: "column", overflow: "hidden",
                            "& > *": {mb: "5px"}, // Ajoute un margin bottom à chaque enfant
                            "& > *:last-child": {mb: 0}, // Sauf le dernier
                        }}>

                            {/* Nom */}
                            <Typography
                                variant="h6"
                                component="div"
                                title={recipe.title}
                                sx={{
                                    fontSize: 17,
                                    textAlign: "left",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                {recipe.title}
                            </Typography>

                            {/* Durée */}
                            <Typography sx={{fontSize: 12, color: "gray", textAlign: "left"}}>
                                60 min {/*{recipe.time} min*/}
                            </Typography>

                            {/* Note */}
                            <Box sx={{display: "flex", justifyContent: "center"}}>
                                <Rating name="recipe-rating" defaultValue={recipe.rate} precision={0.25} readOnly/>
                            </Box>

                            {/* Description */}
                            <Typography sx={{
                                fontSize: 12,
                                color: "gray",
                                textAlign: "center",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {recipe.content}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Button>
        </Box>
    )
};

export default RecipeCard;
