/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(360);

document.addEventListener('DOMContentLoaded', function () {
  const maskPhone = () => {
    const maskedElements = document.querySelectorAll('.masked');
    const maskOptions = {
      mask: '+7 (000) 000-00-00',
      onFocus: () => {
        if (this.value === '') this.value = '+7 ';
      },
      onBlur: () => {
        if (this.value === '+7 ') this.value = '';
      },
    };

    maskedElements.forEach((item) => {
      new IMask(item, maskOptions);
    });
  };

  maskPhone();

  const maskTime = () => {
    const maskedElements = document.querySelectorAll('.time');
    const maskOptions = {
      mask: '00:00',
    };

    maskedElements.forEach((item) => {
      new IMask(item, maskOptions);
    });
  };

  maskTime();

  Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
    compact: true,
  });

  if (document.querySelector('.splide-slider')) {
    const splideSlider = new Splide('.splide-slider', {
      type: 'loop',
      pagination: false,
      arrows: false,
      autoplay: true,
      interval: 4000,
      speed: 800,
      pauseOnHover: false,
    });
    splideSlider.mount();
  }

  if (document.querySelector('.splide-afisha')) {
    const splideSlider = new Splide('.splide-afisha', {
      type: 'loop',
      pagination: false,
      classes: {
        arrows: 'afisha-control',
        arrow: 'afisha-arrow',
        prev: 'afisha-prev',
        next: 'afisha-next',
      },
      type: 'fade',
      rewind: true,
    });
    splideSlider.mount();
  }

  if (document.querySelector('.menu-sidebar') && window.innerWidth > 1024) {
    const sidebar = new StickySidebar('.menu-sidebar', {
      containerSelector: '.menu-wrapper',
      innerWrapperSelector: '.menu-sidebar__inner',
      topSpacing: 20,
      bottomSpacing: 20,
    });
  }

  const selectors = ['.menu-sidebar__nav a[href^="#"]', '.delivery-nav a[href^="#"]'];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  });

  function updateValue(inputField, direction) {
    let currentValue = parseInt(inputField.value, 10);

    if (direction === 'plus' && currentValue < 99) {
      currentValue++;
    } else if (direction === 'minus' && currentValue > 1) {
      currentValue--;
    }

    inputField.value = currentValue;
  }

  document.body.addEventListener('click', (e) => {
    const itemCountElement = e.target.closest('.counter');

    if (!itemCountElement) return;

    const inputField = itemCountElement.querySelector('input[type="number"]');

    if (e.target.matches('.minus')) {
      updateValue(inputField, 'minus');
    } else if (e.target.matches('.plus')) {
      updateValue(inputField, 'plus');
    }
  });

  document.body.addEventListener('input', (e) => {
    const inputField = e.target;

    if (inputField.closest('.counter') && inputField.type === 'number') {
      if (inputField.value < 1) {
        inputField.value = 1;
      } else if (inputField.value > 99) {
        inputField.value = 99;
      }
    }
  });

  const tabs = document.querySelectorAll('.cart-form__tabs li');
  const contents = document.querySelectorAll('.cart-form__tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      tabs.forEach((innerTab) => {
        innerTab.classList.remove('active');
      });

      contents.forEach((content) => {
        content.classList.remove('active');
      });

      this.classList.add('active');

      const content = document.querySelector(`.cart-form__tab[data-id="${this.getAttribute('data-id')}"]`);
      content.classList.add('active');
    });
  });

  const burger = document.querySelector('.header-burger');
  const nav = document.querySelector('.header-nav');
  if (burger) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  function initializeDatepickers() {
    let mobileOpts;
    if (window.innerWidth <= 768) {
      mobileOpts = {
        isMobile: true,
        autoClose: true,
      };
    } else {
      mobileOpts = {};
    }

    const startDatepicker = new AirDatepicker('#datepicker', {
      locale: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1,
      },
      minDate: new Date(),
      ...mobileOpts,
    });
  }

  initializeDatepickers();
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.popup-form');
  if (form) {
    const addressInput = form.querySelector('#address');
    const apartmentInput = form.querySelector('#apartment');
    const floorInput = form.querySelector('#floor');
    const submitButton = form.querySelector('.popup-button');
    const headerAddress = document.querySelector('.header-address p');

    submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      const addressValue = addressInput.value;
      const apartmentValue = apartmentInput.value;
      const floorValue = floorInput.value;
      const fullAddress = `${addressValue}, кв. ${apartmentValue}, эт. ${floorValue}`;

      headerAddress.textContent = fullAddress;

      Fancybox.close();
    });
  }
});
