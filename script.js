$(document).ready(function () {
    var rate = 558425; // бит Курс
    var max_rub = 356245;
    var min_rub = 500;
    var btc = $("#inputAmountBtc").attr('placeholder');
    var rub = btc * rate;
    rub = Number((rub).toFixed(0));
    $("#inputAmountRub").attr('placeholder', rub);
    $("#inputAmountRub").show()
    $("#submitBtn").attr('disabled', 'disabled');

    if (rate == 0 || !rate) {
        $("#rate").hide()
    }


    $(".amount").on("input keypress keyup propertychange", function (event) {

        var key = window.event ? event.keyCode : event.which;
        if (!event.keyCode == 8 || !event.keyCode == 46
            || !event.keyCode == 37 || !event.keyCode == 39) {
            return;
        }
        else if (key < 48 || key > 57) {
            return;
        }

        if ($(this).attr('id').indexOf("Btc") > -1) {
            console.log('BTC: ' + $(this).val());
            var btc = $(this).val();
            var rub = btc * rate;
            rub = Number((rub).toFixed(0));
            if (rub) {
                $("#inputAmountRub").val(rub);
            }
        } else {
            //console.log('RUB: ' + $(this).val());
            var rub = $(this).val();
            var btc = rub / rate;
            //console.log('btc: ' + btc)
            btc = Number((btc).toFixed(8));
            //console.log('btc toFixed:' + btc)
            if (btc) {
                $("#inputAmountBtc").val(btc);
            }
        }
        if (!check_limit_min()) {
            $("#minalert").show();
        } else {
            $("#minalert").hide();
        }

        /*if (!check_limit_max()) {
            $("#maxalert").show();
        } else {
            $("#maxalert").hide();
        }*/
        check_form();
    });

    $("#inputQiwiNumber").on("input keypress keyup propertychange", function (event) {
        if (!check_number()) {
            if (!$(this).hasClass("parsley-error")) {
                $(this).addClass("parsley-error")
            }
            //console.log('number err')
        } else {
            $(this).removeClass("parsley-error")
            //console.log('number OK')
        }
        check_form();
    });

    function check_limit_min() {
        var min_rub = 500;
        var rub = $("#inputAmountRub").val();
        return !(rub < min_rub)
    }

    /*function check_limit_max() {
        var max_rub = 345845;
        var rub = $("#inputAmountRub").val();
        return !(rub > max_rub)
    }*/


    function check_number() {
        var inputlen = $("#inputQiwiNumber").val().length;
        return (inputlen >= 11 && inputlen <= 13);
    }

    function check_form() {
        if (check_limit_min() /*&& check_limit_max()*/ && check_number()) {
            $("#submitBtn").removeAttr('disabled');
        } else {
            $("#submitBtn").attr('disabled', 'disabled');
        }
    }

});
