"use strict";
import { useMap } from "./map";
useMap();
const useSlider = () => {
  const $firstCircle = document.getElementById("circle-1");
  const $secondCircle = document.getElementById("circle-2");
  const $thirdCircle = document.getElementById("circle-3");
  const $fourthCircle = document.getElementById("circle-4");
  const $fifthCircle = document.getElementById("circle-5");
  const $header = document.getElementById("header");
  const $description = document.getElementById("description");
  const $commerce = document.getElementById("commerce");
  const $news = document.getElementById("news");
  const $footer = document.getElementById("footer");

  document.addEventListener("click", (event) => {
    if (event.target == $firstCircle) {
      $firstCircle.classList.add("active");
      $thirdCircle.classList.remove("active");
      $fourthCircle.classList.remove("active");
      $fifthCircle.classList.remove("active");
      $secondCircle.classList.remove("active");
    } else if (event.target == $secondCircle) {
      $firstCircle.classList.remove("active");
      $thirdCircle.classList.remove("active");
      $fourthCircle.classList.remove("active");
      $fifthCircle.classList.remove("active");
      $secondCircle.classList.add("active");
      $description.scrollIntoView({ block: "center", behavior: "smooth" });
    } else if (event.target == $thirdCircle) {
      $firstCircle.classList.remove("active");
      $secondCircle.classList.remove("active");
      $fourthCircle.classList.remove("active");
      $fifthCircle.classList.remove("active");
      $thirdCircle.classList.add("active");
      $commerce.scrollIntoView({ block: "center", behavior: "smooth" });
    } else if (event.target == $fourthCircle) {
      $firstCircle.classList.remove("active");
      $secondCircle.classList.remove("active");
      $thirdCircle.classList.remove("active");
      $fifthCircle.classList.remove("active");
      $fourthCircle.classList.add("active");
      $news.scrollIntoView({ block: "center", behavior: "smooth" });
    } else if (event.target == $fifthCircle) {
      $firstCircle.classList.remove("active");
      $secondCircle.classList.remove("active");
      $thirdCircle.classList.remove("active");
      $fourthCircle.classList.remove("active");
      $fifthCircle.classList.add("active");
      $footer.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
};
useSlider();

const useArrow = () => {
  const $arrow = document.getElementById("arrow");
  const $arrowDir = document.getElementById("arrow-dir");
  const $description = document.getElementById("description");
  document.addEventListener("click", (event) => {
    if (event.target == $arrow || event.target == $arrowDir) {
      $description.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
};
useArrow();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgdXNlTWFwIH0gZnJvbSBcIi4vbWFwXCI7XG51c2VNYXAoKTtcbmNvbnN0IHVzZVNsaWRlciA9ICgpID0+IHtcbiAgY29uc3QgJGZpcnN0Q2lyY2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXJjbGUtMVwiKTtcbiAgY29uc3QgJHNlY29uZENpcmNsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2lyY2xlLTJcIik7XG4gIGNvbnN0ICR0aGlyZENpcmNsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2lyY2xlLTNcIik7XG4gIGNvbnN0ICRmb3VydGhDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpcmNsZS00XCIpO1xuICBjb25zdCAkZmlmdGhDaXJjbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpcmNsZS01XCIpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIik7XG4gIGNvbnN0ICRkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0ICRjb21tZXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVyY2VcIik7XG4gIGNvbnN0ICRuZXdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdzXCIpO1xuICBjb25zdCAkZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXJcIik7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGZpcnN0Q2lyY2xlKSB7XG4gICAgICAkZmlyc3RDaXJjbGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICR0aGlyZENpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgJGZvdXJ0aENpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgJGZpZnRoQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkc2Vjb25kQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gJHNlY29uZENpcmNsZSkge1xuICAgICAgJGZpcnN0Q2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkdGhpcmRDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICRmb3VydGhDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICRmaWZ0aENpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgJHNlY29uZENpcmNsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgJGRlc2NyaXB0aW9uLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6IFwiY2VudGVyXCIsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09ICR0aGlyZENpcmNsZSkge1xuICAgICAgJGZpcnN0Q2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkc2Vjb25kQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkZm91cnRoQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkZmlmdGhDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICR0aGlyZENpcmNsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgJGNvbW1lcmNlLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6IFwiY2VudGVyXCIsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09ICRmb3VydGhDaXJjbGUpIHtcbiAgICAgICRmaXJzdENpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgJHNlY29uZENpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgJHRoaXJkQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkZmlmdGhDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICRmb3VydGhDaXJjbGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICRuZXdzLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6IFwiY2VudGVyXCIsIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09ICRmaWZ0aENpcmNsZSkge1xuICAgICAgJGZpcnN0Q2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkc2Vjb25kQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAkdGhpcmRDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICRmb3VydGhDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICRmaWZ0aENpcmNsZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgJGZvb3Rlci5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnVzZVNsaWRlcigpO1xuXG5jb25zdCB1c2VBcnJvdyA9ICgpID0+IHtcbiAgY29uc3QgJGFycm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcnJvd1wiKTtcbiAgY29uc3QgJGFycm93RGlyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcnJvdy1kaXJcIik7XG4gIGNvbnN0ICRkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09ICRhcnJvdyB8fCBldmVudC50YXJnZXQgPT0gJGFycm93RGlyKSB7XG4gICAgICAkZGVzY3JpcHRpb24uc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogXCJjZW50ZXJcIiwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgfVxuICB9KTtcbn07XG51c2VBcnJvdygpO1xuIl0sImZpbGUiOiJtYWluLmpzIn0=
