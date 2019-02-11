<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-19
 * Time: 17:39
 */
namespace app\api\validate;

class WeChatCodeValidate extends BaseValidate{
    protected $rule = [
        "code" => "require|isEmpty"
    ];
}