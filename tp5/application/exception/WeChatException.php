<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-20
 * Time: 18:45
 */
namespace app\exception;

class WeChatException extends BaseException{
    public $code = 400;
    public $error_code = 999;
    public $msg = "微信未知错误";

}