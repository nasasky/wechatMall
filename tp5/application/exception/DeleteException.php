<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-12
 * Time: 9:30
 */

namespace app\exception;


class DeleteException extends BaseException
{
    public $code = 401;
    public $msg = '指定商品不存在，请检查商品ID';
    public $errorCode = 20000;
}