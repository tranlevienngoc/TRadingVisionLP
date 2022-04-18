AOS.init();

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: false, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});

const menuToggle = document.getElementById("navbarSupportedContent");
const bsCollapse = new bootstrap.Collapse(menuToggle, {
  toggle: false,
});
function closeNav() {
  $(".collapse").removeClass("show");
  $(".collapse").addClass("closing");
  setTimeout(() => {
    $(".collapse").removeClass("closing");
  }, 1000);
}

const navLinks = document.querySelectorAll(".nav-item");
console.log({ navLinks });
navLinks.forEach((l) => {
  if (window.innerWidth < 1500 && !l.classList.contains("dropdown")) {
    l.addEventListener("click", () => {
      $(".collapse").removeClass("show");
      $(".collapse").addClass("closing");
      setTimeout(() => {
        $(".collapse").removeClass("closing");
      }, 1000);
    });
  }
});

$(document).mouseup(function (e) {
  var container = $("#navbarSupportedContent");

  // if the target of the click isn't the container nor a descendant of the container
  if (
    !container.is(e.target) &&
    container.has(e.target).length === 0 &&
    container.hasClass("show")
  ) {
    closeNav();
  }
});

var mybutton = document.getElementById("myBtn");
// var myNav = document.getElementById("nav");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.dataFields.color = "color";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart.innerRadius = am4core.percent(30);

pieSeries.alignLabels = false;
pieSeries.labels.template.bent = true;
pieSeries.labels.template.radius = 3;
pieSeries.labels.template.padding(0, 0, 0, 0);
pieSeries.labels.disabled = true;
pieSeries.ticks.template.disabled = true;
pieSeries.labels.template.disabled = true;
// tooltip

pieSeries.slices.template.tooltipText =
  "{category}: {value.percent}.00% ({value}0M)";

// pieSeries.tooltip.getFillFromObject = false;
// pieSeries.tooltip.color.fill = am4core.color("#CEB1BE");
// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(
  new am4core.DropShadowFilter()
);
shadow.opacity = 0;

// Create hover state
var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

// Slightly shift the shadow and make it more prominent on hover
var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
hoverShadow.opacity = 0.7;
hoverShadow.blur = 5;

// Add a legend
chart.legend = new am4charts.Legend();
chart.legend.position = "right";
chart.legend.markers.template.children.getIndex(0).cornerRadius(30, 30, 30, 30);
chart.legend.labels.template.textAlign = "start";
chart.legend.labels.template.width = 300;
//new
chart.legend.labels.template.size = 10;
chart.legend.width = 240;
// chart.legend.labels.template.events.on("parentset", function (event) {
//   event.target.toBack();
// });
chart.legend.labels.template.text = "[white]{name}";
chart.logo.disabled = true;
chart.data = [
  { country: "Team", litres: 18 },
  { country: "Advisors", litres: 2 },
  { country: "Strategic Sale", litres: 5 },
  { country: "Private Sale", litres: 8 },
  { country: "Public Sale", litres: 1 },
  { country: "Ecosystem Growth", litres: 21 },
  { country: "Staking Rewards", litres: 10 },
  {
    country: "Community Development",
    litres: 20,
  },
  {
    country: "Liquidity Incentives",
    litres: 5,
  },
  { country: "Treasury", litres: 10 },
];
//new
var w = window.innerWidth;
function myFunction() {
  w = window.innerWidth;
  if (w <= 500) {
    chart.legend.position = "bottom";
  } else {
    chart.legend.position = "right";
  }
}
