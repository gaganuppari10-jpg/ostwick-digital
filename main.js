const demos = {
  juniper: {
    title: 'Juniper Kitchen',
    label: 'Restaurant concept',
    heading: 'A warm digital front door for a local restaurant.',
    text: 'Website presentation paired with tools for catering sales, marketing, cash flow, budgeting, HR and invoices.',
    shot: 'assets/01_Juniper_Kitchen/Sales_Pipeline_Juniper_Kitchen.png',
    tools: ['Sales pipeline', 'Financial budget', 'Marketing calendar', 'KPI dashboard', 'Invoice']
  },
  northline: {
    title: 'Northline Estates',
    label: 'Real estate concept',
    heading: 'Property presentation with an enquiry-first structure.',
    text: 'A property-facing website backed by a realistic lead pipeline, marketing calendar, cash flow and KPI dashboard.',
    shot: 'assets/02_Northline_Estates/Sales_Pipeline_Northline_Estates.png',
    tools: ['Sales pipeline', 'Marketing calendar', 'Cash flow', 'KPI dashboard', 'Project tracker']
  },
  arden: {
    title: 'Arden Advisory',
    label: 'Consulting concept',
    heading: 'Credibility and clarity for a professional services firm.',
    text: 'A consulting website paired with practical tools for sales, projects, HR, marketing, finance and performance tracking.',
    shot: 'assets/03_Arden_Advisory/KPI_Dashboard_Arden_Advisory.png',
    tools: ['KPI dashboard', 'Sales pipeline', 'HR tracker', 'Financial budget', 'Project tracker']
  }
};

function openDemo(k) {
  let d = demos[k];
  if(!d) return;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('demoBody').innerHTML = `<div class="eyebrow">${d.label}</div><h2>${d.heading}</h2><p>${d.text}</p><img class="demo-image" src="${d.shot}" alt="Portfolio demonstration"><div class="demo-grid"><div><b>Included in the demo</b><span>${d.tools.join(' · ')}</span></div><div><b>Client reality</b><span>These are sample businesses and sample data. A real project would use the client's own brand, services, prices and business numbers.</span></div></div>`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.querySelector('.close')?.focus();
}

function closeDemo() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function pick(btn, group, file) {
  document.querySelectorAll('[data-group="' + group + '"] .tab').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const folder = group === 'juniper' ? '01_Juniper_Kitchen' : group === 'northline' ? '02_Northline_Estates' : '03_Arden_Advisory';
  const workbook = file.replace(/\.png$/i, '.xlsx');
  const title = file.replace(/\.png$/i, '').replace(/_/g, ' ');
  window.location.href = 'Ostwick_Workbook_Viewer.html?file=' + encodeURIComponent('assets/' + folder + '/' + workbook) + '&title=' + encodeURIComponent(title);
}

document.addEventListener('DOMContentLoaded', () => {
  // Reveal observer
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(e => revealObserver.observe(e));

  // Toolshot zoom toggle
  document.querySelectorAll('.toolshot').forEach(img => {
    img.addEventListener('click', () => {
      img.style.objectFit = img.style.objectFit === 'contain' ? 'cover' : 'contain';
    });
  });

  // Modal close handlers
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDemo();
  });
  
  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeDemo();
    });
  }

  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDemo);
  }

  // Refactored inline 'openDemo' handlers
  document.querySelectorAll('[data-demo]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openDemo(btn.getAttribute('data-demo'));
    });
  });

  // Refactored inline 'pick' handlers
  document.querySelectorAll('[data-pick-group]').forEach(btn => {
    btn.addEventListener('click', e => {
      pick(btn, btn.getAttribute('data-pick-group'), btn.getAttribute('data-pick-file'));
    });
  });
});
