export default function AboutPage() {
  return (
    <>
      <style>{css}</style>
      <div className="about-page">
        <h1 className="about-title">Acerca del proyecto</h1>

        <section className="about-section">
          <h2>¿Qué es CV Builder?</h2>
          <p>
            CV Builder es una aplicación web que te permite crear y personalizar
            tu currículum vitae de manera sencilla, sin necesidad de registrarte
            ni instalar nada. Toda la información se guarda localmente en tu
            navegador.
          </p>
        </section>

        <section className="about-section">
          <h2>Características</h2>
          <ul className="about-list">
            <li>Formulario guiado para datos personales, habilidades y más.</li>
            <li>Vista previa en tiempo real del CV generado.</li>
            <li>Dashboard con gráficas de tus habilidades.</li>
            <li>Exportación a PDF.</li>
            <li>Modo oscuro / claro.</li>
            <li>Almacenamiento local — tus datos no salen de tu dispositivo.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Tecnologías</h2>
          <ul className="about-list">
            <li>React + Vite</li>
            <li>React Router DOM</li>
            <li>Context API + localStorage</li>
          </ul>
        </section>
      </div>
    </>
  )
}

const css = `
.about-page {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: left;
}

.about-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
}

.about-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.about-section h2 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
}

.about-section p {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.65;
}

.about-list {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.about-list li {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.5;
}
`
