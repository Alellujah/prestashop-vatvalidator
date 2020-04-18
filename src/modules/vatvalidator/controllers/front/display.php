<?php
class vatvalidatordisplayModuleFrontController extends ModuleFrontController
{
    public function postProcess()
    {
        if (Tools::isSubmit('submit')) {
            $varRequestDetails = Tools::getValue('formRequestDetails');

            $sql = " INSERT INTO `ps_custom_order` (`request_details`)  VALUES('{$varRequestDetails}');";

            if (!Db::getInstance()->execute($sql))
                die('Error etc.');
        }
    }

    public function initContent()
    {
        $url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";
        $client = new SoapClient($url);
        // $client->__getTypes();
        // $client->__getFunctions();
        // $result = $client->__getFunctions();;
        $countrycode =  Tools::getValue('countrycode');
        $vatnumber =  Tools::getValue('vatnumber');
        $params = array(
            'countryCode' => $countrycode,
            'vatNumber' => $vatnumber
        );

        /// SOAP RESPONSE
        // public 'countryCode' => string 'IT' (length=2)
        // public 'vatNumber' => string '12345678911' (length=11)
        // public 'requestDate' => string '2020-04-18+02:00' (length=16)
        // public 'valid' => boolean false
        // public 'name' => string '---' (length=3)
        // public 'address' => string '---' (length=3)

        $result = $client->checkVat($params);

        $this->context->smarty->assign(
            array(
                'result' => $result,
                'countrycode' => Tools::getValue('countrycode'), // Retrieved from GET vars
                'vatnumber' => Tools::getValue('vatnumber'),
            )
        );

        $this->setTemplate('result.tpl');
    }
}
