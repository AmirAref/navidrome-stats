export const COLORS = [
  '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
  '#59a14f', '#edc948', '#b07aa1', '#ff9da7',
  '#9c755f', '#bab0ac',
];

function isDark() {
  return document.documentElement.getAttribute('data-bs-theme') === 'dark';
}

function gridColor() {
  return isDark() ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.1)';
}

function tickColor() {
  return isDark() ? '#aaa' : '#666';
}

export function renderHBar(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        ...ds,
        backgroundColor: COLORS[i % COLORS.length] + 'cc',
        borderColor: COLORS[i % COLORS.length],
        borderWidth: 1,
      })),
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { display: datasets.length > 1 } },
      scales: {
        x: {
          beginAtZero: true,
          title: { display: true, text: 'Plays', color: tickColor() },
          ticks: { color: tickColor() },
          grid: { color: gridColor() },
        },
        y: {
          ticks: { font: { size: 12 }, color: tickColor() },
          grid: { color: gridColor() },
        },
      },
    },
  });

  // Re-color chart when dark mode is toggled
  const observer = new MutationObserver(() => {
    chart.options.scales.x.title.color = tickColor();
    chart.options.scales.x.ticks.color = tickColor();
    chart.options.scales.x.grid.color = gridColor();
    chart.options.scales.y.ticks.color = tickColor();
    chart.options.scales.y.grid.color = gridColor();
    chart.update();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });

  return chart;
}
