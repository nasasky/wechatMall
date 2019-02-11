<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-20
 * Time: 21:16
 */
namespace app\exception;

class TokenException extends BaseException
{
    public $code = 401;
    public $msg = 'Token已过期或无效Token';
    public $errorCode = 10001;
}