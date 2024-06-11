// pages/index.tsx
import React from 'react';
import { title, subtitle } from '../../../frontend/nextui-dashboard/components/styles/primitive'; // Adjust the import paths

const LandingPage = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full max-w-screen-md text-center justify-center">
        <h1 className={`${title()} lg:text-7xl md:text-6xl leading-tight`}>Controla tus Gastos </h1>
        <h1 className={`${title()} lg:text-7xl md:text-6xl leading-tight`}>Crece&nbsp;</h1>
        <h1 className={`${title({ color: "violet" })} lg:text-7xl md:text-6xl leading-tight`}>sin Limites&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Automatiza tus reportes de gastos, reembolsa tus empleados</h2>
        <h2 className={subtitle({ class: "mt-4" })}>
          y sincroniza con facilidad </h2>
      </div>
    </section>
  );
};

export default LandingPage;
