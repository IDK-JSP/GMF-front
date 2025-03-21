import Skeleton from "react-loading-skeleton";

const OpinionsSkeleton = () => (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Skeleton height={70} width="100%" />
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
      <div className="opinion-item">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" />
      </div>
    </div>
  </>
);

export default OpinionsSkeleton;
