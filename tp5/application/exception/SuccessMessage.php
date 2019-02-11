<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-23
 * Time: 17:09
 */

namespace app\exception;


class SuccessMessage extends BaseException
{
    public $code = 201;
    public $msg = 'ok';
    public $errorCode = 0;
}