$(document).ready(function(){
    // $('.center').slick({
    //     centerMode: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     dots: true,
    //     arrows: false,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             setting: {
    //                 arrows: false,
    //                 centerMode: true,
    //                 centerPadding: '40px',
    //                 // slidesToShow: 3
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             setting: {
    //                 arrows: false,
    //                 centerMode: true,
    //                 centerPadding: '40px',
    //                 slidesToShow: 1
    //             }
    //         }
    //     ]
    // });

    var counter =1;
    setInterval(function(){
        document.getElementById('radio'+counter).checked =true;
        counter++;
        if(counter>4){
            counter = 1;
        }
    }, 5000);

    function createHomePageProductCard(obj) {
        // <div class="product-card">
        //     <a href='#'>
        //         <img class="product-image" src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg" />
        //         <div class="product-meta">
        //             <h4>Men Navy Blue Solid Sweatshirt</h4>
        //             <h5>United Colors of Benetton</h5>
        //             <p>Rs 2599</p>
        //         </div>
        //     </a>
        // </div>
        var productCard = $('<div>').addClass('product-card')
        var productLink = $('<a>').attr('href','./detail.html?p='+obj.id)
        var productImage = $('<img>').addClass('product-image').attr('src',obj.preview)
        var productMeta = $('<div>').addClass('product-meta')
        var productName = $('<h4>').html(obj.name)
        var productBrand = $('<h5>').html(obj.brand)
        var productPrice = $('<p>').html('Rs '+obj.price)
        productMeta.append(productName,productBrand,productPrice)
        productLink.append(productImage,productMeta)
        productCard.append(productLink)
        return productCard
    }


    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(response) {
        console.log(response)
        for(var i=0; i<response.length; i++) {
            if(response[i].isAccessory) {
                $('#accessory-grid').append(createHomePageProductCard(response[i]))
            }
            else {
                $('#clothing-grid').append(createHomePageProductCard(response[i]))
            }
        }
    })
})