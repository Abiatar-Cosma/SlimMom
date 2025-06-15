import useWindowDimensions from "../../services/hooks/useWindowDimensions";
import s from "./CalculatorPage.module.css";

import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";


const CalculatorPage = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width < 1280 && (
        <main className={s.section}>
          <h1 className="visually-hidden">Calculator Page</h1>
          <div className={s.calculator}>
            <Container>
              <DailyCaloriesForm />
            </Container>
          </div>
          <div className={s.sidebar}>
            <Container>
              <SideBar />
              {/* <Footer /> */}
            </Container>
          </div>
        </main>
      )}
      {width > 1279 && (
        <>
          <Container>
            <main className={s.section}>
              <h3 className="visually-hidden">Calculator Page</h3>
              <div className={s.calculator}>
                <DailyCaloriesForm />
              </div>
              <SideBar />
            </main>
            {/* <Footer /> */}
          </Container>
        </>
      )}
    </>
  );
};

export default CalculatorPage;
