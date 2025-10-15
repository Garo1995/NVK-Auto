

$('.catalog-search-inp').on('click', function(e) {
    e.stopPropagation();
    $('.catalog-search-info').toggleClass('search-opened');
    $('.search-btn').toggleClass('search-btn-active');
})
$('.search-btn').on('click', function(e) {
    e.stopPropagation();

})
$(window).on('click', function (e) {
    let catalogSearch = $('.catalog-search-info');
    let searchBtn = $('.search-btn');
    if (e.target !== catalogSearch && e.target !== searchBtn) {
        catalogSearch.removeClass('search-opened');
        searchBtn.removeClass('search-btn-active');
    }
});










$('.select-click').on('click', function (e) {
    $(this).parent().toggleClass('catalog-select-opened');
    e.stopPropagation();
});

$('.catalog-select-drop ul li').on('click', function () {
    let selected_text = $(this).html();
    $('.select-click').html(selected_text);
    $('.catalog-select').removeClass('catalog-select-opened')
});
$(window).on('click', function (e) {
    let menuSort = $('.catalog-select');
    if (e.target !== menuSort) {
        menuSort.removeClass('catalog-select-opened');
    }
});




let sliders = document.getElementsByClassName('nonlinear');
for (let i = 0; i < sliders.length; i++) {
    let slid = sliders[i];
    noUiSlider.create(slid, {
        connect: true,
        behaviour: 'tap',
        start: [document.getElementById(slid.getAttribute('data-id') + '-lower-value').value, document.getElementById(slid.getAttribute('data-id') + '-upper-value').value],
        range: {
            'min': [parseInt(slid.getAttribute('data-min'))],
            'max': [parseInt(slid.getAttribute('data-max'))]
        },
    });
    document.getElementById(slid.getAttribute('data-id') + '-lower-value').addEventListener('change', function () {
        sliders[this.getAttribute('data-index')].noUiSlider.set([this.value, null]);
    });
    document.getElementById(slid.getAttribute('data-id') + '-upper-value').addEventListener('change', function () {
        sliders[this.getAttribute('data-index')].noUiSlider.set([null, this.value]);

    });
    slid.noUiSlider.on('slide', function (values, handle, unencoded, isTap, positions) {
        var nodes = [
            document.getElementById(this.target.getAttribute('data-id') + '-lower-value'), // 0
            document.getElementById(this.target.getAttribute('data-id') + '-upper-value'),  // 1
        ];
        nodes[handle].value = parseInt(values[handle]);
    });
    slid.noUiSlider.on('end', function (values, handle, unencoded, isTap, positions) {
        let data = $('form').serializeArray();
    });
}











$(function () {
    let Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        let links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function (e) {
        let $el = e.data.el;
        $this = $(this),
            $next = $this.next();
        $next.slideToggle();
        if (!e.data.multiple) {

            $el.find('.submenu').not($next).slideUp();
        }
        if (!$this.hasClass('open')) {
            $('.link').each(function () {
                $(this).removeClass('open')
            })
            $this.addClass('open')
        } else {
            $this.removeClass('open')
        }
    }

    let accordion = new Accordion($('#accordion'), false);
});











document.addEventListener("DOMContentLoaded", () => {
    const selects = document.querySelectorAll(".custom-select");
    const results = document.getElementById("reset-results");
    const activeFilters = document.getElementById("active-filters");

    // открытие/закрытие
    selects.forEach(select => {
        const title = select.querySelector(".select-title");
        const options = select.querySelector(".select-options");

        title.addEventListener("click", () => {
            if (title.classList.contains("disabled")) return;
            options.classList.toggle("show");
        });

        options.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", () => {
                const val = li.dataset.value;
                const text = li.textContent;

                title.textContent = text;
                options.classList.remove("show");

                if (val) addFilter(select.dataset.type, text);

                // включаем модель после выбора марки
                if (select.id === "brand-select") {
                    document.getElementById("model-select").classList.remove("disabled");
                    document.querySelector("#model-select .select-title").classList.remove("disabled");
                }
            });
        });
    });

    // добавить фильтр
    function addFilter(type, text) {
        results.style.display = "block";
        let exist = activeFilters.querySelector(`[data-type="${type}"]`);
        if (exist) exist.remove();

        const box = document.createElement("div");
        box.className = "reset-results-box";
        box.dataset.type = type;
        box.innerHTML = `<span>${text}</span><div class="close-this-reset"><i></i></div>`;
        activeFilters.appendChild(box);

        // закрытие фильтра
        box.querySelector(".close-this-reset").addEventListener("click", () => {
            box.remove();
            if (activeFilters.querySelectorAll(".reset-results-box").length === 0) {
                results.style.display = "none";
            }
        });
    }

    // очистить все
    document.querySelector(".clear-all").addEventListener("click", () => {
        activeFilters.querySelectorAll(".reset-results-box").forEach(b => b.remove());
        results.style.display = "none";
    });

    // закрыть dropdown вне клика
    document.addEventListener("click", e => {
        if (!e.target.closest(".custom-select")) {
            document.querySelectorAll(".select-options").forEach(o => o.classList.remove("show"));
        }
    });
});