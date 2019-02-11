<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-10
 * Time: 15:23
 */

namespace app\api\AppInit;


class Cors
{
    public function appInit(&$params)
    {
        header('Access-Control-Allow-Origin: http://www.b.com');
        header("Access-Control-Allow-Headers: Cookies, token,Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: POST,GET,DELETE');
        header('Access-Control-Allow-Credentials: true');

        if(request()->isOptions()){
            exit();
        }
    }
}