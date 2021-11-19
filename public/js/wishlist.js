let elms = document.getElementsByClassName("wishlist")

var elements = Array.from(elms)

elements.forEach(elm => {
    elm.addEventListener("click", () => {
        console.log(elm.innerHTML)
        if (elm.innerHTML == `<i class="bx bx-heart"></i> Wishlist`)
            elm.innerHTML = "Wishlisted"
        else
            elm.innerHTML = `<i class="bx bx-heart"></i> Wishlist`
    })
})