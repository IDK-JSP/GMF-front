import {FC} from 'react';
import AsideLeft from '../../components/layout/AsideLeft';
import ContentWithLeftAside from '../../components/layout/ContentWithLeftAside';
import Presentation from '../../components/layout/Presentation';

const Favorite: FC<{}> = ({}) => {
    return (
        <>
        <Presentation>
            Favoris
        </Presentation>
        <AsideLeft>
            Aside
        </AsideLeft>
        <ContentWithLeftAside>
            <section>
                section
                <article>
                    article
                </article>
            </section>
        </ContentWithLeftAside>
        </>
    );
};

export default Favorite;
