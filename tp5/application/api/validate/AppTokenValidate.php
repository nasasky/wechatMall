<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-12-05
 * Time: 22:05
 */

namespace app\api\validate;


class AppTokenValidate extends BaseValidate
{
    protected $rule = [
        "username" => "require|isEmpty",
        "password" => "require|isEmpty",
        "code" => "require|isEmpty|captcha"
    ];
}