import { FC } from "react";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";

const Settings: FC<{}> = ({}) => {
  return (
    <Pages pageTitle="Paramètres">
      <HeroSection>Paramètres</HeroSection>
      <main>
        <section>
          <article></article>
        </section>
      </main>
    </Pages>
  );
};

export default Settings;
