
<!-- Block mymodule -->
<div id="vatvalidator_block_home" class="block">
  <h1>
  {l s='Validate your VAT Number!' mod='vatvalidator'}
  </h1>
  <form id="vatvalidatorform" action="{$link->getModuleLink('vatvalidator', 'display')|escape:'html'}" method="post">
  <div class="row">
    <input type="text" title="{l s='Ex. IT, PT, CZ'}" pattern="[A-Za-z]{{3}}" 
 name="countrycode" placeholder="{l s='Country code' mod='vatvalidator'}" />
    <input type="text"
    title="{l s='Provide the vat number'}" 
    pattern="/^-?\d+$/"
    name="vatnumber" placeholder="{l s='VAT Number to verify' mod='vatvalidator'}" />
  </div>  
  <div class="row">
    <button  type="submit" name="vatvalidator"> {l s='Verify'} </button> 
  </div>
  </form>
</div>
<!-- /Block mymodule -->