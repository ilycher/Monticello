(function () {
  'use strict';

  function initSlider() {
    $('.header__slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      autoplay: true,
      prevArrow: false,
      vertical: true,
      nextArrow: $(".arrow-down"),
      dotsClass: 'slick-dots',
      responsive: [{
        breakpoint: 700,
        settings: {
          dots: false
        }
      }]
    });
  }

  function SliderLatest() {
    $('.news__slider').slick({
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $(".arrow-left"),
      nextArrow: $(".arrow-right"),
      dotsClass: 'card-dots',
      responsive: [{
        breakpoint: 1175,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      }, {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }]
    });
  }

  function navBurger() {
    $(document).delegate('.open', 'click', function (event) {
      $(this).addClass('oppenned');
      event.stopPropagation();
    });
    $(document).delegate('body', 'click', function (event) {
      $('.open').removeClass('oppenned');
    });
    $(document).delegate('.cls', 'click', function (event) {
      $('.open').removeClass('oppenned');
      event.stopPropagation();
    });
  }

  function switchiListNavigation() {
    let $listNavigationChild = $(".list-navigation__item");
    $(".list-navigation__item-link").on("click", function () {
      $listNavigationChild.removeClass("list-navigation__item-active");
      $(this).parent().addClass("list-navigation__item-active");
    });
  }
  $(document).on('ready', function () {
    initSlider();
    SliderLatest();
    navBurger();
    switchiListNavigation();
    initMap();
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gaW5pdFNsaWRlcigpIHtcbiAgJCgnLmhlYWRlcl9fc2xpZGVyJykuc2xpY2soe1xuICAgIGRvdHM6IHRydWUsXG4gICAgaW5maW5pdGU6IHRydWUsXG4gICAgc3BlZWQ6IDMwMCxcbiAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgcHJldkFycm93OiBmYWxzZSxcbiAgICB2ZXJ0aWNhbDogdHJ1ZSxcbiAgICBuZXh0QXJyb3c6ICQoXCIuYXJyb3ctZG93blwiKSxcbiAgICBkb3RzQ2xhc3M6ICdzbGljay1kb3RzJyxcbiAgICByZXNwb25zaXZlOiBbe1xuICAgICAgYnJlYWtwb2ludDogNzAwLFxuICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgZG90czogZmFsc2VcbiAgICAgIH1cbiAgICB9XVxuICB9KTtcbn1cblxuZnVuY3Rpb24gU2xpZGVyTGF0ZXN0KCkge1xuICAkKCcubmV3c19fc2xpZGVyJykuc2xpY2soe1xuICAgIGRvdHM6IHRydWUsXG4gICAgaW5maW5pdGU6IHRydWUsXG4gICAgc2xpZGVzVG9TaG93OiAzLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIHByZXZBcnJvdzogJChcIi5hcnJvdy1sZWZ0XCIpLFxuICAgIG5leHRBcnJvdzogJChcIi5hcnJvdy1yaWdodFwiKSxcbiAgICBkb3RzQ2xhc3M6ICdjYXJkLWRvdHMnLFxuICAgIHJlc3BvbnNpdmU6IFt7XG4gICAgICBicmVha3BvaW50OiAxMTc1LFxuICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgZG90czogZmFsc2VcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBicmVha3BvaW50OiA3MDAsXG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgfVxuICAgIH1dXG4gIH0pO1xufVxuZnVuY3Rpb24gbmF2QnVyZ2VyKCkge1xuICAkKGRvY3VtZW50KS5kZWxlZ2F0ZSgnLm9wZW4nLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdvcHBlbm5lZCcpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KVxuICAkKGRvY3VtZW50KS5kZWxlZ2F0ZSgnYm9keScsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wcGVubmVkJyk7XG4gIH0pXG4gICQoZG9jdW1lbnQpLmRlbGVnYXRlKCcuY2xzJywgJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgJCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BwZW5uZWQnKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaGlMaXN0TmF2aWdhdGlvbigpIHtcbiAgbGV0ICRsaXN0TmF2aWdhdGlvbkNoaWxkID0gJChcIi5saXN0LW5hdmlnYXRpb25fX2l0ZW1cIik7XG4gICQoXCIubGlzdC1uYXZpZ2F0aW9uX19pdGVtLWxpbmtcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgJGxpc3ROYXZpZ2F0aW9uQ2hpbGQucmVtb3ZlQ2xhc3MoXCJsaXN0LW5hdmlnYXRpb25fX2l0ZW0tYWN0aXZlXCIpO1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoXCJsaXN0LW5hdmlnYXRpb25fX2l0ZW0tYWN0aXZlXCIpO1xuICB9KTtcblxufTtcblxuJChkb2N1bWVudCkub24oJ3JlYWR5JywgZnVuY3Rpb24gKCkge1xuICBpbml0U2xpZGVyKCk7XG4gIFNsaWRlckxhdGVzdCgpO1xuICBuYXZCdXJnZXIoKTtcbiAgc3dpdGNoaUxpc3ROYXZpZ2F0aW9uKCk7XG4gIGluaXRNYXAoKTtcbn0pOyJdLCJuYW1lcyI6WyJpbml0U2xpZGVyIiwiJCIsInNsaWNrIiwiZG90cyIsImluZmluaXRlIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJhdXRvcGxheSIsInByZXZBcnJvdyIsInZlcnRpY2FsIiwibmV4dEFycm93IiwiZG90c0NsYXNzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIlNsaWRlckxhdGVzdCIsInNsaWRlc1RvU2Nyb2xsIiwibmF2QnVyZ2VyIiwiZG9jdW1lbnQiLCJkZWxlZ2F0ZSIsImV2ZW50IiwiYWRkQ2xhc3MiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW1vdmVDbGFzcyIsInN3aXRjaGlMaXN0TmF2aWdhdGlvbiIsIiRsaXN0TmF2aWdhdGlvbkNoaWxkIiwib24iLCJwYXJlbnQiLCJpbml0TWFwIl0sIm1hcHBpbmdzIjoiOzs7RUFHQSxTQUFTQSxVQUFULEdBQXNCO0VBQ3BCQyxFQUFBQSxDQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQkMsS0FBckIsQ0FBMkI7RUFDekJDLElBQUFBLElBQUksRUFBRSxJQURtQjtFQUV6QkMsSUFBQUEsUUFBUSxFQUFFLElBRmU7RUFHekJDLElBQUFBLEtBQUssRUFBRSxHQUhrQjtFQUl6QkMsSUFBQUEsWUFBWSxFQUFFLENBSlc7RUFLekJDLElBQUFBLFFBQVEsRUFBRSxJQUxlO0VBTXpCQyxJQUFBQSxTQUFTLEVBQUUsS0FOYztFQU96QkMsSUFBQUEsUUFBUSxFQUFFLElBUGU7RUFRekJDLElBQUFBLFNBQVMsRUFBRVQsQ0FBQyxDQUFDLGFBQUQsQ0FSYTtFQVN6QlUsSUFBQUEsU0FBUyxFQUFFLFlBVGM7RUFVekJDLElBQUFBLFVBQVUsRUFBRSxDQUFDO0VBQ1hDLE1BQUFBLFVBQVUsRUFBRSxHQUREO0VBRVhDLE1BQUFBLFFBQVEsRUFBRTtFQUNSWCxRQUFBQSxJQUFJLEVB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
