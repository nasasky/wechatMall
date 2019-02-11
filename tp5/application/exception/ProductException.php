<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 19:12
 */

namespace app\exception;


class ProductException extends BaseException
{
    public $code = 404;
    public $msg = '指定商品不存在，请检查商品ID';
    public $errorCode = 20000;
}