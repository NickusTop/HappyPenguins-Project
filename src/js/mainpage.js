const names = document.querySelectorAll('.character-name');
const image = document.getElementById('characterImage');

names.forEach(name => {
  name.addEventListener('click', () => {
    // Зняти активність з усіх
    names.forEach(n => n.classList.remove('active'));

    // Додати активність до натиснутого
    name.classList.add('active');

    // Плавна зміна картинки
    image.style.opacity = 0;
    setTimeout(() => {
      image.src = name.getAttribute('data-img');
      image.style.opacity = 1;
    }, 200);
  });
});
 // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Floating tags animation
      const tags = document.querySelectorAll(".tag");
      tags.forEach((tag) => {
        tag.addEventListener("mouseenter", function () {
          this.style.transform = "scale(1.1) rotate(2deg)";
        });

        tag.addEventListener("mouseleave", function () {
          this.style.transform = "scale(1) rotate(0deg)";
        });
      });

      // Episodes gallery scroll behavior
      const gallery = document.querySelector(".episodes-gallery");
      if (gallery) {
        gallery.addEventListener("wheel", function (e) {
          if (e.deltaY !== 0) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
          }
        });
      }

      // Character section intersection observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, observerOptions);

      // Observe character items
      document.querySelectorAll(".character-item").forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(item);
      });
    
