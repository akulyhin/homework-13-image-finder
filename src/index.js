import './styles.css';
import apiService from './js/apiService';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import templateGallery from './templates/templateGallery.hbs';
import showHide from './js/showHide';


refs.search.addEventListener('input', debounce((e) => {
    
    if (e.target.value === '') {
        refs.gallery.innerHTML = '';
        showHide.hideElement(refs.loadMoreBtn);
        return;
    }

    if (refs.loadMoreBtn.disabled === true) {
        refs.loadMoreBtn.disabled = false;
        refs.btnText.textContent = 'Показать еще';

    }
    showHide.showElement(refs.spinner);
    showHide.showElement(refs.loadMoreBtn);
    apiService.query = e.target.value;

    apiService.resetPage();
    apiService.toGetFetch().then(data => 
        {refs.gallery.innerHTML = templateGallery(data),
            showHide.hideElement(refs.spinner),
            emptyResponse(data)
        });
        

}, 500));


refs.loadMoreBtn.addEventListener('click', () => {
    apiService.setPage();

    refs.loadMoreBtn.disabled = true;
    showHide.showElement(refs.spinner);
    showHide.showElement(refs.spinnerBtn);
    refs.btnText.textContent = 'Загрузка...';
    
    apiService.toGetFetch().then(data => 
        {
            refs.gallery.insertAdjacentHTML('beforeend', templateGallery(data)),
            
        showHide.hideElement(refs.spinner),
        showHide.hideElement(refs.spinnerBtn),
        refs.btnText.textContent = 'Показать еще',
        refs.loadMoreBtn.disabled = false,
        emptyArray(data)
    })
        
});

function emptyArray (data) {
    if (data.length === 0) {
        refs.btnText.textContent = 'Больше нет'
        refs.loadMoreBtn.disabled = true
        return
    }
}

function emptyResponse (data) {
    if (data.length === 0) {
        showHide.hideElement(refs.loadMoreBtn);
        showHide.showElement(refs.alert);
    }

    else if (data.length < 12) {
        showHide.hideElement(refs.loadMoreBtn);
        console.log(data.length);
    }

    else {
        showHide.hideElement(refs.alert);
        console.dir(data)
        // showHide.showElement(refs.loadMoreBtn);
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


// Arrow Back to top
refs.backToTop.addEventListener('click', () => {
    console.dir(document.body)
    scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});

// Arrow Go to bottom
refs.goToBottom.addEventListener('click', () => {
    scrollTo({
        top: document.body.clientHeight,
        behavior: 'smooth'
    })
})
