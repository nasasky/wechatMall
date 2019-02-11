<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-18
 * Time: 15:27
 */

namespace app\exception;


class ForbiddenException extends BaseException
{
    public $code = 403;
    public $msg = '权限不够';
    public $errorCode = 10001;
}