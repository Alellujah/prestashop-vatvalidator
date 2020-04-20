<?php

class vatvalidatorVatValidatorModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        parent::initContent();
        $this->ajax = true; // enable ajax
    }

    public function displayAjax()
    {
        $countrycode = Tools::getValue('countrycode');
        $vatnumber = Tools::getValue('vatnumber');
        $params = array(
            'countryCode' => $countrycode,
            'vatNumber' => $vatnumber
        );

        switch (Tools::getValue('method')) {
            case 'verifyVat' :
                die(Tools::jsonEncode($this->verifyVat($params)));
                break;
            default:
                exit;
        }
        exit;
    }

    public function verifyVat($params)
    {
        /// SOAP RESPONSE
        // public 'countryCode' => string 'IT' (length=2)
        // public 'vatNumber' => string '12345678911' (length=11)
        // public 'requestDate' => string '2020-04-18+02:00' (length=16)
        // public 'valid' => boolean false
        // public 'name' => string '---' (length=3)
        // public 'address' => string '---' (length=3)
        try {
            $url = "https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl";
            $client = new SoapClient($url);
            $result = $client->checkVat($params);
            $valid = $result->valid ? "valid" : "invalid";
            Db::getInstance()->execute("INSERT INTO `ps_vatvalidator` (`countrycode`, `vatnumber`, `status`) VALUES ( " . $params['countryCode'] . ", \"12345\", \"teste\")");
            return $result;
        } catch (SoapFault $e) {
            return array("error" => $e);
        }

    }
}
