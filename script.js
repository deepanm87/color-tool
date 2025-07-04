const hexInput = document.getElementById('hex-input')
const inputColor = document.getElementById('input-color')
const alteredColor = document.getElementById('altered-color')
const alteredColorText = document.getElementById('altered-color-text')
const sliderText = document.getElementById('slider-text')
const slider = document.getElementById('slider')
const lightenText = document.getElementById('lighten-text')
const darkenText = document.getElementById('darken-text')
const toggleBtn = document.getElementById('toggle-btn')

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled')
        lightenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    } else {    
        toggleBtn.classList.add('toggled')
        lightenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }
    reset()
})

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value
    if(!isValidHex(hex)) return
    const strippedHex = hex.replace('#', '')
    inputColor.style.backgroundColor = `#${strippedHex}`
    reset()
})

const isValidHex = hex => {
    if(!hex) return false

    const strippedHex = hex.replace('#', '')
    return strippedHex.length === 3 || strippedHex.length === 6
}

const convertHexToRGB = hex => {
    if(!isValidHex(hex)) return null

    let strippedHex = hex.replace('#', '')

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0, 2), 16)
    const g = parseInt(strippedHex.substring(2, 4), 16)
    const b = parseInt(strippedHex.substring(4, 6), 16)

    return { r, g, b }
}

const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)

    const hex = `#${firstPair}${secondPair}${thirdPair}`
    return hex
}

const alterColor = (hex, percentage) => {
    const { r, g, b } = convertHexToRGB(hex)

    const amount = Math.floor((percentage/100) * 255)

    const newR = r + amount
    const newG = g + amount
    const newB = b + amount
    return convertRGBToHex(newR, newG, newB)
}

const increaseFrom0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount))
}

alterColor('fff', 10)

slider.addEventListener('input', () => {

    if(!isValidHex(hexInput.value)) return
    sliderText.textContent = `${slider.value}%`

    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value

    const alteredHex = alterColor(hexInput.value, slider.value)
    alteredColor.style.background = alteredColor
    alteredColorText.innerText = `Altered Color ${alteredHex}`
})

const reset = () => {
    slider.value = 0
    sliderText.innerText = `0%`
    alteredColor.style.backgroundColor = hexInput.value
    alteredColorText.innerText = `Altered Color ${hexInput.value}`
}