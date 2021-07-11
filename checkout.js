$(document).ready(function() {
    function createCheckProductCard(obj) {
        // <div class="checkout-card">
        //     <div>
        //         <img class="checkout-product-img" src="https://test-hosting-8f9bf.web.app/assets/default-product.png" />
        //     </div>
        //     <div>
        //         <h4>Product Title</h4>
        //         <p>X3</p>
        //         <p>Amount: Rs <span>30000</span></p>
        //     </div>
        // </div>
        var card = $('<div>').addClass('checkout-card')
        var firstInnerDiv = $('<div>')
        var productImg = $('<img>').addClass('checkout-product-img').attr('src',obj.preview)
        firstInnerDiv.append(productImg)

        var secondInnerDiv = $('<div>')
        var productName = $('<h4>').html(obj.name)
        var productCount = $('<p>').html('x' + obj.count)
        var productAmount = $('<p>').html('Amount: Rs ')
        var amountSpan = $('<span>').html(parseInt(obj.count) * parseInt(obj.price))
        productAmount.append(amountSpan)
        secondInnerDiv.append(productName,productCount,productAmount)

        card.append(firstInnerDiv,secondInnerDiv)
        
        return card
    }

    var productList = window.localStorage.getItem('product-list')
    productList = productList === null || productList === '' ? [] : productList
    productList = productList.length > 0 ? JSON.parse(productList) : []

    // console.log(productList)
    var grandTotal = 0
    for(var i=0; i<productList.length; i++) {
        $('#card-list').append(createCheckProductCard(productList[i]))
        // console.log(productList[i].count)
        // console.log(productList[i].price)

        var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price)
        grandTotal += totalForCurrentProduct 
        
    }

    $('#item-count').html(productList.length)
    $('#total-amount').html(grandTotal)

    $('#btn-place-order').click(function() {
        var orderItemArr = []
        for(var i=0;i<productList.length; i++) {
            var prodObj = {
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory
            }

            orderItemArr.push(prodObj)
        }

        // console.log(orderItemArr)
        
        var dataObj = {
            amount: grandTotal,
            products: orderItemArr  
        }
        $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
            alert('order Placed Successfully')
            localStorage.setItem('product-list', [])

            location.assign('./thankyou.html')
        })
    })
})