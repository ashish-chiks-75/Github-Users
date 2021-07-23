import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
// import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalContext();

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;

    if (total[language]) {
      total[language].value += 1;
      total[language].stars += stargazers_count;
    } else
      total[language] = {
        label: language,
        value: 1,
        stars: 1 + stargazers_count,
      };
    return total;
  }, {});

  console.log(languages);

  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars };
    });

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[name] = {
        label: name,
        value: stargazers_count,
      };
      total.forks[name] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;