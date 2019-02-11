<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 9:48
 */
namespace app\exception;


class ParameterException extends BaseException {
    public $msg = "提交的参数错误";
    public $code = 400;
    public $error_code = 10000;
}