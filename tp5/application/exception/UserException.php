<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-22
 * Time: 19:19
 */

namespace app\exception;


class UserException extends BaseException
{
    public $code = 404;
    public $msg = '用户不存在';
    public $errorCode = 20000;
}