import React, { useState, useContext } from "react";
import ControlRating from "../common/ControlRating";
import post from "../../api/post";
import { AuthContext } from "../../context/AuthContext";

const OpinionMyself: React.FC<{ recipeId: number; reloadRecipe: any }> = ({
  recipeId,
  // updateOpinions,
  reloadRecipe,
}) => {
  const authContext = useContext(AuthContext); // 🔐 Récupère le token de l'utilisateur
  const token = authContext ? authContext.token : ""; // Gère le cas où authContext est undefined
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // ✅ Gère l'état de chargement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === null) {
      setError("Veuillez donner une note.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = {
      id_recipe: recipeId,
      rate: Number(rating),
      comment: comment,
    };
    await post("/opinion/new", data, "Avis ajouté avec succès").then(
      async () => {
        await reloadRecipe();
      }
    );
    setRating(null);
    setComment("");
    setLoading(false);
  };

  return (
    <form className="opinion-myself" onSubmit={handleSubmit}>
      <div
        className="flex-row"
        style={{
          justifyContent: "start",
          gap: "10px",
        }}
      >
        <span>Ma note</span>
        <ControlRating value={rating ?? 0} setValue={setRating} />
      </div>

      <textarea
        placeholder="Votre commentaire..."
        className="opinion-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button className="opinion-submit" type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer mon avis"}{" "}
        {/* 🔄 Changement du texte du bouton */}
      </button>
      <div className="opinion-feedback">
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", fontSize: "0.9rem" }}>{success}</p>
        )}
      </div>
    </form>
  );
};

export default OpinionMyself;
