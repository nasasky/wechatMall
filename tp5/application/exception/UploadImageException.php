<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-11
 * Time: 19:35
 */

namespace app\exception;


class UploadImageException extends BaseException
{
    public $code = 401;
    public $msg = '图片上传失败';
    public $errorCode = 10005;
}