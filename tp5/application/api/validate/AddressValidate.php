<?php
/**
 * Created by PhpStorm.
 * User: Django
 * Date: 2018-11-23
 * Time: 16:11
 */

namespace app\api\validate;


class AddressValidate extends BaseValidate
{
    protected $rule = [
        'name' => 'require|isEmpty',
        'mobile' => 'require|isMobile',
        'province' => 'require|isEmpty',
        'city' => 'require|isEmpty',
        'country' => 'require|isEmpty',
        'detail' => 'require|isEmpty',
    ];
    protected $message = [
      "mobile.isMobile"  => "手机号码格式不正确"
    ];
}