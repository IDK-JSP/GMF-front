import Skeleton from "react-loading-skeleton";

const StageSkeleton = () => (
  <>
    <article>
      <span>
        <Skeleton height={50} width="50px" />
      </span>
      <span>
        <Skeleton height={20} count={2} />
      </span>
    </article>
    <article>
      <span>
        <Skeleton height={50} width="50px" />
      </span>
      <span>
        <Skeleton height={20} count={2} />
      </span>
    </article>
    <article>
      <span>
        <Skeleton height={50} width="50px" />
      </span>
      <span>
        <Skeleton height={20} count={2} />
      </span>
    </article>
    <article>
      <span>
        <Skeleton height={50} width="50px" />
      </span>
      <span>
        <Skeleton height={20} count={2} />
      </span>
    </article>
  </>
);

export default StageSkeleton;
