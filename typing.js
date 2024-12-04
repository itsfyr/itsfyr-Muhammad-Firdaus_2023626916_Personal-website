document.addEventListener('DOMContentLoaded', function () {
  const toRotate = [
      "Bachelor of Information Science Library Management",
      "Passionate About Knowledge Organization",
      "Advocate for Information Accessibility"
  ];
  const period = 2000;
  let txt = '';
  let loopNum = 0;
  let isDeleting = false;

  function tick() {
      const i = loopNum % toRotate.length;
      const fullTxt = toRotate[i];

      txt = isDeleting
          ? fullTxt.substring(0, txt.length - 1)
          : fullTxt.substring(0, txt.length + 1);

      document.querySelector('.typing').innerHTML = txt;

      let delta = 200 - Math.random() * 100;

      if (isDeleting) {
          delta /= 2;
      }

      if (!isDeleting && txt === fullTxt) {
          delta = period;
          isDeleting = true;
      } else if (isDeleting && txt === '') {
          isDeleting = false;
          loopNum++;
          delta = 500;
      }

      setTimeout(() => {
          tick();
      }, delta);
  }

  tick();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));

          if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navMarker = document.querySelector('.nav-marker');

  const observerOptions = {
      root: null,
      threshold: 0.5
  };

  function setActiveLink(link) {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');

      // Set the marker position and size
      const linkRect = link.getBoundingClientRect();
      const navRect = link.closest('nav').getBoundingClientRect();
      const offsetLeft = linkRect.left - navRect.left;

      navMarker.style.width = `${linkRect.width}px`;
      navMarker.style.transform = `translateX(${offsetLeft}px)`;
  }

  function observerCallback(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
              if (activeLink) {
                  setActiveLink(activeLink);
              }
          }
      });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => {
      observer.observe(section);
  });

  if (navLinks.length) {
      setActiveLink(navLinks[0]);
  }
});
