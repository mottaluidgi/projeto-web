let grafico;

export function desenharGrafico(produtos) {
  grafico?.destroy();
  grafico = undefined;

  const canvas = document.getElementById('grafico');
  if (!canvas || typeof Chart === 'undefined') return;

  const css = getComputedStyle(document.body);
  const texto = css.getPropertyValue('--texto').trim();
  const barra = css.getPropertyValue('--botao').trim();
  const grade = css.getPropertyValue('--borda').trim();

  grafico = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: produtos.map((p) => p.nome),
      datasets: [{ label: 'Preço (R$)', data: produtos.map((p) => p.preco), backgroundColor: barra }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: texto } } },
      scales: {
        x: { ticks: { color: texto }, grid: { color: grade } },
        y: { ticks: { color: texto }, grid: { color: grade } }
      }
    }
  });
}
