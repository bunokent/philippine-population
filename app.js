const ctx = document.getElementById("chart");

async function getData() {
  try {
    let years = [];
    let population = [];

    const response = await fetch("./2022_T1_4.csv");
    if (!response.ok) throw new Error("CSV file not found!");

    const text = await response.text();
    const info = Papa.parse(text);
    const row = info.data.slice(2);

    row.forEach((element) => {
      years.push(element[0]);
      population.push(element[1]);
    });
    return { years, population };
  } catch (err) {
    console.error(err);
  }
}

async function displayChart() {
  const data = await getData();

  let population = [];

  data.population.forEach((element) => {
    population.push(parseInt(element.replace(/,/g, "")));
  });

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.years,
      datasets: [
        {
          data: population,
          borderWidth: 1,
          backgroundColor: "#405d72",
          borderColor: "#405d72",
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

displayChart();
