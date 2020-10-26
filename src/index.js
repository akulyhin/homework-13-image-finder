import './styles.css';
import apiService from './js/apiService';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import templateGallery from './templates/templateGallery.hbs';




refs.search.addEventListener('input', debounce((e) => {
    
    if (e.target.value === '') {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
    }

    if (refs.loadMoreBtn.disabled === true) {
        refs.loadMoreBtn.disabled = false;
        refs.btnText.textContent = 'Показать еще';

    }

    refs.spinner.classList.remove('is-hidden');
    refs.loadMoreBtn.classList.remove('is-hidden');
    apiService.query = e.target.value;

    apiService.toGetFetch().then(data => 
        {refs.gallery.innerHTML = templateGallery(data),
            refs.spinner.classList.add('is-hidden');
        });
        

}, 500));


refs.loadMoreBtn.addEventListener('click', () => {
    apiService.setPage();

    refs.loadMoreBtn.disabled = true;
    refs.spinner.classList.remove('is-hidden');
    refs.spinnerBtn.classList.remove('is-hidden');
    refs.btnText.textContent = 'Загрузка...';

    apiService.toGetFetch().then(data => 
        {
        refs.gallery.insertAdjacentHTML('beforeend', templateGallery(data)),
        refs.spinner.classList.add('is-hidden'),
        refs.spinnerBtn.classList.add('is-hidden'),
        refs.btnText.textContent = 'Показать еще',
        refs.loadMoreBtn.disabled = false,
        emptyArray(data)})
        
});

function emptyArray (data) {
    if (data.length === 0) {
        refs.btnText.textContent = 'Больше нет'
        refs.loadMoreBtn.disabled = true
        return
    }
}

refs.gallery.addEventListener('click', (e) => {

    let bigImage = e.target.dataset.largeimage;
    refs.jsLightbox.classList.add('is-open');
    refs.lightboxImage.src = bigImage;
})


refs.closeLightBox.addEventListener('click', () => {
    refs.jsLightbox.classList.remove('is-open');
    refs.lightboxImage.src = '#';
});



