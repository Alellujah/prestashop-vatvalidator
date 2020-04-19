
<!-- Block mymodule -->
<div id="vatvalidator_block_home" class="block">
  <h1>
  {l s='Validate your VAT Number!' mod='vatvalidator'}
  </h1>
  <form id="vatvalidatorform" action="{$form_link|escape:'html'}" method="post">
  <div class="row">
    <input type="text" value="" name="countrycode" placeholder="{l s='Country code' mod='vatvalidator'}" />
    <input type="text" name="vatnumber" placeholder="{l s='VAT Number to verify' mod='vatvalidator'}" />
  </div>
  <div class="row">
    <span id="status"></span>
  </div>
  <div class="row">
    <button type="submit" name="vatvalidatorButton"> {l s='Verify'} </button>
  </div>
  </form>
</div>
<!-- /Block mymodule -->