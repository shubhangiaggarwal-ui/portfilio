/* ==========================================================================
   NICHE CLEAN PINK AESTHETIC JAVASCRIPT - SHUBHANGI AGGARWAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light Signature Pink / Dark Velvet Noir)
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  const savedTheme = localStorage.getItem('shubhangi-pink-theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else if (prefersDark.matches) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('shubhangi-pink-theme', newTheme);
    });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. ScrollSpy for 4 Sections (Home, About, Skills, Contact)
  const sections = document.querySelectorAll('section[id]');
  
  const handleScroll = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 4. One-Click Copy Email Functionality
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const copyToast = document.getElementById('copyToast');
  let toastTimer = null;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'agrwlsammy@gmail.com';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https or restricted environments
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        // Show button feedback
        const btnText = btn.querySelector('.btn-copy-text');
        const originalText = btnText ? btnText.textContent : '';
        if (btnText) {
          btnText.textContent = 'Copied! ✨';
        }

        // Trigger floating toast
        if (copyToast) {
          copyToast.classList.add('show');
          if (toastTimer) clearTimeout(toastTimer);
          toastTimer = setTimeout(() => {
            copyToast.classList.remove('show');
            if (btnText) btnText.textContent = originalText;
          }, 3000);
        }
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  });
});

// 5. Interactive Contact Form Submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const subject = document.getElementById('subjectInput').value;
  const message = document.getElementById('messageInput').value;
  const successMsg = document.getElementById('formSuccessMessage');
  const form = document.getElementById('contactForm');

  if (successMsg) {
    successMsg.classList.remove('hidden');
  }

  // Pre-fill mailto link in background so user can also trigger directly
  const mailtoUrl = `mailto:agrwlsammy@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1000);

  // Reset form fields smoothly
  form.reset();

  setTimeout(() => {
    if (successMsg) {
      successMsg.classList.add('hidden');
    }
  }, 7000);
}
