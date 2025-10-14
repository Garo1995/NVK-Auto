$(document).ready(function () {
    $('select').styler();
});

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




