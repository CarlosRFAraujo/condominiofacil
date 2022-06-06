let mostrar = true

const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('on', mostrar)
    mostrar = !mostrar
})
