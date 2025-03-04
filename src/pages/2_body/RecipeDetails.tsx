import {FC} from 'react';
import ContentWithBothAside from '../../components/layout/ContentWithBothAside';
import AsideLeft from '../../components/layout/AsideLeft';
import AsideRight from '../../components/layout/AsideRight';
import Presentation from '../../components/layout/Presentation';

const RecipeDetails: FC<{}> = ({}) => {
    return (
        <>
        <Presentation>
            RecipeDetails
        </Presentation>
        <AsideLeft>
            Aside
        </AsideLeft>
        <ContentWithBothAside>
            <section>
                section
                <article>
                    article
                </article>
            </section>
        </ContentWithBothAside>
        <AsideRight>
            Aside
        </AsideRight>
        </>
    );
};

export default RecipeDetails;
