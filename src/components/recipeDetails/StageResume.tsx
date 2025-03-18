import {FC} from "react";
import {RecipeStageType} from "../../1_types/RecipeStageType";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import StageSkeleton from "./StageSkeleton";

type Props = {
    stageList: Array<RecipeStageType>;
    isLoading: boolean;
    error: string | null;
};

const StageResume: FC<Props> = ({stageList, isLoading, error}) => {
    return withLoadingAndError({
        isLoading,
        error,
        data: stageList,
        SkeletonComponent: StageSkeleton,
        children: (data) => (
            <>
                {data.map((stage, index) => (
                    <article key={index} className="recipe-stage">
                        <span>{stage.stage}</span>
                        <span>{stage.content}</span>
                    </article>
                ))}
            </>
        ),
    });
};

export default StageResume;
