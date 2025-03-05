import Skeleton from "react-loading-skeleton";

const OpinionsSkeleton = () => (
  <>
    <div style={{ backgroundColor: "green" }}>
      <Skeleton height={30} width="90%" />
      <Skeleton height={20} width="100%" />
      <Skeleton height={20} width="100%" />
    </div>
  </>
);

export default OpinionsSkeleton;
