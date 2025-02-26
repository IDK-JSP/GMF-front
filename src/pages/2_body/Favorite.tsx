import {FC} from 'react';
import AsideLeft from '../../components/layout/AsideLeft';
import ContentWithLeftAside from '../../components/layout/ContentWithLeftAside';

const Favorite: FC<{}> = ({}) => {
    return (
        <>
        <div className='presentation'
        style={{ 
            backgroundImage: `url("/test.jpeg")`,  
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "100%"
            }}>
            <div>Favoris</div>
        </div>
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
