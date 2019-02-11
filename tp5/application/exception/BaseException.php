<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 9:22
 */
namespace app\exception;

use think\Exception;

class BaseException extends Exception{
    public $msg = "";
    public $code = 404;
    public $error_code = 999;

    public function __construct($message="", $error_code="")
    {
        if($message){
            $this->msg = $message;
        }
        if($error_code){
            $this->error_code = $error_code;
        }
    }
}