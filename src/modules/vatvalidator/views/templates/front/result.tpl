
<!-- Block mymodule -->
<div id="vatvalidator_result" class="block">
<br><br><br><br><br><br><br><br><br><br>
<h1>result</h1>
{$countrycode}
{$vatnumber}
{$result->valid}
{if $result->valid === true} Valid
{elseif $result->valid === false} Invalid
{/if}
{* {foreach from=$soapfunctions key=k item=v}
   <li>{$k}: {$v}</li>
{/foreach} *}
</ul>
<br><br><br><br><br>
</div>
<!-- /Block mymodule -->