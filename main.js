gsap.registerPlugin(ScrollTrigger);

function progressbar() {
  var progressbar = $(".tf__team_skills_bar_single .fill");
  progressbar.each(function () {
    const percentage = $(this).attr("data-percentage"); // Haal het percentage van het specifieke element
    gsap.fromTo(
      $(this), // Specificeer het huidige element binnen de loop
      { css: { width: 0 } },
      {
        scrollTrigger: {
          trigger: $(this).parent("div"),
          start: "top center+=300",
          toggleActions: "play none none none",
        },
        css: { width: `${percentage}%` },
        duration: 0.8,
        stagger: 0.01,
        ease: "power2.out",
      }
    );
  });
}

$(document).ready(function() {
  progressbar();
});