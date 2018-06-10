var shoppingCart = [];
$(document).ready(function(){
    outputItems();

    $('.productItem').click(function(e){
        e.preventDefault();
    var itemInfo = $(this.dataset)[0];
    itemInfo.qty= 1;
    itemincart = false;

    $.each(shoppingCart, function(index, value){
        if(value.id==itemInfo.id){
            parseInt(value.qty++);
            itemincart = true;
        }
    })
        if(!itemincart){
            shoppingCart.push(itemInfo);
        }

        sessionStorage["shoppingCart"] = JSON.stringify(shoppingCart);
        outputItems();

    })


    function outputItems(){
        if(sessionStorage["shoppingCart"]!=null){
            shoppingCart = JSON.parse(sessionStorage["shoppingCart"].toString());
            //console.log(sessionStorage["shoppingCart"]);
            $('.checkout').show();
        }
        // INITIAL VALUES
        var displayItemsInfo = '';
        var total = 0;
        var items = 0;

        $.each(shoppingCart, function(index, value){
        displayItemsInfo += `<div>Name: ${value.name}, Price(DKK): ${value.price}, Qty: ${value.qty}, 
        Size: ${value.size}</div> `;
        total += value.qty * value.price;
        items += value.qty

        })

        // CONTAINED VALUES
        displayItemsInfo += '<div>'+currency(total)+'</div>';
        $('#displayItemInfo').html(displayItemsInfo);
        $('.total').html(`Total Amount: ${currency(total)}`);
        $('.items').html(`Total Items: ${items}`);

        function currency(dk){
        return `DKK - ${(dk/1)}`;
        }

     }

  })