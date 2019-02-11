<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 10:42
 */
namespace app\exception;

class MissingException extends BaseException{
    public $code = 404;
    public $msg = "请求的资源不存在";
    public $error_code = 10001;
}