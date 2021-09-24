import { galleryItems } from '../app.js'

const ref = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector('.lightbox__image'),
}

const dataSources = []

const itemsGallery = galleryItems.map((item) => {
  let stringElements = `<li class="gallery__item">
                <a class="gallery__link" 
                    href="${item.original}">
                    <img class="gallery__image"
                        src="${item.preview}"
                        data-sourse="${item.original}"
                        alt="${item.description}">
                </a>
            </li>`
  return stringElements
})

ref.gallery.insertAdjacentHTML('afterbegin', itemsGallery.join(''))

ref.galleryImage = document.querySelectorAll('.gallery__image')

ref.galleryImage.forEach((element) => {
  dataSources.push(element.dataset.sourse)

  element.addEventListener('click', (e) => {
    e.preventDefault()
    ref.lightbox.classList.add('is-open')
    ref.lightboxImage.src = e.target.dataset.sourse
    ref.lightboxImage.alt = e.target.getAttribute('alt')
    console.log(e.target)
  })
})

ref.btnClose.addEventListener('click', closeOverlay)

ref.lightbox.addEventListener('click', closeOverlay)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOverlay()
  }
})

document.addEventListener('keydown', (e) => {
  const currentIndex = dataSources.indexOf(ref.lightboxImage.src)
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex)
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex)
  }
})

function closeOverlay() {
  ref.lightbox.classList.remove('is-open')
  ref.lightboxImage.src = ' '
  ref.lightboxImage.alt = ' '
}

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1
  }
  ref.lightboxImage.src = dataSources[nextIndex]
}

function rightClick(currentIndex) {
  let nextindex = currentIndex + 1
  if (nextindex === dataSources.length) {
    nextindex = 0
  }
  ref.lightboxImage.src = dataSources[nextindex]
}
