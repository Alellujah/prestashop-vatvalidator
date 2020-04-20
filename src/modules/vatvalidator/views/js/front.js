/**
 * 2007-2020 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2020 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 *
 * Don't forget to prefix your containers with your own identifier
 * to avoid any conflicts with others containers.
 */

$('document').ready(function(){
    var form = document.getElementById("vatvalidatorform");
    var countryValue = $('input[name="countrycode"]');
    var vatnumberValue = $('input[name="vatnumber"]');
    var btn = $('button');
    var status = $('#status');
    form.addEventListener("submit", (evt) => verifyVat(evt));

    function verifyVat(evt) {
        evt.preventDefault();
        $('#status > p').remove();
        status.removeClass("invalid valid");
        if (!countryValue.val() || countryValue.val().length > 2){
            status.css("display","block");
            status.addClass("invalid");
            status.append("<p>Error, country code can't be empty and can't have more than 2 characters!</p>")
        }
        if (!vatnumberValue.val() || isNaN(parseInt(vatnumberValue.val()))){
            status.css("display","block");
            status.addClass("invalid");
            status.append("<p>Error, vat number can't be empty and has to be numbers!</p>")
        }
        else {
            var postData = {
                method: "verifyVat",
                countrycode: countryValue.val(),
                vatnumber: vatnumberValue.val(),
                token: token,
            }
            $.ajax({
                type: 'get',
                headers: { "cache-control": "no-cache" },
                dataType: 'json',
                async: true,
                cache: false,
                url: baseUri+'?fc=module&module=vatvalidator&controller=VatValidator',
                data: postData,
                beforeSend: function() {
                    btn.prop('disabled', true);
                    status.css("display","none");
                    btn.css('background-color','lightgrey');
                    btn.html("Loading...");
                },
                success: function(json) {
                    if (json.error) {
                        status.css("display","block");
                        status.append("<p> Error: " + json.error.faultstring + "</p>");
                    } else {
                        var statusMsg = json.valid === false ? "invalid" : "valid";
                        status.addClass(statusMsg);
                        status.css("display","block");
                        status.append("<p> The VAT number: " + json.countryCode + json.vatNumber + " is " + statusMsg + "</p>");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    status.css("display","block");
                    status.append("<p> Error: "  + errorThrown + "</p>");
                },
                complete: function(xhr,status){
                    btn.prop('disabled', false);
                    btn.css('background-color','cadetblue');
                    btn.html("Verify another");
                }
            });
        }
    }
});

