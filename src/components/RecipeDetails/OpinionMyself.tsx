import React, { useState, useContext } from "react";
import ControlRating from "../commun/ControlRating";
import postOpinion from "../../api/postOpinion";
import { AuthContext } from "../../context/AuthContext";

const OpinionMyself: React.FC<{ recipeId: number; }> = ({ recipeId }) => {
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

    setLoading(true); // 🚀 Désactiver le bouton
    setError(null);
    setSuccess(null);

    try {
      await postOpinion(recipeId, rating, comment, token);
      setSuccess("✅ Votre avis a bien été envoyé !");
      setError(null);
      setRating(null);
      setComment("");
    } catch (error) {
      setError("❌ Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false); // ✅ Réactiver le bouton après l'envoi
    }
  };

  return (
    <form className="opinion-myself" onSubmit={handleSubmit}>
      <div className="flex-row">
        <span>Ma note</span>
        <ControlRating value={rating ?? 0} setValue={setRating} />
      </div>
      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      {success && <p style={{ color: "green", fontSize: "0.9rem" }}>{success}</p>}

      <textarea
        placeholder="Votre commentaire..."
        className="opinion-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button className="opinion-submit" type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer"} {/* 🔄 Changement du texte du bouton */}
      </button>
    </form>
  );
};

export default OpinionMyself;
