import Skeleton from "react-loading-skeleton";
import "../../styles/recipe.css";

const StageSkeleton = () => (
  <>

    <article className="recipe-stage flex-row" style={{
      boxSizing: "border-box",
      width: "100%",
    }}>
      <span style={{
        boxSizing: "border-box",
        width: "calc(100% - 50px)",
      }}>
        <Skeleton height={20} width="100%" count={1} />
      </span>
    </article>
    {Array.from({ length: 6 }).map((_, index) => (
      <article key={index} className="recipe-stage flex-row" style={{
        boxSizing: "border-box",
        width: "100%",
      }}>
        <span style={{
          boxSizing: "border-box",
          width: "calc(100% - 50px)",
        }}>
          <Skeleton height={20} width="100%" count={1} />
        </span>
      </article>
    ))}
  </>
);

export default StageSkeleton;
