let amountInput = document.querySelector('#mortgage-amount-input')
let termInput = document.querySelector('#mortgage-term-input')
let rateInput = document.querySelector('#interest-rate-input')
let repaymentRadio = document.querySelector('#repayment')
let interestOnlyRadio = document.querySelector('#interest-only')
let submitButton = document.querySelector('#submit-input')
let clearSpan = document.querySelector('#clear-span')

let emptyResults = document.querySelector('#empty-results')

let showingResults = document.querySelector('#showing-results')
let monthlyAmount = document.querySelector('#monthly-amount')
let totalAmount = document.querySelector('#total-amount')

let inputBoxes = document.querySelectorAll('.input-box')
let amountBox = document.querySelector('#mortgage-amount')
let termBox = document.querySelector('#mortgage-term')
let rateBox = document.querySelector('#interest-rate')

let radios = document.querySelectorAll('.checkbox')
let repaymentRadioDiv = document.querySelector('#repayment-radio')
let interestRadioDiv = document.querySelector('#interest-radio')

let amount = 0
let term = 0
let rate = 0

amount


submitButton.addEventListener('click' , (e) => {
    
    inputBoxes.forEach((box)=> {
        if (box.querySelector('input').value != '' ) {
            box.querySelector('.error-msg').style.display = 'none'
            box.querySelector('.placeholder').classList.remove('error-placeholder')
            box.querySelector('.text-input').classList.remove('error-input')
        } else {
            box.querySelector('.error-msg').style.display = 'block'
            box.querySelector('.placeholder').classList.add('error-placeholder')
            box.querySelector('.text-input').classList.add('error-input')
        }
    })
    if (repaymentRadio.checked != true && interestOnlyRadio.checked != true) {
        document.querySelector('#type-error').style.display = 'block'
    } else {
        document.querySelector('#type-error').style.display = 'none'
    }
    if (Array.from(inputBoxes).every(box=>{
        if (box.querySelector('input').value != '')
            return true
    })) {
        amount = parseFloat(amountInput.value)
        term = parseFloat(termInput.value)
        rate = parseFloat(rateInput.value)

        if (repaymentRadio.checked == true || interestOnlyRadio.checked == true) {
            if (interestOnlyRadio.checked) {
              monthlyAmount.innerHTML = '$' + Math.round((amount * (rate / 100)) / (term * 12) * 1000 ) / 1000
        } else if (repaymentRadio.checked) {
            monthlyAmount.innerHTML = '$' + Math.round((amount + (amount*(rate/100))) / (term * 12) * 1000) / 1000
        }
        totalAmount.innerHTML = '$' + Math.round((amount + (amount*(rate/100))) * 1000) / 1000
        document.querySelector('#empty-results').style.display = 'none'
        document.querySelector('#showing-results').style.display = 'unset'
        scrollTo({
            top : document.querySelector('#right-sec').clientHeight ,
            behavior : "smooth" ,
        })
    }
}})


clearSpan.addEventListener('click' , e => {
    document.querySelector('#showing-results').style.display = 'none'
    document.querySelector('#empty-results').style.display = 'unset'
    inputBoxes.forEach(box => {
        box.querySelector('input').value = ''
    })
    radios.forEach(radio => {
        radio.querySelector('input').checked = false
        radio.classList.remove('active-checkbox')
    })
})


radios.forEach(radio => {
    radio.addEventListener('click' , e => {
        e.currentTarget.querySelector('input').checked = true
        Array.from(e.currentTarget.parentElement.children).forEach(child => {
            child.classList.remove('active-checkbox')
        })
        e.currentTarget.classList.add('active-checkbox')
    })
    
})