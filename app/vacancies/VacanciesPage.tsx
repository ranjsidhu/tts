import Layout from "../components/layout/Layout";
import VacanciesForm from "../components/vacancies/VacanciesForm";
import "./vacancies.css";

export default function VacanciesPage() {
  return (
    <Layout>
      <div>
        <br />
        <h1 className="vacancies-title">Vacancies</h1>
        <br />
        <br />
        <VacanciesForm />
      </div>
    </Layout>
  );
}
